import { CSSProperties } from 'react';

export const styleNames = (...styles: CSSProperties[]) =>
{
    let mergedStyle = {};

    styles.filter(Boolean).forEach(style => mergedStyle = { ...mergedStyle, ...style });

    return mergedStyle;
};
