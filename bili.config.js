/** @type {import('bili').Config} */
module.exports = {
    input: 'src/index.ts',
    output: {
        format: ['esm'],
    },
    externals: ['react', 'firebase'],
};
