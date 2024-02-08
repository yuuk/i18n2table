import React from 'react';
import NextApp, { AppContext, AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';

import { GlobalContextProvider } from '@/components';

import '../styles/globals.css';

function App({ Component, pageProps }: AppProps) {
    return (
        <GlobalContextProvider value={pageProps}>
            <Component {...pageProps} />
        </GlobalContextProvider>
    );
}

App.getInitialProps = async (context: AppContext) => {
    console.error('app.getInitialProps');

    const ctx = await NextApp.getInitialProps(context);

    return {
        ...ctx,
        a: 1,
        b: 2,
    };
};

export default appWithTranslation(App);
