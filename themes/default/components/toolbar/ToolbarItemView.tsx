import { classNames } from '#base/utils';
import { DetailedHTMLProps, FC, HTMLAttributes, PropsWithChildren } from 'react';

export const ToolbarItemView: FC<PropsWithChildren<{ icon: string }> & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = props =>
{
    const { icon = null, className = null, ref = null, ...rest } = props;

    return (
        <div
            ref={ ref }
            className={ classNames(
                `cursor-pointer relative nitro-icon icon-${ icon }`,
                className
            ) }
            { ...rest } />
    );
};
