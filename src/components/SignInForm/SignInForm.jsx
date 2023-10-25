import Button from '../Button/Button'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux'
import { validationSchemaLogin } from '../../utils/validateSchemes'
import {
    useUserSignInMutation,
    // useGetRegUserProfileQuery
} from '../../redux/features/endpoints'
import { setToken } from '../../redux/features/userToken'
import { useEffect } from 'react'

const SignInForm = () => {
    const dispatch = useDispatch();
    // const isLogin = useSelector((state) => state.token.isLogin);

    const [
        loginUser,
        {
            data: singInResult,
            // isFetching: loader,
            // isSuccess: successResponse,
            // error: singInError,
            isError: controlError
        },
    ] = useUserSignInMutation();

    // const {
    //     data,
    //     // isFetching,
    //     // isSuccess,
    //     // error,
    //     // isError
    // } = useGetRegUserProfileQuery(isLogin, {
    //     skip: !isLogin,
    //     refetchOnReconnect: true,
    // });

    const initialValues = {
        email: '',
        password: '',
    };

    const handleSubmit = async (values) => {
        await loginUser({ ...values });
    };

    useEffect(() => {
        if (singInResult && singInResult.token) {
            dispatch(setToken(singInResult.token))
            console.log(singInResult);
        }
    }, [singInResult, dispatch])


    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchemaLogin}
                onSubmit={handleSubmit}
            >
                {formikProps => (
                    <Form>
                        <Field
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                        />
                        <ErrorMessage
                            name="email"
                            component="div"
                        />

                        <Field
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                        />
                        <ErrorMessage
                            name="password"
                            component="div"
                        />
                        <Button primary={true} type='submit'>Sign in</Button>
                        {controlError && <div>{controlError.message}</div>}
                    </Form>
                )}
            </Formik>
        </div>
    )
}

// ---------------------------------------------------------
//     return (
//         <div>
//             <Formik
//                 initialValues={initialValues}
//                 validationSchema={validationSchemaLogin}
//                 onSubmit={handleSubmit}
//             >
//                 {props => (
//                     <Form>
//                         <Grid
//                             container
//                             direction="column"
//                             justifyContent="flex-start"
//                             alignItems="flex-start"
//                         >
//                             <TextFields

//                                 type="email"
//                                 id="email"
//                                 name="email"
//                                 variant="outlined"
//                                 label="Email"
//                             />
//                             <ErrorMessage
//                                 name="email"
//                                 component="div"
//                             />
//                             <TextFields
//                                 type="password"
//                                 id="password"
//                                 name="password"
//                                 variant="outlined"
//                                 label="Password"
//                             />
//                             <ErrorMessage
//                                 name="password"
//                                 component="div"
//                             />
//                         </Grid>
//                         <Button primary={true} type='submit'>Sign in</Button>
//                     </Form>
//                 )}
//             </Formik>
//         </div>
//     )
// }

export default SignInForm