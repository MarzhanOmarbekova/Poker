/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        black: '#000000',
        white: '#ffffff',
        gold: '#FFD700',
        'rich-gold': '#D4AF37',
        'dark-wood': '#3E2C1C',
        'velvet': '#3B0A16',
        'deep-brown': '#4E342E',
        'rich-dark': '#1a1a1a',
        'light-gold': '#F9E79F',
        gray: {
          100: '#f5f5f5',
          900: '#1a1a1a',
        },
      },
      fontFamily: {
        serif: ['"Cinzel"', 'serif'],
        sans: ['"Open Sans"','sans-serif'],
      },
      backgroundImage: {
        'mainbg': "url('/cs.png')",
        'velv': "url('/velv.jpg')",
        'table': "url('/table.jpg')",
        'wood': "url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d3ac3ddb-903e-427e-8991-85b788462020/dc36576-a751b025-1e75-4563-a004-49da300ef8ab.jpg/v1/fill/w_1600,h_800,q_75,strp/digital_dark_wood_texture_1__12__by_duzulek_dc36576-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODAwIiwicGF0aCI6IlwvZlwvZDNhYzNkZGItOTAzZS00MjdlLTg5OTEtODViNzg4NDYyMDIwXC9kYzM2NTc2LWE3NTFiMDI1LTFlNzUtNDU2My1hMDA0LTQ5ZGEzMDBlZjhhYi5qcGciLCJ3aWR0aCI6Ijw9MTYwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.niFDBmwOVEW5Sb5ckRimSiRn0_felvsLz11Q9EZXZgU')",
        'luxury': "url('https://expatnights.com/uae/wp-content/uploads/2022/02/DARK-ROOM-DUBAI.jpg')"
      },
    },
    boxShadow: {
      gold: '0 0 10px #FFD700',
    }
  },
  plugins: [],
}
