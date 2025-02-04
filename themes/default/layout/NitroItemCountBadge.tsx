import { classNames } from '#base/utils';
import { DetailedHTMLProps, FC, HTMLAttributes, PropsWithChildren } from 'react';

const classes = {
    base: 'text-[white] font-bold leading-none text-[9.5px] absolute right-0 top-0 py-0.5 px-[3px] z-1 rounded-md border',
    themes: {
        'primary': 'border-black bg-red-700'
    }
};

export const NitroItemCountBadge: FC<PropsWithChildren<{
    theme?: 'primary';
    count: number;
}> & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = props =>
{
    const { theme = 'primary', count = 0, className = null, children = null, ref = null, ...rest } = props;

    return (
        <div
            ref={ ref }
            className={ classNames(
                classes.base,
                classes.themes[theme],
                className
            ) }
            { ...rest }>
            { count }
            { children }
        </div>
    );
};
