import { classNames } from '#base/utils';
import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';

const classes = {
    base: 'block w-full placeholder-gray-400 border border-gray-300 shadow-xs appearance-none',
    disabled: '',
    inputSize: {
        sm: 'px-1 py-0.5 text-sm',
        default: 'px-2 py-2',
    },
    rounded: 'rounded-md',
    color: {
        default: 'focus:outline-hidden focus:ring-indigo-500 focus:border-indigo-500',
    }
};

type StyleClasses = typeof classes;

export const NitroInput: FC<{
    color?: keyof StyleClasses['color'];
    inputSize?: keyof StyleClasses['inputSize'];
    rounded?: boolean;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> = props =>
{
    const { color = 'default', inputSize = 'default', rounded = true, disabled = false, type = 'text', autoComplete = 'off', className = null, ref = null, ...rest } = props;

    return (
        <input
            ref={ ref }
            autoComplete={ autoComplete }
            className={ classNames(
                classes.base,
                classes.inputSize[inputSize],
                rounded && classes.rounded,
                classes.color[color],
                disabled && classes.disabled,
                className
            ) }
            disabled={ disabled }
            type={ type }
            { ...rest } />
    );
};
