import { useRef, useState, useEffect, useMemo } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

// source: https://wattenberger.com/blog/react-hooks
const combineChartDimensions = dimensions => {
  let parsedDimensions = {
    marginTop: 40,
    marginRight: 75,
    marginBottom: 70,
    marginLeft: 75,
    ...dimensions
  };

  return {
    ...parsedDimensions,
    boundedHeight: Math.max(
      parsedDimensions.height -
        parsedDimensions.marginTop -
        parsedDimensions.marginBottom,
      0
    ),
    boundedWidth: Math.max(
      parsedDimensions.width -
        parsedDimensions.marginLeft -
        parsedDimensions.marginRight,
      0
    )
  };
};

const defaultSettings = {};

export const useChartDimensions = (passedSettings = defaultSettings) => {
  const ref = useRef();

  const dimensions = useMemo(() => combineChartDimensions(passedSettings), [
    passedSettings
  ]);

  const [width, changeWidth] = useState(0);

  const [height, changeHeight] = useState(0);

  useEffect(() => {
    const element = ref.current;

    const resizeObserver = new ResizeObserver(entries => {
      if (!Array.isArray(entries)) return;

      if (!entries.length) return;

      const entry = entries[0];

      if (width !== entry.contentRect.width)
        changeWidth(entry.contentRect.width);

      if (height !== entry.contentRect.height)
        changeHeight(entry.contentRect.height);
    });

    resizeObserver.observe(element);

    return () => resizeObserver.unobserve(element);
  }, [dimensions, height, width]);

  const newSettings = useMemo(
    () =>
      combineChartDimensions({
        ...dimensions,
        width: dimensions.width || width,
        height: dimensions.height || height
      }),
    [dimensions, width, height]
  );

  return [ref, newSettings];
};
