import Button from '../Button/Button';
import { Formik, ErrorMessage, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { validationSchemaRegister } from '../../utils/validateSchemes';
import { useUserSignUpMutation } from '../../redux/features/authEndpoints';
import { setToken } from '../../redux/features/userToken';
import { useEffect, useState } from 'react';
import { BtnShowPassword, FormBox, Input, WrappErrorServer, InputsParent, StatusWrapp, BoxParent, SvgEye, SvgStatus } from './SignUpForm.styled';
import spriteSvG from '../../images/sprite.svg'

const SignUpForm = () => {
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const [
        createUser,
        {
            data: createdUser,
            // isFetching: loader,
            // isSuccess: isCreateSuccess,
            error: createError,
            isError: isCreateError,
        },
    ] = useUserSignUpMutation();

    const handleSubmit = (values) => {
        console.log(values);
        createUser({ ...values });
    };

    useEffect(() => {
        if (createdUser && createdUser.token) {
            dispatch(setToken(createdUser.token));
            console.log(createdUser);
        }
    }, [createdUser, dispatch]);

    const initialValues = {
        name: '',
        email: '',
        password: '',
    };

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchemaRegister}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form autoComplete="off">
                        <FormBox>
                            <BoxParent>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Name"
                                    className={`${'defoult'}
                                ${touched.name && !errors.name && 'success'}
                                ${touched.name && errors.name && 'error'}`}
                                />
                                {touched.name && (<StatusWrapp>
                                    <SvgStatus className=
                                        {touched.name && !errors.name
                                            ? `${'success'}`
                                            : `${'error'}`}
                                    >
                                        <use href={`${spriteSvG}#icon-circle-fill`} />
                                    </SvgStatus>
                                    {errors.name
                                        ? (<ErrorMessage name="name" component="div" />)
                                        : (<p>Success!</p>)
                                    }
                                </StatusWrapp>)}
                            </BoxParent>

                            <BoxParent>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    className={`${'defoult'}
                                ${touched.email && !errors.email && 'success'}
                                ${touched.email && errors.email && 'error'}`}
                                />
                                {touched.email && (<StatusWrapp>
                                    <SvgStatus className=
                                        {touched.email && !errors.email
                                            ? `${'success'}`
                                            : `${'error'}`}>
                                        <use href={`${spriteSvG}#icon-circle-fill`} />
                                    </SvgStatus>
                                    {errors.email
                                        ? (<ErrorMessage name="email" component="div" />)
                                        : (<p>Success!</p>)
                                    }
                                </StatusWrapp>)}
                            </BoxParent>
                            <BoxParent>
                                <InputsParent>
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        className={`${'defoult'}
                                ${touched.password && !errors.password && 'success'}
                                ${touched.password && errors.password && 'error'}`}
                                    />
                                    {showPassword
                                        ? (<BtnShowPassword
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                        >
                                            <SvgEye width='20' height='22'>
                                                <use href={`${spriteSvG}#icon-pasword-visible`} />
                                            </SvgEye>
                                        </BtnShowPassword>)
                                        : (<BtnShowPassword
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                        >
                                            <SvgEye width='20' height='22'>
                                                <use href={`${spriteSvG}#icon-password-hidden`} />
                                            </SvgEye>
                                        </BtnShowPassword>)}
                                </InputsParent>
                                {touched.password && (<StatusWrapp>
                                    <SvgStatus className={touched.password && !errors.password
                                        ? `${'success'}`
                                        : `${'error'}`}>
                                        <use href={`${spriteSvG}#icon-circle-fill`} />
                                    </SvgStatus>
                                    {errors.password
                                        ? (<ErrorMessage name="password" component="div" />)
                                        : (<p>Success!</p>)
                                    }
                                </StatusWrapp>)}
                            </BoxParent>
                        </FormBox>
                        <Button primary={true} type="submit">
                            Sign Up
                        </Button>
                        {isCreateError && <WrappErrorServer>{createError.data.message}</WrappErrorServer>}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SignUpForm;
