import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        './src/**/*.{html,js}',
        './node_modules/tw-elements/js/**/*.js'
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                green: {
                    light: '#54b74f',
                    DEFAULT: '#359830',
                    dark: '#167911',
                },
            },
            screens: {
                'print': {'raw': 'print'},
            },
        },
    },

    // Verificar se vai quebrar o sistema
    plugins: [forms, require('tw-elements/plugin.cjs')],
};
