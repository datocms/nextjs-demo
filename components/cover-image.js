import { Image as DatocmsImage } from "react-datocms";
import cn from "classnames";
import Link from "next/link";

export default function CoverImage({ title, responsiveImage, slug }) {
  const image = (
    <DatocmsImage
      data={{
        ...responsiveImage,
        alt: `Cover Image for ${title}`,
      }}
      className={cn("shadow-small", {
        "hover:shadow-medium transition-shadow duration-200": slug,
      })}
    />
  );
  return (
    <div className="-mx-5 sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>{image}</Link>
      ) : (
        image
      )}
    </div>
  );
}
