# Sixth lesson notes

## Tailwind CSS

### What is Tailwind CSS?

Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces. It is a low-level CSS 
framework that provides a set of utility classes that can be composed to build any design, directly in your markup.

## How to install Tailwind CSS

### Install Tailwind CSS using npm

```bash
npm install -D tailwindcss postcss autoprefixer
```

### How to init the Tailwind CSS

```bash
npx tailwindcss init -p
```

## How to know the documentation of the Tailwind CSS

```bash
https://tailwindcss.com/docs
```

Note: At the file `tailwind.config.js` we are gonna to put the configuration of the Tailwind CSS, so, we need to put
this code:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Note: The documentation says that the Tailwind CSS starts when you put this command into the terminal:

```bash
npx tailwindcss -i ./src/App.css -o ./dist/output.css --watch
```

Note: The documentation says that the Tailwind CSS to start there are three lines to put in `src/input.css`, but in our
case we are gonna to put the three lines in `src/App.css` because we are using React.