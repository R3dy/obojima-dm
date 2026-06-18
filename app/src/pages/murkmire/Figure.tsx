import { useState } from 'react';
import { ImageOff, Map as MapIcon, ScrollText, UserSquare2 } from 'lucide-react';
import OptImage from '../../components/OptImage';

const ACCENT = '#3E7C6A';
const ACCENT_LIGHT = '#6FB3A0';

type FigureKind = 'map' | 'handout' | 'portrait';

const KIND_ICON: Record<FigureKind, React.ElementType> = {
  map: MapIcon,
  handout: ScrollText,
  portrait: UserSquare2,
};

interface FigureProps {
  /** Path under /public, e.g. "/murkmire/map_museum_dm.webp". */
  src: string;
  alt: string;
  caption?: string;
  kind?: FigureKind;
  /** Tailwind classes controlling the frame's shape/height. */
  className?: string;
  /** Object-fit for the loaded image. */
  fit?: 'cover' | 'contain';
}

/**
 * An image frame that gracefully degrades: if the asset hasn't been added to
 * /public yet (or fails to load), it shows a themed placeholder naming the file
 * the DM should drop in. This lets the Murkmire pages ship with map/handout
 * slots wired up without bundling any third-party art.
 */
export default function Figure({ src, alt, caption, kind = 'map', className = '', fit = 'cover' }: FigureProps) {
  const [errored, setErrored] = useState(false);
  const Icon = errored ? ImageOff : KIND_ICON[kind];
  const fileName = src.replace(/^\//, '');

  return (
    <figure
      className="my-6 rounded-xl overflow-hidden"
      style={{ border: `1px solid ${ACCENT}33`, background: 'rgba(16,12,10,0.5)' }}
    >
      {errored ? (
        <div
          className={`w-full flex flex-col items-center justify-center gap-3 px-6 text-center ${className || 'h-64'}`}
          style={{ background: `radial-gradient(120% 120% at 50% 25%, ${ACCENT}26 0%, #100c0a 75%)` }}
        >
          <Icon size={40} color={ACCENT_LIGHT} strokeWidth={1.25} />
          <div>
            <p className="font-body text-[0.9rem]" style={{ color: 'rgba(245,240,230,0.8)' }}>{alt}</p>
            <p className="text-stat text-[0.72rem] mt-1.5" style={{ color: 'rgba(245,240,230,0.45)' }}>
              Add your {kind} at <code style={{ color: ACCENT_LIGHT }}>public/{fileName}</code>
            </p>
          </div>
        </div>
      ) : (
        <OptImage
          src={src}
          alt={alt}
          onError={() => setErrored(true)}
          className={`w-full ${className || 'h-auto'}`}
          style={{ objectFit: fit, display: 'block' }}
        />
      )}
      {caption && (
        <figcaption className="px-4 py-2.5 text-center" style={{ background: 'rgba(22,36,31,0.6)' }}>
          <span className="text-[0.75rem] tracking-wider uppercase" style={{ fontFamily: "'Cinzel Decorative', serif", color: ACCENT_LIGHT }}>
            {caption}
          </span>
        </figcaption>
      )}
    </figure>
  );
}
