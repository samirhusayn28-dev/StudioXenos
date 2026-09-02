/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,jsx,ts,tsx}',
        './components/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                outfit: ['var(--font-outfit)', 'sans-serif'],
                poppins: ['var(--font-poppins)', 'sans-serif'],
                fira: ['var(--font-fira-code)', 'monospace'],
                syne: ['var(--font-syne)', 'sans-serif'],
                barlow: ['var(--font-barlow-condensed)', 'sans-serif'],
            },
            colors: {
                primaryBlue: '#2563eb',
                lightBg: '#f0f4f9',
            },
        },
    },
    plugins: [],
};