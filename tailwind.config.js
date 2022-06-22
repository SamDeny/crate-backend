module.exports = {
    content: [
        './resources/ts/**/*.{js,ts}',
        './resources/views/**/*.{htm,html,twig}'
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                special: ['Montserrat', 'sans-serif']
            },
            transitionProperty: {
                'position': 'top, left, right, bottom'
            }
        },
    },
    plugins: [],
}
