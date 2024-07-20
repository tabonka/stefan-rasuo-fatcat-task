import { ReactNode } from 'react';

import clsx from 'clsx';

type LayoutProps = {
    children: ReactNode;
    background?: string;
};

export const Layout = ({ children, background }: LayoutProps) => {
    return <section className={clsx('py-20', background)}>{children}</section>;
};
