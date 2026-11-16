import type { CSSProperties } from "react";
import { fallbackSrc, photo, srcSet } from "../content/images";

interface Props {
  id: string;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  alt?: string;
  style?: CSSProperties;
  imgStyle?: CSSProperties;
  /** set false for purely decorative repeats (e.g. second hero layer of the same photo) */
  describe?: boolean;
}

/** Responsive AVIF/WebP picture with a blurred placeholder behind it. */
export function Picture({ id, sizes = "100vw", className = "", imgClassName = "", priority, alt, style, imgStyle, describe = true }: Props) {
  const p = photo(id);
  return (
    <picture
      className={`block bg-cover bg-center ${className}`}
      style={{ backgroundImage: p.lqip ? `url(${p.lqip})` : undefined, ...style }}
    >
      <source type="image/avif" srcSet={srcSet(p, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(p, "webp")} sizes={sizes} />
      <img
        src={fallbackSrc(p)}
        alt={describe ? (alt ?? p.alt) : ""}
        width={p.width}
        height={p.height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className={`h-full w-full object-cover ${imgClassName}`}
        style={imgStyle}
        draggable={false}
      />
    </picture>
  );
}
