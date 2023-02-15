/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./dist/**/*.{html,js}"],
    theme: {
        extend: {
            fontFamily: {
                open_sans: ["'Open Sans', sans-serif"],
            },
            colors: {
                theme: {
                    one: "#293447",
                    two: "#bbc6dc",
                    three: "#e3f2fd",
                    four: "#212837",
                    five: "#ff003d",
                    six: "#60cbff",
                },
            },
        },
    },
    plugins: [],
};
