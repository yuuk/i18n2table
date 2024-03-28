/** @type {import('next-i18next').UserConfig} */

const i18nextHttpBackend = require('i18next-http-backend/cjs');

module.exports = {
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'cn'],
    },
    serializeConfig: false,
    use: typeof window !== undefined ? [i18nextHttpBackend] : [],
};
