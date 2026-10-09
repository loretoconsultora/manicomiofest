import { getImageProps } from "next/image";

/** Pasillo del manicomio: vertical en celular, horizontal en pantallas anchas. */
export default function ArtImage({ className, priority }: { className?: string; priority?: boolean }) {
  const common = { alt: "", sizes: "100vw", priority };
  const {
    props: { srcSet: desktop },
  } = getImageProps({ ...common, width: 1920, height: 1080, src: "/media/pasillo-h.webp" });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({ ...common, width: 1080, height: 1920, src: "/media/pasillo-v.webp" });

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktop} />
      <source srcSet={mobile} />
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img {...rest} className={className} />
    </picture>
  );
}
