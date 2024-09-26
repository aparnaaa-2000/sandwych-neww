import React from 'react';
import {Path, Svg} from 'react-native-svg';

const useIcons = () => {
  const BackArrow = ({width, height}) => {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 12 24">
        <Path
          fill="#000"
          fillRule="evenodd"
          d="M3.343 12l7.071 7.071L9 20.485l-7.778-7.778a1 1 0 0 1 0-1.414L9 3.515l1.414 1.414z"
        />
      </Svg>
    );
  };

  const BellIcon = ({width, height}) => {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24">
        <Path
          fill="#000"
          d="m6.14 14.969l2.828 2.828a2 2 0 1 1-2.828-2.828m8.867 5.325l-.706.706L3 9.699l.706-.706l1.102.157c.754.108 1.689-.122 2.077-.51l3.885-3.884a5.993 5.993 0 0 1 8.475 8.475l-3.885 3.885c-.388.388-.618 1.323-.51 2.077z"
        />
      </Svg>
    );
  };

  return {
    BackArrow,
    BellIcon,
  };
};

export default useIcons;
