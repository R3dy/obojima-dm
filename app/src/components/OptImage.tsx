import type { ImgHTMLAttributes } from 'react';

interface OptImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

/**
 * Renders an image with a WebP source and the original (JPEG/PNG) as a
 * fallback. The build pipeline (scripts/optimize-images.mjs) emits a `.webp`
 * sibling for every raster asset in /public, so browsers that support WebP
 * download the much smaller file while older ones still get the JPEG.
 *
 * `display: contents` on the <picture> keeps the <img> as the layout box so
 * existing width/height/object-fit classes behave exactly as before.
 */
export default function OptImage({ src, alt, loading = 'lazy', decoding = 'async', ...rest }: OptImageProps) {
  const webp = src.replace(/\.(jpe?g|png)$/i, '.webp');
  const hasWebp = webp !== src;

  return (
    <picture style={{ display: 'contents' }}>
      {hasWebp && <source srcSet={webp} type="image/webp" />}
      <img src={src} alt={alt} loading={loading} decoding={decoding} {...rest} />
    </picture>
  );
}
