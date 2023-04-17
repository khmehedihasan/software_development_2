module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        'dark-blue-1': '#00284d',
        'dark-blue-2': '#001a33',
      },
      height: {
        'screen-1': '92vh',
        'screen-2': '8vh',
      },
      keyframes: {
        my: {
          '0%': { borderRightColor: 'rgb(22 163 74)', borderBottomColor: 'rgb(22 163 74)', borderLeftColor: 'rgb(22 163 74)', borderTopColor: 'rgb(22 163 74)', },
          '25%': {  borderRightColor: 'rgb(187 247 208)', },
          '50%': {  borderBottomColor: 'rgb(187 247 208)', },
          '75%': {  borderLeftColor: 'rgb(187 247 208)', },
          '100%': { borderTopColor: 'rgb(187 247 208)', }
        },
        my2: {
          '0%': { borderRightColor: 'rgb(220 38 38)', borderBottomColor: 'rgb(220 38 38)', borderLeftColor: 'rgb(220 38 38)', borderTopColor: 'rgb(220 38 38)', },
          '25%': {  borderRightColor: 'rgb(254 202 202)', },
          '50%': {  borderBottomColor: 'rgb(254 202 202)', },
          '75%': {  borderLeftColor: 'rgb(254 202 202)', },
          '100%': { borderTopColor: 'rgb(254 202 202)', }
        }
      },
      animation: {
        a1: 'my 10s ease-in-out 1',
        a2: 'my2 10s ease-in-out 1',
      }
    },
  },
  plugins: [],
}
