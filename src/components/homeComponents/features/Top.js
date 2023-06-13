import React from 'react';
import { makeStyles } from '@mui/styles';
import { useWindowDims } from '../../../utils/useWindowDims';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  '@media (max-width: 1024px)': {
    container: {
      flexDirection: 'column',
    },
  },
}));
const Top = () => {
  const classes = useStyles();
  const { width } = useWindowDims();
  return (
    <div className={classes.container}>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="527.249"
          height="151.851"
          viewBox="0 0 527.249 151.851"
          style={{
            maxWidth: width > 1024 ? 492 : '98%' || 500,
          }}
        >
          <g
            id="Group_6530"
            data-name="Group 6530"
            transform="translate(-190.25 -4043.214)"
          >
            <text
              id="features"
              transform="translate(208.5 4173.064)"
              fill="#134696"
              fontSize="100"
              fontFamily="HelveticaNeueLTStd-Bd, Helvetica Neue LT Std !important"
              letterSpacing="-0.02em"
              opacity="0.07"
              fontWeight={'bold'}
            >
              <tspan x="0" y="0">
                FEATURES
              </tspan>
            </text>
            <text
              id="Land_is"
              data-name="Land is"
              transform="translate(190.25 4068.214)"
              fill="#134696"
              fontSize="26"
              fontFamily="HelveticaNeueLTStd-Lt, Helvetica Neue LT Std !important"
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
              fontWeight={'bold'}
            >
              <tspan x="0" y="0">
                SUPPORT
              </tspan>
            </text>
          </g>
        </svg>
      </div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="579.352"
          height="335.874"
          viewBox="0 0 579.352 335.874"
          style={{
            maxWidth: width > 1024 ? 492 : '98%' || 500,
          }}
        >
          <defs>
            <clipPath id="clip-path">
              <rect
                id="Rectangle_5742"
                data-name="Rectangle 5742"
                width="579.352"
                height="335.873"
                transform="translate(0)"
                fill="#fff"
              />
            </clipPath>
            <radialGradient
              id="radial-gradient"
              cx="0.5"
              cy="0.5"
              r="0.329"
              gradientTransform="translate(0.173 -0.127) rotate(17.472)"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0" stopColor="#134696" stopOpacity="0.878" />
              <stop offset="1" stopColor="#fff" />
            </radialGradient>
          </defs>
          <g id="Group_5934" data-name="Group 5934" transform="translate(0)">
            <rect
              id="Rectangle_5739"
              data-name="Rectangle 5739"
              width="329"
              height="254"
              transform="translate(0.422)"
              fill="#fff"
            />
            <rect
              id="Rectangle_5740"
              data-name="Rectangle 5740"
              width="321"
              height="254"
              transform="translate(258.352)"
              fill="#fff"
            />
            <g
              id="Mask_Group_11"
              data-name="Mask Group 11"
              transform="translate(0 0)"
              clip-path="url(#clip-path)"
            >
              <ellipse
                id="Ellipse_354"
                data-name="Ellipse 354"
                cx="343.709"
                cy="397.323"
                rx="343.709"
                ry="397.323"
                transform="translate(114.273 -122.899)"
                opacity="0.52"
                fill="url(#radial-gradient)"
              />
            </g>
            <g id="Group_6529" data-name="Group 6529">
              <text
                id="It_s_a_dangerous_bus"
                data-name="It's a dangerous bus"
                transform="translate(138.027 234.294)"
                fill="#134696"
                fontSize="23"
                fontFamily="HelveticaNeueLTStd-Roman, Helvetica Neue LT Std !important"
              >
                <tspan x="3.318" y="22">
                  We provide complete privacy to all our{' '}
                </tspan>
                <tspan x="108.52" y="50">
                  clients, partners and service{' '}
                </tspan>
              </text>
              <text
                id="Feature_Title"
                data-name="Feature Title"
                transform="translate(202.576 79.161)"
                fill="#134696"
                fontSize="32"
                fontFamily="HelveticaNeueLTStd-Bd, Helvetica Neue LT Std !important"
                fontWeight={'bold'}
              >
                <tspan x="86.255" y="31">
                  BLOCKCHAIN &amp;{' '}
                </tspan>
                <tspan x="193.231" y="69">
                  PRIVACY
                </tspan>
              </text>
            </g>
            <ellipse
              id="Ellipse_361"
              data-name="Ellipse 361"
              cx="14.5"
              cy="14"
              rx="14.5"
              ry="14"
              transform="translate(59.422 47)"
              fill="#134696"
            />
            <ellipse
              id="Ellipse_366"
              data-name="Ellipse 366"
              cx="14.5"
              cy="14"
              rx="14.5"
              ry="14"
              transform="translate(59.422 102)"
              fill="#fff"
            />
            <circle
              id="Ellipse_369"
              data-name="Ellipse 369"
              cx="14.5"
              cy="14.5"
              r="14.5"
              transform="translate(59.422 154)"
              fill="#0ed864"
            />
            <ellipse
              id="Ellipse_362"
              data-name="Ellipse 362"
              cx="14.5"
              cy="14"
              rx="14.5"
              ry="14"
              transform="translate(91.594 47)"
              fill="#fff"
            />
            <ellipse
              id="Ellipse_365"
              data-name="Ellipse 365"
              cx="14.5"
              cy="14"
              rx="14.5"
              ry="14"
              transform="translate(91.594 102)"
              fill="#134696"
            />
            <circle
              id="Ellipse_368"
              data-name="Ellipse 368"
              cx="14.5"
              cy="14.5"
              r="14.5"
              transform="translate(91.594 154)"
              fill="#fff"
            />
            <ellipse
              id="Ellipse_363"
              data-name="Ellipse 363"
              cx="14.5"
              cy="14"
              rx="14.5"
              ry="14"
              transform="translate(130.562 47)"
              fill="#0ed864"
            />
            <ellipse
              id="Ellipse_364"
              data-name="Ellipse 364"
              cx="14.5"
              cy="14"
              rx="14.5"
              ry="14"
              transform="translate(130.562 102)"
              fill="#fff"
            />
            <circle
              id="Ellipse_367"
              data-name="Ellipse 367"
              cx="14.5"
              cy="14.5"
              r="14.5"
              transform="translate(130.562 154)"
              fill="#134696"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Top;
