import React, { useEffect, useRef } from 'react';
import { Platform, View } from 'react-native';
import LottieViewNative from 'lottie-react-native';
import lottieWeb from 'lottie-web';

const WebAnimation: React.FC<any> = ({ source, autoPlay = false, loop = false, style }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const anim = lottieWeb.loadAnimation({
        container: ref.current,
        renderer: 'svg',
        loop,
        autoplay: autoPlay,
        animationData: typeof source === 'string' ? undefined : source,
        path: typeof source === 'string' ? source : undefined,
      });
      return () => anim.destroy();
    }
  }, [source, autoPlay, loop]);

  return <View ref={ref as any} style={style} />;
};

const LottieWrapper: React.ComponentType<any> = Platform.select({
  web: WebAnimation,
  default: LottieViewNative,
}) as React.ComponentType<any>;

export default LottieWrapper;
