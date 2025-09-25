# DeLightPlus UI

A collection of reusable React UI components by DeLightPlus.

## Installation

Install DeLightPlus UI using your preferred package manager:

```bash
npm install delightplus-ui
# or
yarn add delightplus-ui
# or
pnpm add delightplus-ui
```

### Peer Dependencies

Make sure you have the following peer dependencies installed in your project:

```bash
npm install react@^18.2.0 react-dom@^18.2.0
```

### 2. Configure Tailwind CSS

If you haven't already set up Tailwind CSS in your project, follow these steps:

1. Install Tailwind CSS and its dependencies:
```bash
npm install -D tailwindcss@^3.4.1 postcss@^8.4.35 autoprefixer@^10.4.17
```

2. Create a `tailwind.config.js` file in your project root:
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/delightplus-ui/**/*.{js,jsx,ts,tsx,mjs}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

3. Create a `postcss.config.js` file:
```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### 3. Import Styles

In your main application file (e.g., `src/app/layout.tsx` or `src/pages/_app.tsx`), import the DeLightPlus UI styles:

```tsx
// Import DeLightPlus UI styles
import 'delightplus-ui/styles.css';
// Import your own Tailwind styles
import './globals.css';
```

You may also import via the deep path if preferred:

```tsx
import 'delightplus-ui/dist/styles.css';
```

Order matters: import your own CSS after the library so your overrides win.

## Usage

Import and use components in your React application:

```tsx
import { Button, Card, Container } from 'delightplus-ui';

function MyComponent() {
  return (
    <Container>
      <Card>
        <h2>Welcome to DeLightPlus UI</h2>
        <Button>Click me</Button>
      </Card>
    </Container>
  );
}
```

### Customizing Button Styles

If you want to fully control the Button's styles

```tsx
<Button
  // variant="primary"
  className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-700 focus:outline-none"
>
  <span className="font-semibold">Create</span>
</Button>
```

## Components

- **Button**  
  A customizable button supporting variants, sizes, icons, and full Tailwind styling.

- **Card**  
  A flexible container for grouping related content, with optional header and footer.

- **Container**  
  A responsive wrapper for page content, with max-width and padding utilities.

  Usage:
  ```tsx
  import { Container } from 'delightplus-ui';

  export default function Page() {
    return (
      <Container width="xl" padded>
        <h1 className="text-2xl font-semibold">Hello</h1>
        <p className="text-muted-foreground">Content</p>
      </Container>
    );
  }
  ```

- **Modal**  
  A reusable dialog/modal component with overlay and focus management.

- **Textarea**  
  ForwardRef-enabled textarea with variants and sizes, themed via CSS variables.
  
  Usage:
  ```tsx
  import { Textarea } from 'delightplus-ui';

  function Form() {
    return (
      <div className="space-y-2">
        <Textarea
          id="bio"
          label="Bio"
          placeholder="Tell us about yourself"
          variant="outlined" // outlined | filled | standard
          size="md" // sm | md | lg
          helperText="Max 500 characters"
        />
      </div>
    );
  }
  ```
  
  Notes:
  - Accepts `ref` (forwardRef) for form libs.
  - Uses semantic Tailwind utilities bound to CSS vars (e.g., `bg-background`, `border-border`, `ring-ring`).
  - Error state: pass `error` to switch border/ring to red.

- **Input**  
  ForwardRef-enabled input with optional label, prefix/suffix icons, password toggle, and character count.

  Usage:
  ```tsx
  import { Input } from 'delightplus-ui';

  function Login() {
    return (
      <div className="space-y-2">
        <Input label="Email" type="email" placeholder="you@example.com" />
        <Input label="Password" variant="password" placeholder="••••••••" />
      </div>
    );
  }
  ```
  Notes: Theming via CSS vars; error state supported via `error` prop; accessible focus using ring color from tokens.

- **Select**  
  Themed select with variants and sizes.

  Usage:
  ```tsx
  import { Select } from 'delightplus-ui';

  const options = [
    { value: 'opt1', label: 'Option 1' },
    { value: 'opt2', label: 'Option 2' },
  ];

  function Example() {
    return (
      <Select label="Choice" options={options} variant="outlined" size="md" />
    );
  }
  ```

- **Icon Set**  
  A large set of SVG icons as React components.  
  _See [Using Icons](#using-icons) for usage details._

### Card

Themed card components using CSS variables and Tailwind utilities.

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from 'delightplus-ui';

export default function ExampleCard() {
  return (
    <Card variant="default">
      <CardHeader>
        <CardTitle>Title</CardTitle>
        <CardDescription>Description text</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-foreground">Body content</p>
      </CardContent>
      <CardFooter>
        <button className="px-3 py-1 rounded bg-primary text-primary-foreground">Action</button>
      </CardFooter>
    </Card>
  );
}
```

Variants: `default` | `muted` | `outline`.

<!-- Add more components as you release them -->

## Using Icons

All icons are available as React components in the `src/icons/` directory. Each icon accepts `size`, `color`, and `className` props for easy customization.

**Example:**
```tsx
import { GitHubIcon, ReactIcon } from 'delightplus-ui/icons';

<GitHubIcon size={32} color="#333" />
<ReactIcon className="text-sky-500" />
```

See [`src/icons/README.md`](./src/icons/README.md) for a full list and usage details.

## Development

To work on this package locally:

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Build the package:
```bash
npm run build
```

4. Link the package locally (in the package directory):
```bash
npm link
```

5. Link the package in your project:
```bash
npm link delightplus-ui
```

## Publishing

To publish a new version:

```bash
npm run release
```

This will:
1. Increment the patch version
2. Build the package
3. Publish to npm

## Theming

This package exports a simple theme context to switch between light/dark or follow the system.

Import order (in your app root) should be library CSS first, then your app CSS so overrides win:

```tsx
// Next.js app/layout.tsx or pages/_app.tsx
import 'delightplus-ui/styles.css';
import './globals.css';

import { ThemeProvider } from 'delightplus-ui';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

Toggle example:

```tsx
import { useTheme } from 'delightplus-ui';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>Theme: {theme}</button>;
}
```

Tailwind directives in your app:

```css
/* globals.css in your app */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Note: The library ships with its own Tailwind-generated CSS (`styles.css`). Your app still needs its own Tailwind build to generate utilities used in your app code. Ensure Tailwind scans the library in your `content` globs.

## Troubleshooting

- Vite + ESM PostCSS config
  - If your app has `"type": "module"` in `package.json`, either rename `postcss.config.js` to `postcss.config.cjs`, or use an ESM export:
  ```js
  // postcss.config.js (ESM)
  export default {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  };
  ```

- Tailwind cannot see classes from the library
  - Ensure your Tailwind `content` includes the library as shown above, including `.mjs`.

## License

MIT © Kabelo Peter Matlakala

---
**Components**
- Button
- Modal
- Card
- Container
- ...and more

**Icons**
- See [`src/icons/README.md`](./src/icons/README.md) for the full icon set and usage instructions.

## Local Development
```bash
npm install
npm run build
```

License
MIT © DeLightPlus
---

![npm version](https://img.shields.io/npm/v/delightplus-ui)



<!--

If you want any screenshots or a live StackBlitz link embedded later, I can add that too.


---
🔹 To publish a new patch release:
```bash
npm run release
```
- Increments version from 0.1.2 → 0.1.3
- Builds the library
- Publishes it to NPM

🔹 To manually do a minor release:
```bash
npm run version:minor && npm run build && npm publish
```

---

When you release stable versions:
 ```bash
git tag v1.0.0
git push origin v1.0.0
``` -->
