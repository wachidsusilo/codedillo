/** @type {import('tailwindcss/defaultTheme')} */
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss/plugin')} */
const plugin = require('tailwindcss/plugin');

const parseTheme = (theme) => {
    return Object.entries(theme).reduce((acc, [key, value]) => {
        if (typeof value === 'string') {
            acc[key] = value
        } else if (typeof value === 'object') {
            Object.entries(value).forEach(([k, v]) => {
                if (k.toLowerCase() === 'default') {
                    acc[key] = v
                } else {
                    acc[`${key}-${k}`] = v
                }
            })
        }
        return acc
    }, {})
}

const createColor = (color, alpha) => {
    color = color.replace(' ', '')
    if (color.includes('#')) {
        const alphaHex = Math.round(Math.min(Math.max(alpha, 0), 1) * 255).toString(16)
        if (color.length === 4) {
            return color[0] + color[1] + color[1] + color[2] + color[2] + color[3] + color[3] + alphaHex
        } else {
            return color + alphaHex
        }
    } else if ((color.startsWith('rgb(') || color.startsWith('rgba(')) && color.endsWith(')')) {
        let channels = color.substring(color.indexOf('(') + 1, color.indexOf(')'))
        if (channels.length >= 3) {
            return `rgba(${channels[0]}, ${channels[1]}, ${channels[2]}, ${alpha})`
        }
    }
}

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['MontserratAlternates', ...defaultTheme.fontFamily.sans]
            },
            spacing: {
                4.5: '1.125rem',
                5.5: '1.375rem',
                8.5: '2.125rem',
                18: '4.5rem',
                42: '10.5rem',
                50: '12.5rem',
                68: '17rem'
            },
            maxWidth: {
                container: '1064px',
                'container-lg': '1280px',
                '2full': '200%'
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-blue': 'linear-gradient(0deg,rgba(5,1,13,.6),rgba(5,1,13,.6)),linear-gradient(101.54deg,#7cefff 12.48%,#397ee4 40.34%,#1b0536 87.81%)',
                'gradient-red': 'linear-gradient(0deg,rgba(5,1,13,.6),rgba(5,1,13,.6)),linear-gradient(101.54deg,#fd9eff 12.48%,#9e1f3e 40.34%,#270511 87.81%)',
                'gradient-purple': 'linear-gradient(0deg,rgba(5,1,13,.6),rgba(5,1,13,.6)),linear-gradient(101.54deg,#9b4dff 12.48%,#471885 40.34%,#10051e 87.81%)',
                'gradient-green': 'linear-gradient(0deg,rgba(5,1,13,.6),rgba(5,1,13,.6)),linear-gradient(101.54deg,#9effc0 12.48%,#1f9e6a 40.34%,#052721 87.81%)',
                'gradient-yellow-magenta': 'linear-gradient(90.56deg,#27061a,#f1801f 29.69%,#cf1875 52.6%,#210311 98.44%)',
                'gradient-yellow-green': 'linear-gradient(107.56deg,#7dd76b 2.2%,#0cb57e 29.17%,#00173a 95.31%)',
                'gradient-white-shimmering': 'linear-gradient(90deg,transparent,white,transparent)',
                'gradient-magenta-blue': 'linear-gradient(107.56deg,#d78a6b 2.2%,#b50c79 29.17%,#002a3a 95.31%)',
                'panel-green': 'url(/assets/images/bg_panel.png)'
            },
            borderRadius: {
                'sm-md': '0.25rem'
            },
            fontSize: {
                xsm: ['0.7rem', '1.1rem'],
                md: ['1rem', '1.5rem'],
                mxl: ['1.125rem', '1.625rem'],
                '2.5xl': ['1.6375rem', '2.125rem']
            },
            backdropBlur: {
                '4xl': '72px',
                '5xl': '96px',
            },
            keyframes: {
                'back-and-forth': {
                    '0%': {
                        left: '0',
                        transform: 'translateX(0)'
                    },
                    '50%': {
                        left: '100%',
                        transform: 'translateX(-100%)'
                    },
                    '100%': {
                        left: '0',
                        transform: 'translateX(0)'
                    }
                },
                'pulse-magenta-purple': {
                    '0%': {
                        backgroundColor: '#cf1875'
                    },
                    '50%': {
                        backgroundColor: '#8c20b0'
                    },
                    '100%': {
                        backgroundColor: '#cf1875'
                    }
                },
                'tooltip-top': {
                    '0%': {
                        opacity: 0,
                        transform: 'translateX(-50%) translateY(0)'
                    },
                    '100%': {
                        opacity: 1,
                        transform: 'translateX(-50%) translateY(-4px)'
                    }
                },
                'tooltip-top-reverse': {
                    '0%': {
                        opacity: 1,
                        transform: 'translateX(-50%) translateY(-4px)'
                    },
                    '100%': {
                        opacity: 0,
                        transform: 'translateX(-50%) translateY(0)'
                    }
                }
            },
            animation: {
                'back-and-forth': 'back-and-forth 2s ease-in-out infinite',
                'pulse-magenta-purple': 'pulse-magenta-purple 2s ease-in-out infinite',
                'tooltip-top': 'tooltip-top 0.15s ease-in-out 1',
                'tooltip-top-reverse': 'tooltip-top-reverse 0.15s ease-in-out 1',
            },
            screens: {
                'xs': '520px',
                'xxs': '420px',
                'xl': '1281px'
            },
            colors: {
                bg: {
                    DEFAULT: '#05010d',
                    100: '#101111',
                    200: '#18191a',
                    300: '#313133',
                    400: '#494b4d'
                },
                fg: {
                    DEFAULT: '#f4f4f6',
                    200: '#c2c7ca',
                    300: '#78787c',
                    400: '#5e6366'
                },
                yellow: {
                    DEFAULT: '#ffc533',
                    transparent: 'rgba(255,197,51,0.15)'
                },
                red: {
                    DEFAULT: '#ff6161',
                    transparent: 'rgba(255,97,97,0.15)'
                },
                blue: {
                    DEFAULT: '#57c1ff',
                    transparent: 'rgba(87,193,255,0.15)'
                },
                green: {
                    DEFAULT: '#59d499',
                    transparent: 'rgba(89,212,153,0.15)'
                },
                purple: {
                    DEFAULT: '#a485ff',
                    transparent: 'rgba(164,133,255,.15)',
                    dark: '#3c123d',
                    'dark-transparent': '#3c123d99'
                },
                magenta: {
                    DEFAULT: '#cf1875',
                    transparent: 'rgba(207,24,117,0.15)'
                },
                border: '#242728',
                button: {
                    bg: 'hsla(0,0%,100%,0.815)',
                    'bg-hover': '#fff',
                    fg: '#18191a'
                }
            }
        }
    },
    plugins: [
        require('tailwind-scrollbar'),
        require('@tailwindcss/line-clamp'),
        plugin(({addVariant, addComponents, matchComponents, theme}) => {
            addVariant('supports-backdrop-filter', '@supports (backdrop-filter: blur(1px)')
            addVariant('not-supports-backdrop-filter', '@supports not (backdrop-filter: blur(1px)')
            addComponents({
                '.mask-image-none': {
                    maskImage: 'none',
                    WebkitMaskImage: 'none'
                },
                '.mask-image-r': {
                    maskImage: 'linear-gradient(to right, black 0%, black 80%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, black 0%, black 80%, transparent 100%)'
                },
                '.mask-image-bl': {
                    maskImage: 'linear-gradient(-120deg, black -20%, transparent 50%)',
                    WebkitMaskImage: 'linear-gradient(-120deg, black -20%, transparent 50%)'
                },
                '.mask-image-br': {
                    maskImage: 'linear-gradient(120deg, black 0%, transparent 60%)',
                    WebkitMaskImage: 'linear-gradient(120deg, black 0%, transparent 60%)'
                },
                '.mask-image-vertical': {
                    maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)'
                },
                '.mask-image-horizontal': {
                    maskImage: 'linear-gradient(to right, black 0%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 100%)'
                },
                '.mask-image-horizontal-reverse': {
                    maskImage: 'linear-gradient(to left, black 0%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to left, black 0%, transparent 100%)'
                },
                '.mask-image-radial-half-top': {
                    maskImage: 'radial-gradient(circle at top, black, transparent 80%);',
                    WebkitMaskImage: 'radial-gradient(circle at top, black, transparent 80%);'
                },
                '.mask-image-radial-half-top-cloud': {
                    clipPath: 'circle(100% at 50% -20%);',
                    maskImage: 'radial-gradient(circle at 50% -20%, black, transparent 72%), ' +
                        'radial-gradient(circle at 50% 0%, black, rgba(0,0,0,0.1), transparent 60%), ' +
                        'radial-gradient(circle at 46% 30%, black, rgba(0,0,0,0.1), transparent 37%), ' +
                        'radial-gradient(circle at 40% 30%, black, rgba(0,0,0,0.1), transparent 40%);',
                    WebkitMaskImage: 'radial-gradient(circle at 50% -20%, black, transparent 72%), ' +
                        'radial-gradient(circle at 50% 0%, black, rgba(0,0,0,0.1), transparent 50%), ' +
                        'radial-gradient(circle at 46% 30%, black, rgba(0,0,0,0.1), transparent 37%), ' +
                        'radial-gradient(circle at 40% 30%, black, rgba(0,0,0,0.1), transparent 40%);'
                },
                '.scrollbar-thin-purple-dark': {
                    '@apply !scrollbar-thin !scrollbar-track-transparent !scrollbar-thumb-purple-dark-transparent': {}
                },
                '.shrink-on-click': {
                    '@apply active:scale-95 transition': {}
                },
                '.text-shadow-none': {
                    textShadow: 'none'
                },
                '.text-shadow-sm': {
                    textShadow: '1px 1px 3px rgb(36 37 47 / 25%)'
                },
                '.text-shadow-md': {
                    textShadow: '0px 1px 2px rgb(30 29 39 / 19%), 1px 2px 4px rgb(54 64 147 / 18%)'
                },
                '.text-shadow-lg': {
                    textShadow: '3px 3px 6px rgb(0 0 0 / 26%), 0 0 5px rgb(15 3 86 / 22%)'
                },
                '.text-shadow-xl': {
                    textShadow: '1px 1px 3px rgb(0 0 0 / 29%), 2px 4px 7px rgb(73 64 125 / 35%)'
                },
                '.scrollbar-hide': {
                    '-ms-overflow-style': 'none',
                    'scrollbar-width': 'none',
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    }
                },
                '.scrollbar-default': {
                    '-ms-overflow-style': 'auto',
                    'scrollbar-width': 'auto',
                    '&::-webkit-scrollbar': {
                        display: 'block'
                    }
                }
            })

            matchComponents({
                badge: (value) => ({
                    '@apply relative ml-1.5 px-1 py-0.5 md:py-0 inline-block font-semibold rounded-sm-md md:-translate-y-1/2 text-xsm': {},
                    color: value,
                    backgroundColor: createColor(value, 0.15)
                })
            }, {
                type: 'color',
                values: {...parseTheme(defaultTheme.colors), ...parseTheme(theme('colors'))}
            })

            matchComponents({
                'flex-square': (value) => ({
                    '@apply flex items-center justify-center': {},
                    width: value,
                    height: value
                })
            }, {
                type: 'length',
                values: {...parseTheme(defaultTheme.spacing), ...parseTheme(theme('spacing'))}
            })


            matchComponents({
                s: (value) => ({
                    width: value,
                    height: value
                })
            }, {
                type: 'length',
                values: {...parseTheme(defaultTheme.spacing), ...parseTheme(theme('spacing'))}
            })
        })
    ],
}
