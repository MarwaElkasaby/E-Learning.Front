module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: { preflight: false } //this is for conflict between tailwind and primeng
}