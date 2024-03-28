import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import type { GetStaticProps, GetStaticPropsContext } from 'next';

import { Header } from '@/components';
import { withGlobalData } from '@/services/with-global-data';

function SSGPage(props: any) {
    const { t } = useTranslation();

    return (
        <>
            <Head>
                <title>ssg page</title>
            </Head>
            <Header />
            <p>ssg page</p>
            <p>多语言：{t('common:test')}</p>
        </>
    );
}

export default SSGPage;

// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths
export async function getStaticPaths() {
    return {
        paths: [
            {
                locale: 'en',
                params: {
                    city: 'macau',
                },
            },
            {
                locale: 'cn',
                params: {
                    city: 'macau',
                },
            },
            {
                locale: 'en',
                params: {
                    city: 'hong-kong',
                },
            },
            {
                locale: 'cn',
                params: {
                    city: 'hong-kong',
                },
            },
        ],
        // false 表示构建时如果文件没有生成，会直接抛404
        // true 表示如果构建时文件没有生成，会后台再生成，本次请求响应是动态的
        // blocking 表示如果构建时文件没有生成，会阻塞式生成，本次请求响应是生成后的静态页面
        fallback: 'blocking',
    };
}

// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props
export const getStaticProps = withGlobalData<GetStaticProps, GetStaticPropsContext>(async (ctx) => {
    console.time('ssg request api');
    const response = await fetch('https://api.github.com/repos/vercel/next.js');
    const repo = await response.json();
    console.timeEnd('ssg request api');

    console.time('ssg i18n');
    const i18n = await serverSideTranslations(ctx.locale!);
    console.timeEnd('ssg i18n');

    return {
        props: {
            ...i18n,
            repo,
        },
        revalidate: 10, // 时间过了x秒，请求页面会再次执行，可以和 On-Demand Revalidation 共存
    };
});
