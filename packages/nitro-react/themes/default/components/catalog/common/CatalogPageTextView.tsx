import { ICatalogPage } from '#base/api';
import { UnsafeComponent } from '#base/utils';
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

export const CatalogPageTextView: FC<{
    page: ICatalogPage;
    textIndex: number;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = props =>
{
    const { page = null, textIndex = 0, ...rest } = props;

    if(!page) return null;

    let text = '';

    if (page?.localization?.texts?.length) text = page.localization.texts[textIndex] || '';

    return (
        <div
            { ...rest }>
            <UnsafeComponent dirtyHtml={ text } />
        </div>
    );
}
