import React from 'react';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Header } from '@/components';

function CSRPage() {
    const { t } = useTranslation();
    const { locale, query } = useRouter();

    return (
        <>
            <Head>
                <title>csr page</title>
            </Head>
            <Header />
            <p>csr page </p>
            <p>语言：{locale}</p>
            <p>地区：{query.city}</p>
            <p>多语言：{t('common:test')}</p>
        </>
    );
}

export default CSRPage;
