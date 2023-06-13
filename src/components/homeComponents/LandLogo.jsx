import React from 'react'
import { useSelector } from 'react-redux'
import { FILTER_DRAWER_WIDTH } from '../../utils/constants'

const LandLogo = () => {
  const filterOverlay = useSelector((state) => state.global.filterOverlay)

  return (
    <svg
      style={{
        position: 'absolute',
        bottom: 20,
        left: filterOverlay ? FILTER_DRAWER_WIDTH + 10 : 20,
        transition: 'left 200ms ease-in 0s',
        zIndex: 20,
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="366"
      height="82"
      viewBox="0 0 366 82"
    >
      <g
        id="Group_5044"
        data-name="Group 5044"
        transform="translate(-144 -212.013)"
      >
        <rect
          id="Rectangle_4019"
          data-name="Rectangle 4019"
          width="228"
          height="72"
          transform="translate(144 222.013)"
          fill="#134696"
        />
        <text
          id="Land_is_Here."
          data-name="Land is Here."
          transform="translate(342 276.013)"
          fill="#fff"
          fontSize="59"
          fontFamily="regular"
        >
          <tspan x="-167.234" y="0">
            Land is
          </tspan>
          <tspan y="0" space="preserve" fill="#134696">
            <span style={{ fontFamily: 'heavy' }}>Here.</span>
          </tspan>
        </text>
      </g>
    </svg>
  )
}

export default LandLogo
