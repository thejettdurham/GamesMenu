// https://color.adobe.com/Tema-de-cores-3-color-theme-9754724/?showPublished=true
const transparent = 'rgba(0,0,0,0)';

const baseScheme = [
    '#97BAE8',
    '#508DCF',
    '#76C4BC',
    '#F6FF4A',
    '#F66049'
];

const foregrounds = {
    light: '#eaeaea',
    dark: '#4d4d4d',
    disabled: '#aaa',
};

const overlays = {
    light: '#e4e4e4',
    dark: '#4c4c4c',
};

export default {
    buttons: {
        alpha: {
            background: baseScheme[0],
            foreground: foregrounds.dark,
            underlay: overlays.light,
        },
        beta: {
            background: baseScheme[1],
            foreground: foregrounds.light,
            underlay: overlays.dark,
        },
        gamma: {
            background: baseScheme[2],
            foreground: foregrounds.dark,
            underlay: overlays.light,
        },
        delta: {
            background: baseScheme[3],
            foreground: foregrounds.dark,
            underlay: overlays.light,
        },
        epsilon: {
            background: baseScheme[4],
            foreground: foregrounds.light,
            underlay: overlays.dark,
        },
        disabled: {
            background: transparent,
            foreground: foregrounds.disabled,
            underlay: transparent,
        }
    },
    borders: {
        dark: foregrounds.dark,
        light: foregrounds.disabled,
    },
    headers: [
        {
            fontWeight: 'bold',
            fontSize: 16,
        },
    ]
}