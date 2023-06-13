import React from 'react';
import { useSelector } from 'react-redux';

const CardSvg = ({ property }) => {
  const { darkMode } = useSelector((state) => state.global);

  return (
    <svg
      id="Group_5988"
      data-name="Group 5988"
      xmlns="http://www.w3.org/2000/svg"
      width="148.567"
      height="17.769"
      viewBox="0 0 148.567 17.769"
      style={{ maxWidth: '100%', fill: darkMode ? '#fff' : '#000' }}
    >
      <text
        id="_4"
        data-name="4"
        transform="translate(98.28 12.857)"
        fontSize="11"
        fontFamily="HelveticaNeueLTStd-Roman, Helvetica Neue LT Std !important"
      >
        <tspan x="0" y="0">
          {property?.bedrooms}
        </tspan>
      </text>
      <text
        id="_1_Kanal"
        data-name="1 Kanal"
        transform="translate(19.85 12.857)"
        fontSize="11"
        fontFamily="HelveticaNeueLTStd-Roman, Helvetica Neue LT Std !important"
      >
        <tspan x="0" y="0">
          {`${property?.size?.split('.')[0] || 0} ${property?.unit}`}
          
        </tspan>
      </text>
      <g id="area" transform="translate(0 3.379)">
        <path
          id="Shape"
          d="M14.021,14.39H11.807a.369.369,0,0,1-.369-.369v-.738H2.952v.738a.369.369,0,0,1-.369.369H.369A.369.369,0,0,1,0,14.021V11.807a.369.369,0,0,1,.369-.369h.738V2.952H.369A.369.369,0,0,1,0,2.583V.369A.369.369,0,0,1,.369,0H2.583a.369.369,0,0,1,.369.369v.738h8.486V.369A.369.369,0,0,1,11.807,0h2.214a.369.369,0,0,1,.369.369V2.583a.369.369,0,0,1-.369.369h-.738v8.486h.738a.369.369,0,0,1,.369.369v2.214A.369.369,0,0,1,14.021,14.39ZM2.583,11.438a.369.369,0,0,1,.369.369v.738h8.486v-.738a.369.369,0,0,1,.369-.369h.738V2.952h-.738a.369.369,0,0,1-.369-.369V1.845H2.952v.738a.369.369,0,0,1-.369.369H1.845v8.486Z"
          transform="translate(0 0)"
        />
      </g>
      <text
        id="_2"
        data-name="2"
        transform="translate(141.566 12.778)"
        fontSize="11"
        fontFamily="HelveticaNeueLTStd-Roman, Helvetica Neue LT Std !important"
      >
        <tspan x="0" y="0">
          {property?.bathrooms} 
        </tspan>
      </text>
      <g id="batch" transform="translate(115.973)">
        <path
          id="Path"
          d="M962.764,698.151h-.471v-7.444A2.523,2.523,0,0,0,960.007,688h-.857a.315.315,0,0,0-.286.338v1.726a1.648,1.648,0,0,0-1.143,1.658.315.315,0,0,0,.286.338h2.286a.315.315,0,0,0,.286-.338,1.648,1.648,0,0,0-1.143-1.658v-1.387h.571a1.892,1.892,0,0,1,1.714,2.03v7.444H946.394a.426.426,0,0,0-.386.457v.44a.426.426,0,0,0,.386.457h16.37a.426.426,0,0,0,.386-.457v-.44A.426.426,0,0,0,962.764,698.151Z"
          transform="translate(-946.008 -688)"
        />
        <path
          id="Path-2"
          data-name="Path"
          d="M962.971,711.953h-14.8a.16.16,0,0,0-.143.173v.007c.109,2.409.973,4.9,2.238,5.671a1.561,1.561,0,0,0,.052,1.913.988.988,0,0,0,1.581-.063,1.577,1.577,0,0,0,.148-1.61h7.035a1.562,1.562,0,0,0-.1,1.1,1.087,1.087,0,0,0,1.417.851,1.5,1.5,0,0,0,.462-2.2c1.273-.768,2.137-3.262,2.238-5.671A.16.16,0,0,0,962.971,711.953Z"
          transform="translate(-947.002 -702.934)"
        />
      </g>
      <g id="bed" transform="translate(71.699 3.768)">
        <path
          id="Shape-2"
          data-name="Shape"
          d="M16.777,9.091H0L1.854,6.155V.755L2.609,0H14.168l.755.755v5.4L16.777,9.09ZM8.388,4.716a20.216,20.216,0,0,1,5.025.562V1.51H3.363V5.278A20.225,20.225,0,0,1,8.388,4.716Z"
          transform="translate(0.034 0)"
        />
        <path
          id="Path-3"
          data-name="Path"
          d="M823,715.707v1.51h1.759V719.3h1.51v-2.079h10.308V719.3h1.51v-2.079h1.759v-1.51Z"
          transform="translate(-823 -705.688)"
        />
        <path
          id="Path-4"
          data-name="Path"
          d="M841.62,697.273s-4.664-1.825-5.6-1.825-1.692.423-1.692.945v1.32a14.208,14.208,0,0,1,1.684-.316C836.631,697.339,841.62,697.273,841.62,697.273Z"
          transform="translate(-829.904 -693.343)"
        />
        <path
          id="Path-5"
          data-name="Path"
          d="M843.419,697.714v-1.32c0-.522-.758-.945-1.692-.945s-5.6,1.825-5.6,1.825,4.989.066,5.606.124A14.2,14.2,0,0,1,843.419,697.714Z"
          transform="translate(-831 -693.343)"
        />
      </g>
    </svg>
  );
};

export default CardSvg;
