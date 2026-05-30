import { useEffect, useRef } from "react";
import { Animated } from "react-native";

/**
 * Hook that provides a fade-in + slide-up animation.
 * Mirrors the `enter(delay)` pattern from the web version.
 *
 * @param {number} delay - delay in seconds before animation starts
 * @param {number} duration - animation duration in ms (default 600)
 * @returns {{ opacity: Animated.Value, transform: [{ translateY: Animated.Value }] }}
 */
export const useEnterAnimation = (delay = 0, duration = 600) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }),
      ]).start();
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, []);

  return {
    opacity,
    transform: [{ translateY }],
  };
};

/**
 * Convenience component that wraps children in an animated view.
 */
export const AnimatedEntry = ({ delay = 0, style, children, className }) => {
  const animStyle = useEnterAnimation(delay);

  return (
    <Animated.View style={[animStyle, style]} className={className}>
      {children}
    </Animated.View>
  );
};
