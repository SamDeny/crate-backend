
import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import { terser } from 'rollup-plugin-terser';

export default {
    input: [
        './resources/js/vendor/alpine.js',
        './resources/js/vendor/flatpickr.js'
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
        resolve(),
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