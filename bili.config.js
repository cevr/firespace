/** @type {import('bili').Config} */
module.exports = {
    input: 'src/index.ts',
    output: {
        format: ['esm', 'cjs'],
    },
    externals: ['react', 'firebase'],
};
