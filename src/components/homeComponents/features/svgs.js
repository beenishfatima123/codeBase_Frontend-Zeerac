import { Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import './featureStyles.css';
export const HeadingSvg = () => {
  const { darkMode } = useSelector((state) => state.global);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="527.249"
      height="151.851"
      style={{ maxWidth: '100%' }}
      viewBox="0 0 527.249 151.851"
    >
      <g
        id="Group_7099"
        data-name="Group 7099"
        transform="translate(-190.25 -4043.214)"
      >
        <text
          id="features"
          transform="translate(208.5 4173.064)"
          fontSize="100"
          fontFamily="HelveticaNeueLTStd-Bd, Helvetica Neue LT Std !important"
          letterSpacing="-0.02em"
          opacity="0.07"
          fontWeight="bold"
          fill={darkMode ? 'white' : '#134696'}
        >
          <tspan x="0" y="0">
            FEATURES
          </tspan>
        </text>
        <text
          id="Land_is"
          data-name="Land is"
          transform="translate(190.25 4068.214)"
          fontSize="26"
          fontFamily="HelveticaNeueLTStd-Lt, Helvetica Neue LT Std !important"
          fill={darkMode ? 'white' : '#134696'}
        >
          <tspan x="0" y="0">
            LAND IS
          </tspan>
        </text>
        <text
          id="support"
          transform="translate(210.25 4112.032)"
          fill="#0ed864"
          fontSize="45"
          fontFamily="HelveticaNeueLTStd-Hv, Helvetica Neue LT Std !important"
          fontWeight="bold"
        >
          <tspan x="0" y="0">
            SUPPORT
          </tspan>
        </text>
      </g>
    </svg>
  );
};
export const Blockchain = ({ customStyle }) => {
  return (
    <div className="blockchain" style={{ customStyle }}>
      <div
        style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Grid
          container
          sx={{ width: '100px', height: '136px', margin: '32px' }}
        >
          {[...Array(9)].map((elem, index) => (
            <Grid
              item
              key={index}
              xs={4}
              sx={{ height: '30px', width: '30px !important' }}
            >
              {index % 2 === 0 && (
                <div
                  className={
                    index === 4 ? 'centerBall' : index > 4 ? 'balls' : 'balls2'
                  }
                  style={{
                    backgroundColor:
                      index === 2 || index === 6 ? '#0ed864' : '#134696',
                  }}
                />
              )}
            </Grid>
          ))}
        </Grid>
        <p className="blockchain-heading">
          BLOCKCHAIN &<br /> PRIVACY
        </p>
      </div>
      <p className="blockchain-description">
        We provide complete privacy to all our clients, partners and service
        providers.
      </p>
    </div>
  );
};
export const ZSphere = ({ customStyle }) => {
  return (
    <div className="zSphere" style={customStyle}>
      <div className="zSphere-overlay1" />
      <div className="zSphere-overlay2" />

      <p className="zSphere-heading">Z SPEHERE</p>
      <p className="zSphere-description">
        A social media platform that enhances your experience with us.
      </p>
    </div>
  );
};
export const NFT = () => {
  return (
    <div className="nft">
      <p className="nft-heading">NFT</p>
      <p className="nft-description">
        We secure your data using non-fungible tokens where only you can access
        your records. Your privacy is our surety
      </p>
    </div>
  );
};
export const ZCommerce = ({ customStyle }) => {
  return (
    <div className="ZCommerce" style={customStyle}>
      <p className="nft-heading">Z COMMERCE</p>
      <p className="nft-description">
        Find all your home and office needs at our online store.
      </p>
    </div>
  );
};
export const Construction = ({ customStyle }) => {
  return (
    <div className="construction" style={customStyle}>
      <div className="construction-overlay">
        <div className="construction-back-a" />
        <div className="construction-back-b" />
        <div className="construction-back-c" />
      </div>
      <p className="construction-heading">
        Construction Material
        <br /> & Architecture
      </p>
      <p className="construction-description">
        Get maps, plans, all your construction needs fulfilled on one platform.
      </p>
    </div>
  );
};
