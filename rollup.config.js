
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import postCSS from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

export default {
    input: './resources/ts/index.ts',
    output: {
        compact: true,
        dir: './public/',
        entryFileNames: 'js/crate-backend.min.js',
        format: 'es',
        globals: {
            alpinejs: 'Alpine'
        },
        plugins: [
            terser()
        ]
    },
    external: (id) => {
        return id.indexOf('./vendor/') >= 0;
    },
    plugins: [
        resolve(),
        typescript(),
        postCSS({
            extract: 'css/crate-backend.min.css',
            minimize: true
        })
    ]
}
