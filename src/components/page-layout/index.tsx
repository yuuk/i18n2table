import React from 'react';

import { GlobalContextProvider, Header } from '@/components';

export const PageLayout: React.FC<React.PropsWithChildren> = (props) => {
    const { children, ...rest } = props;
    return (
        <>
            <GlobalContextProvider value={rest}>
                <Header />
                {props.children}
            </GlobalContextProvider>
        </>
    );
};

export function withPageLayout<Props extends object>(WrappedComponent: React.ComponentType<Props>) {
    return function WithPageLayout(props: Props) {
        return (
            <>
                <GlobalContextProvider value={props}>
                    <Header />
                    <WrappedComponent {...props} />
                </GlobalContextProvider>
            </>
        );
    };
}
