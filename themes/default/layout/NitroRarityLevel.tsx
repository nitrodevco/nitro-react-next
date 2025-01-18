import { classNames } from '#base/utils';
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

const classes = {
    base: 'w-[36px] h-[28px] bg-rarity-level *:text-center *:leading-[28px]',
    color: {
        'primary': '*:text-black *:font-bold'
    }
};

export const NitroRarityLevel: FC<{
    level: number;
    color?: 'default';
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = props =>
{
    const { color = 'primary', level = 0, className = null, children = null, ref = null, ...rest } = props;

    return (
        <div
            ref={ ref }
            className={ classNames(
                classes.base,
                classes.color[color],
                className
            ) }
            { ...rest }>
            <div>{ level }</div>
            { children }
        </div>
    );
};
