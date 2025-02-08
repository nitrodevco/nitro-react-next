import DOMPurify from 'dompurify';

export const UnsafeComponent = (
    { dirtyHtml }: { dirtyHtml: string }
) => {
    const cleanHtml = DOMPurify.sanitize(dirtyHtml);

    return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
};
