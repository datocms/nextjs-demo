import { Image as DatocmsImage } from "react-datocms"
import type { PostBySlugQuery } from "~/graphql/types/graphql"
import { StructuredText as StructuredTextField } from "react-datocms/structured-text"

type PostFromQuery = NonNullable<PostBySlugQuery["post"]>
type ContentFromQuery = PostFromQuery["content"]

export function PostBody({ content }: { content: ContentFromQuery }) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="prose prose-lg dark:prose-invert" id="main-content">
        <StructuredTextField
          data={content}
          renderBlock={({ record }) => {
            if (record.__typename === "ImageBlockRecord") {
              if (record.image?.responsiveImage) {
                return <DatocmsImage data={record.image.responsiveImage} />
              }
              return null
            }

            return (
              <>
                <p>Don&apos;t know how to render a block!</p>
                <pre>{JSON.stringify(record, null, 2)}</pre>
              </>
            )
          }}
        />
      </div>
    </div>
  )
}
