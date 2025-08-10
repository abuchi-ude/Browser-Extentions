# Browser Extensions Showcase

A modern Next.js app that displays and manages browser extensions, featuring dark mode, responsive design, and beautiful UI with Tailwind CSS.

## Features
- **Extension List**: View, filter (All, Active, Inactive), and remove extensions.
- **Dark Mode**: Automatically detects system theme and allows manual toggling.
- **Responsive Design**: Cards shrink/grow between 250px and 350px, adapting to screen size.
- **Custom Styling**: Uses Tailwind CSS for colors, box shadows, and layout.
- **Font**: Uses Noto Sans from Google Fonts for a clean, readable look.

## Getting Started

### Prerequisites
- Node.js
- pnpm (recommended)

### Installation
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd browser-extentions
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the development server:
   ```bash
   pnpm dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
- `src/app/page.tsx` — Main page component
- `src/app/layout.tsx` — Root layout and font setup
- `src/app/globals.css` — Global styles and Tailwind config
- `src/app/data/data.json` — Extension data
- `public/assets/images/` — Logos and icons

## Customization
- **Add Extensions**: Edit `src/app/data/data.json` to add or update extensions.
- **Change Colors**: Update `tailwind.config.js` or CSS variables in `globals.css`.
- **Font**: Change the Google Fonts link in `layout.tsx` and update `globals.css` as needed.

## Dark Mode Implementation
- Uses React state to detect system theme on load (`window.matchMedia`).
- User can toggle theme via sun/moon icon.
- Tailwind's `dark:` classes style components based on theme.

## Responsive Cards
- Cards use `min-w-[250px]`, `max-w-[350px]`, and `w-full` for flexible sizing.
- Cards shrink before wrapping, ensuring a smooth layout on all devices.

## License
MIT

---

Feel free to customize and extend this project for your own browser extension showcase or dashboard!
