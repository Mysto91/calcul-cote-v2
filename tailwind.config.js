/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {},
    },
    safelist: [
        'text-amber-500',
        'border-amber-500',
        {
            pattern: /border-amber-500/,
            variants: ['focus-visible'],
        },
        {
            pattern: /ring-amber-300/,
            variants: ['focus-visible'],
        },
    ],
    plugins: []
}
