import {Circle, Svg} from 'react-native-svg';

const useIcons = () => {
  const NotFoundIcon = ({width, height}) => (
    <Svg width={width} height={height} viewBox="0 0 100 100">
      <Circle
        cx="50"
        cy="50"
        r="40"
        stroke="green"
        strokeWidth="4"
        fill="yellow"
/>
    </Svg>
  );

  return {
    NotFoundIcon,
  };
};

export default useIcons;
