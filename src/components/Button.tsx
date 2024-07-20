import { ReactNode } from 'react';

import clsx from 'clsx';

type ButtonProps = {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    type?: 'submit' | 'reset' | 'button' | undefined;
};

export const Button = ({
    children,
    onClick,
    disabled,
    type,
    className,
}: ButtonProps) => {
    return (
        <button
            className={clsx(
                'rounded-lg',
                'px-4',
                'py-2',
                'bg-black',
                'text-white',
                'cursor-pointer',
                className
            )}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {children}
        </button>
    );
};
