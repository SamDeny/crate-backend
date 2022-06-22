
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
            'dayjs': 'dayjs',
            '@floating-ui/dom': '@floating-ui/dom',
        },
        plugins: [
            //terser()
        ]
    },
    external: (id) => {
        return id.indexOf('./vendor/') >= 0 || id === '@floating-ui/dom';
    },
    plugins: [
        resolve(),
        postCSS({
            extract: 'css/crate-backend.min.css',
            minimize: true
        }),
        typescript({
            rootDir: './resources',
            include: [
                '**/*.ts'
            ]
        })
    ]
}
