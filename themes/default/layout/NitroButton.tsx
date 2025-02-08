import { classNames } from '#base/utils';
import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';

const classes = {
    base: 'inline-flex justify-center items-center gap-2 transition-[background-color] duration-300 transform tracking-wide rounded-md cursor-pointer',
    disabled: 'cursor-not-allowed',
    size: {
        default: 'px-2 py-0.5 font-medium',
        lg: 'px-5 py-3 text-base font-medium',
        xl: 'px-6 py-3.5 text-base font-medium',
    },
    variant: {
        default: 'bg-button-gradient-gray border border-gray-500',
        outline: 'text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-hidden focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800',
        danger: 'bg-button-gradient-red border border-[#d32f2f]',
        warning: 'bg-button-gradient-yellow border border-[#fbc02d]',
    }
};

type StyleClasses = typeof classes;

export const NitroButton: FC<{
    size?: keyof StyleClasses['size'];
    variant?: keyof StyleClasses['variant'];
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> = props =>
{
    const { size = 'default', variant = 'default', disabled = false, type = 'button', className = null, ref = null, ...rest } = props;

    return (
        <button
            ref={ ref }
            className={ classNames(
                classes.base,
                classes.size[size],
                classes.variant[variant],
                disabled && classes.disabled,
                className
            ) }
            disabled={ disabled }
            type={ type }
            { ...rest } />
    );
};
