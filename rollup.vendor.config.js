
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import { terser } from 'rollup-plugin-terser';

export default {
    input: [
        './resources/ts/vendor/dayjs.js',
        './resources/ts/vendor/floating.ts',
    ],
    output: {
        compact: true,
        dir: './public/vendor',
        format: 'es',
        plugins: [
            terser()
        ]
    },
    plugins: [
        resolve({
            browser: true
        }),
        typescript(),
        copy({
            targets: [
                { 
                    src: 'node_modules/bootstrap-icons/icons/*.svg',
                    dest: 'public/icons/' 
                }
            ]
        })
    ]
}
