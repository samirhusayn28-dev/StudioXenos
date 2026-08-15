/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,jsx,ts,tsx}',
        './components/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primaryBlue: '#2563eb',
                lightBg: '#f0f4f9',
            },
        },
    },
    plugins: [],
};