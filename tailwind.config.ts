import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: '#393E46', // Dark gray as base background
				foreground: '#EEEEEE', // Light text for readability on dark background
				card: {
					DEFAULT: '#222831', // Darker shade for card elements
					foreground: '#EEEEEE', // Light text on cards
				},
				popover: {
					DEFAULT: '#222831',
					foreground: '#EEEEEE',
				},
				primary: {
					DEFAULT: '#00ADB5', // Teal for key elements
					foreground: '#EEEEEE',
				},
				secondary: {
					DEFAULT: '#A6B1E1', // Muted purple for subtle contrast
					foreground: '#222831',
				},
				muted: {
					DEFAULT: '#A6B1E1',
					foreground: 'rgba(238, 238, 238, 0.6)', // 60% light for muted text
				},
				accent: {
					DEFAULT: '#00ADB5', // Teal for buttons/hover
					foreground: '#EEEEEE',
				},
				destructive: {
					DEFAULT: '#b9004b',
					foreground: '#EEEEEE',
				},
				border: '#00ADB5', // Teal borders for better contrast on dark background
				input: '#222831', // Darker shade for inputs
				ring: '#00ADB5', // Teal for focus rings
			},
			borderRadius: {
				lg: '0.75rem', // Slightly larger for modern softness
				md: '0.5rem',
				sm: '0.25rem',
			},
			fontFamily: {
				sans: ['Poppins', 'Montserrat', 'sans-serif'], // Sleek, modern sans-serif
			},
			spacing: {
				'18': '4.5rem', // Extra whitespace for minimalism
				'24': '6rem',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				marquee: {
					from: { transform: 'translateX(0)' },
					to: { transform: 'translateX(calc(-50% - var(--gap)/2))' },
				},
				'marquee-reverse': {
					from: { transform: 'translateX(0)' },
					to: { transform: 'translateX(calc(50% + var(--gap)/2))' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				marquee: 'marquee var(--duration) linear infinite',
				'marquee-reverse': 'marquee-reverse var(--duration) linear infinite',
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};

export default config;