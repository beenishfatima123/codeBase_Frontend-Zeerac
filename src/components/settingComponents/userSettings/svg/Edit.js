import React from 'react';

const Edit = ({ color, style }) => {
  return (
    <svg
      id="vuesax_linear_edit"
      data-name="vuesax/linear/edit"
      xmlns="http://www.w3.org/2000/svg"
      width="15.618"
      height="15.618"
      viewBox="0 0 15.618 15.618"
      style={style}
    >
      <g id="edit">
        <path
          id="Vector"
          d="M5.857,0h-1.3C1.3,0,0,1.3,0,4.555v3.9c0,3.254,1.3,4.555,4.555,4.555h3.9c3.254,0,4.555-1.3,4.555-4.555v-1.3"
          transform="translate(1.302 1.302)"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          id="Vector-2"
          data-name="Vector"
          d="M5.851.827.723,5.955a1.765,1.765,0,0,0-.43.859L.014,8.773A.927.927,0,0,0,1.12,9.879L3.079,9.6a1.823,1.823,0,0,0,.859-.43L9.066,4.042a1.977,1.977,0,0,0,0-3.215A1.977,1.977,0,0,0,5.851.827Z"
          transform="translate(4.587 1.138)"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          id="Vector-3"
          data-name="Vector"
          d="M0,0A4.649,4.649,0,0,0,3.215,3.215"
          transform="translate(9.703 2.701)"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          id="Vector-4"
          data-name="Vector"
          d="M0,0H15.618V15.618H0Z"
          fill="none"
          opacity="0"
        />
      </g>
    </svg>
  );
};

export default Edit;
