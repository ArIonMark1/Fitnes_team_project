import styled from '@emotion/styled';
import image1x from '../../images/side-food-gym-1x.jpg';
import image2x from '../../images/side-food-gym-2x.jpg';

export const Section = styled.section`
  position: relative;
  padding-top: 40px;
  padding-bottom: 80px;
  height: 716px;

  @media screen and (min-width: 768px) {
    padding-top: 72px;
    padding-bottom: 48px;
  }

  @media screen and (min-width: 1440px) {
    background-image: url(${image1x});
    background-size: contain;
    background-repeat: no-repeat;
    background-position-x: 100%;
    padding-top: 68px;
    padding-bottom: 81px;

    @media (min-device-pixel-ratio: 2),
      (-webkit-min-device-pixel-ratio: 2),
      (min-resolution: 192dpi),
      (min-resolution: 2dppx) {
      background-image: url(${image2x});
    }

    & > div:first-of-type {
      position: absolute;
      top: 0;
      right: -378px;
      background: linear-gradient(89deg, #040404 1.1%, rgba(4, 4, 4, 0.00) 70.79%);
      height: 100%;
      width: 807px;
      background-position-x: 100%;
    }
  }
`;

export const Title = styled.h2`
  margin-bottom: 40px;
  color: var(--color-white);
  font-size: 24px;
  line-height: 28px;

  @media screen and (min-width: 768px) {
    font-size: 32px;
    line-height: 44px;
    margin-bottom: 32px;
  }

  @media screen and (min-width: 1440px) {
    margin-bottom: 0;
  }
`;

export const Wrap = styled.div`
  margin-bottom: 40px;

  @media screen and (min-width: 768px) {
    margin-bottom: 32px;
  }

  @media screen and (min-width: 1440px) {
    margin-bottom: 28px;
    display: flex;
    justify-content: space-between;
  }
`;

// @media screen and (min-width: 768px) {
//   }

//   @media screen and (min-width: 1440px) {

//   }
