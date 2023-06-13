import React from 'react';

const ModalPattren = ({ style }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xlink="http://www.w3.org/1999/xlink"
      width="59.217"
      height="172.656"
      viewBox="0 0 59.217 172.656"
      style={style}
    >
      <defs>
        <filter
          id="BG"
          x="-22.5"
          y="-19.5"
          width="104.217"
          height="217.656"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3" input="SourceAlpha" />
          <feGaussianBlur stdDeviation="7.5" result="blur" />
          <feFlood floodOpacity="0.161" />
          <feComposite operator="in" in2="blur" />
          <feComposite in="SourceGraphic" />
        </filter>
        <clipPath id="clip-path">
          <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#BG)">
            <rect
              id="BG-2"
              data-name="BG"
              width="172.656"
              height="59.217"
              rx="4"
              transform="translate(0 0)"
              fill="#fff"
            />
          </g>
        </clipPath>
        <linearGradient
          id="linear-gradient"
          x1="0.037"
          y1="-0.321"
          x2="0.983"
          y2="1.201"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#134696" stopOpacity="0" />
          <stop offset="0.527" stopColor="#134696" />
          <stop offset="1" stopColor="#134696" />
        </linearGradient>
      </defs>
      <g
        id="Mask_Group_77"
        data-name="Mask Group 77"
        transform="translate(59.217) rotate(90)"
        clipPath="url(#clip-path)"
      >
        <g
          id="Group_5947"
          data-name="Group 5947"
          transform="translate(189.322 56.831) rotate(180)"
        >
          <path
            id="Path_43"
            data-name="Path 43"
            d="M191.336,27.675v3.346H118.454a24.553,24.553,0,0,1-19.446-9.9L93.14,13.211a24.568,24.568,0,0,0-19.44-9.9l-2.873-.026L0,3.331A24.384,24.384,0,0,0,.57,0H75.385a24.594,24.594,0,0,1,19.44,9.906l5.863,7.889a24.563,24.563,0,0,0,19.456,9.9Z"
            transform="translate(0 0)"
            fill="url(#linear-gradient)"
          />
          <path
            id="Path_44"
            data-name="Path 44"
            d="M169.865,27.67V31H96.187A24.446,24.446,0,0,1,76.81,21.1l-5.846-7.894a24.436,24.436,0,0,0-19.131-9.9H0A24.307,24.307,0,0,0,1.608,0H53.287A24.466,24.466,0,0,1,72.648,9.9L78.49,17.79a24.472,24.472,0,0,0,19.382,9.926Z"
            transform="translate(19.414 8.88)"
            fill="url(#linear-gradient)"
          />
        </g>
      </g>
    </svg>
  );
};

export default ModalPattren;
