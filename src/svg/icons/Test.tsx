import React, { memo } from "react"
import { IconProps } from "~svg"

const TestIcon: React.FC<IconProps> = props => {
  const { className, ...otherProps } = props

  return (
    <svg
      className={`fill-current ${className}`}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...otherProps}
    >
      <g clipPath="url(#clip0)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.5039 2.5H2.50391C2.17239 2.5 1.85444 2.6317 1.62002 2.86612C1.3856 3.10054 1.25391 3.41848 1.25391 3.75V16.25C1.25391 16.5815 1.3856 16.8995 1.62002 17.1339C1.85444 17.3683 2.17239 17.5 2.50391 17.5H17.5039C17.8354 17.5 18.1534 17.3683 18.3878 17.1339C18.6222 16.8995 18.7539 16.5815 18.7539 16.25V3.75C18.7539 3.41848 18.6222 3.10054 18.3878 2.86612C18.1534 2.6317 17.8354 2.5 17.5039 2.5ZM2.50391 1.25C1.84086 1.25 1.20498 1.51339 0.736139 1.98223C0.267298 2.45107 0.00390625 3.08696 0.00390625 3.75V16.25C0.00390625 16.913 0.267298 17.5489 0.736139 18.0178C1.20498 18.4866 1.84086 18.75 2.50391 18.75H17.5039C17.8322 18.75 18.1573 18.6853 18.4606 18.5597C18.7639 18.4341 19.0395 18.2499 19.2717 18.0178C19.5038 17.7856 19.688 17.51 19.8136 17.2067C19.9392 16.9034 20.0039 16.5783 20.0039 16.25V3.75C20.0039 3.08696 19.7405 2.45107 19.2717 1.98223C18.8028 1.51339 18.1669 1.25 17.5039 1.25H2.50391Z"
          fill=""
        ></path>
        <path
          d="M13.3114 9.55744C13.4042 9.46487 13.5238 9.40383 13.6533 9.38296C13.7827 9.3621 13.9154 9.38247 14.0327 9.44119L18.7539 11.8749V17.4999H1.25391V14.9999L4.56141 12.0574C4.66357 11.9556 4.7978 11.8923 4.94133 11.8782C5.08486 11.8641 5.22886 11.9 5.34891 11.9799L8.67391 14.1962L13.3114 9.55869V9.55744Z"
          fill=""
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.62891 8.75C5.87513 8.75 6.11895 8.7015 6.34644 8.60727C6.57392 8.51305 6.78062 8.37494 6.95473 8.20083C7.12884 8.02672 7.26695 7.82002 7.36118 7.59253C7.45541 7.36505 7.50391 7.12123 7.50391 6.875C7.50391 6.62877 7.45541 6.38495 7.36118 6.15747C7.26695 5.92998 7.12884 5.72328 6.95473 5.54917C6.78062 5.37506 6.57392 5.23695 6.34644 5.14273C6.11895 5.0485 5.87513 5 5.62891 5C5.13163 5 4.65471 5.19754 4.30308 5.54917C3.95145 5.90081 3.75391 6.37772 3.75391 6.875C3.75391 7.37228 3.95145 7.84919 4.30308 8.20083C4.65471 8.55246 5.13163 8.75 5.62891 8.75Z"
          fill=""
        ></path>
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="20" height="20" fill="white"></rect>
        </clipPath>
      </defs>
    </svg>
  )
}

export default memo(TestIcon)
