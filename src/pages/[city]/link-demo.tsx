import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { i18n } from 'next-i18next';

export default function DemoPage() {
    const router = useRouter();
    const city = router.query.city;

    const getPath = (path: string) => {
        return `/${city}${path}`;
    };

    const changeI18n = () => {
        const target = router.locale === 'en' ? 'cn' : 'en';
        router.replace(router.asPath, router.asPath, { locale: target, shallow: true });
        i18n?.changeLanguage(target);
    };

    const changeCity = () => {
        const target = city === 'macau' ? 'hong-kong' : 'macau';
        router.replace(
            {
                pathname: router.pathname,
                query: { city: target },
            },
            undefined,
            { shallow: true }
        );

        router.prefetch(getPath('/ssr-demo'));
    };

    return (
        <div className='bg-gray-10 p-5'>
            <p>语言：{router.locale}</p>
            <p>地区：{city}</p>
            <div className='h-px my-1 bg-[#999]' />
            <button
                className='h-8 px-4 inline-block rounded-md bg-black text-white'
                type='button'
                onClick={changeI18n}
            >
                切换多语言
            </button>{' '}
            <button
                className='h-8 px-4 inline-block rounded-md bg-black text-white'
                type='button'
                onClick={changeCity}
            >
                切换地区
            </button>
            <div className='h-px my-1 bg-[#999]' />
            <p>
                <Link href={getPath('/ssr-demo')}>Link to ssr page</Link>
            </p>
            <p>
                <Link href={getPath('/ssg-demo')}>Link to ssg page</Link>
            </p>
            <p>
                <Link href={getPath('/csr-demo')}>Link to csr page</Link>
            </p>
            <div className='h-px my-1 bg-[#999]' />
            <p>
                <Link href={getPath('/image-demo')}>Link to image page</Link>
            </p>
        </div>
    );
}
