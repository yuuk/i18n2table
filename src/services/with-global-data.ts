const fetchUser = async (ctx: any) => {
    const locale = ctx.locale;
    const city = ctx.params?.city;

    console.error('fetchUser', locale, city);

    const response = await fetch('https://jsonplaceholder.org/users/1');
    const user = await response.json();
    return user;
};

export function withGlobalData<F, C>(callback: F) {
    return async (ctx: C) => {
        // @ts-ignore
        const { props = {}, ...restProps } = await callback(ctx);

        const globalProps = {} as any;

        console.time('global request api');

        const [user] = await Promise.allSettled([fetchUser(ctx)]);

        if (user.status === 'fulfilled') {
            globalProps.user = user.value;
        }

        console.timeEnd('global request api');

        return {
            props: {
                globalProps,
                ...props,
            },
            ...restProps,
        };
    };
}
