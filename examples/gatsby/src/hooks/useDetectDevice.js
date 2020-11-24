import { useMediaQueries } from '@react-hook/media-query';

export default function useDetectDevice() {
  const { matchesAll: isMobile } = useMediaQueries({
    screen: 'screen',
    width: '(max-width: 768px)'
  });
  const { matchesAll: isTablet } = useMediaQueries({
    screen: 'screen',
    width: '(min-width: 769px) and (max-width: 1023px)'
  });
  const { matchesAll: isDesktop } = useMediaQueries({
    screen: 'screen',
    width: '(min-width: 1023px) and (max-width: 1215px)'
  });
  const { matchesAll: isWidescreen } = useMediaQueries({
    screen: 'screen',
    width: '(min-width: 1216px) and (max-width: 1407px)'
  });
  const { matchesAll: isFullHD } = useMediaQueries({
    screen: 'screen',
    width: '(min-width: 1408px)'
  });

  return {
    isMobile,
    isTablet,
    isTouch: isMobile || isTablet,
    isDesktop,
    isWidescreen,
    isFullHD
  };
}
