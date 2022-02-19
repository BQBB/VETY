module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    
    extend: {

      colors: {
        vblue: '#2A7699',
        vgray: '#F9F9F9',
        vred: '#D65454',
        vgreen: '#16a34a'
      },

      fontFamily: {
        expo: 'Expo Arabic',
        air: 'AirArabia Normal'
      },
    
      fontSize: {
        vsm: '0.875rem',
        vmd: '1.438rem',
        vlg: '2.313rem',
        vxlg: '4.063rem'
      }

    },
  },
  plugins: [],
}