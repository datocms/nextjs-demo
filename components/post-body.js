import { StructuredText, Image as DatocmsImage } from 'react-datocms';

export default function PostBody({ content }) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="prose prose-lg prose-blue" id="main-content">
        <StructuredText
          data={content}
          renderBlock={({ record }) => {
            if (record.__typename === 'ImageBlockRecord') {
              return <DatocmsImage data={record.image.responsiveImage} />;
            }

            return (
              <>
                <p>Don&apos;t know how to render a block!</p>
                <pre>{JSON.stringify(record, null, 2)}</pre>
              </>
            );
          }}
        />
      </div>
    </div>
  );
}
