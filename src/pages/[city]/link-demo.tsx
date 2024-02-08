import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
            <button
                className='h-8 px-4 block rounded-md bg-black text-white'
                type='button'
                onClick={changeI18n}
            >
                切换多语言 {router.locale}
            </button>

            <button
                className='h-8 px-4 block rounded-md bg-black text-white'
                type='button'
                onClick={changeCity}
            >
                切换地区 {city}
            </button>

            <p>
                <Link href={getPath('/ssr-demo')}>Link to ssr page</Link>
            </p>

            <p>
                <Link href={getPath('/ssg-demo')}>Link to ssg page</Link>
            </p>

            <div>
                <Image alt='logo' width={100} src={require('@/assets/images/logo-bg.png')} />
            </div>

            <div>
                <Image
                    alt='product'
                    width={100}
                    height={0}
                    src='https://media-neo.dfsglobal.cn/spu/SPU_1498322943242018817_1_en_27.jpeg'
                />
            </div>
        </div>
    );
}
