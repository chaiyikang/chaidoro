/** @type {import('tailwindcss').Config} */

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: { roboto: ["Roboto", "sans-serif", "serif"] },
			screens: { overlap: { max: "930px" } },
		},
		fontSize: {
			xs: "0.579rem",
			sm: "0.694rem",
			base: "0.833rem",
			xl: "1rem",
			"2xl": "1.2rem",
			"3xl": "1.44rem",
			"4xl": "1.728rem",
			"5xl": "2.074rem",
			"6xl": "2.488rem",
			"7xl": "2.987rem",
			"8xl": "3.584rem",
			icon: "3.2rem",
		},
	},
	plugins: [require("tw-elements-react/dist/plugin.cjs")],
};
