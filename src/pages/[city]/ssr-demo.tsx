import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import type { GetServerSidePropsContext, GetServerSideProps } from 'next';

import { Header } from '@/components';
import { withGlobalData } from '@/services';

const DynamicComponent = dynamic(() => import('@/components/dynamic'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
});

function SSRPage(props: any) {
    const { t } = useTranslation();

    return (
        <>
            <Head>
                <title>ssr page</title>
            </Head>
            <Header />
            <p>ssr page</p>
            <p>多语言：{t('common:test')}</p>
            <DynamicComponent />
        </>
    );
}

export default SSRPage;

// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props
export const getServerSideProps = withGlobalData<GetServerSideProps, GetServerSidePropsContext>(
    async (ctx) => {
        console.time('ssr request api');
        const response = await fetch('https://api.github.com/repos/vercel/next.js');
        const repo = await response.json();
        console.timeEnd('ssr request api');

        console.time('ssr i18n');
        const i18n = await serverSideTranslations(ctx.locale!);
        console.timeEnd('ssr i18n');

        return {
            props: {
                ...i18n,
                repo,
            },
        };
    }
);
