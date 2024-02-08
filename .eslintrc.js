module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    extends: ['next'],
    rules: {
        'react-hooks/exhaustive-deps': 'off',
        'react/react-in-jsx-scope': 'off',
    },
};
