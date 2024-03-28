import React from 'react';
import NextApp, { AppContext, AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';

import { GlobalContextProvider } from '@/components';

import nextI18NextConfig from '../../next-i18next.config.js';

import '../styles/globals.css';

function App({ Component, pageProps }: AppProps) {
    return (
        <GlobalContextProvider value={pageProps}>
            <Component {...pageProps} />
        </GlobalContextProvider>
    );
}

// App.getInitialProps = async (context: AppContext) => {
//     console.error('app.getInitialProps');

//     const ctx = await NextApp.getInitialProps(context);

//     const dataFromApp = {
//         a: 1,
//         b: 2,
//     };

//     return {
//         ...ctx,
//         dataFromApp,
//     };
// };

export default appWithTranslation(App, nextI18NextConfig);
