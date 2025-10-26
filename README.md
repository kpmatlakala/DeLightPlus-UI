# DeLightPlus UI

A collection of reusable React UI components by DeLightPlus.

![npm version](https://img.shields.io/npm/v/delightplus-ui)
![npm downloads](https://img.shields.io/npm/dm/delightplus-ui)
![license](https://img.shields.io/npm/l/delightplus-ui)

## Quick Start

Create a new project with DeLightPlus UI:

```bash
npx create-delightplus-ui my-app
cd my-app
npm install
npm run dev
```

Or add to an existing project:

```bash
npm install delightplus-ui
```

**Example App:**

```tsx
import { Container, Card, Button } from 'delightplus-ui';

export default function App() {
  return (
    <Container className="min-h-screen flex items-center justify-center">
      <Card className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to DelightPlus UI!</h1>
        <Button>Get Started</Button>
      </Card>
    </Container>
  );
}
```

## Installation

### 1. Install Package & Dependencies

```bash
npm install delightplus-ui
npm install react@^18.2.0 react-dom@^18.2.0
```

### 2. Configure Tailwind CSS

If you haven't already set up Tailwind CSS in your project:

```bash
npm install -D tailwindcss@^3.4.1 postcss@^8.4.35 autoprefixer@^10.4.17
```

Create `tailwind.config.js`:

```javascript
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

Create `postcss.config.js`:

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### 3. Import Styles

```tsx
// In your main app file (app/layout.tsx or _app.tsx)
import 'delightplus-ui/styles.css';
import './globals.css';
```

## Components

- **Button** - Customizable button with variants and sizes
- **Card** - Flexible container with header and footer
- **Container** - Responsive content wrapper
- **Modal** - Dialog with overlay management
- **Input** - Enhanced input with labels and validation
- **Textarea** - ForwardRef-enabled textarea
- **Select** - Themed select dropdown
- **Icons** - Comprehensive SVG icon set

## Usage & Examples

### Button

```tsx
import { Button } from 'delightplus-ui';

function MyComponent() {
  return (
    <div className="space-x-2">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
    </div>
  );
}
```

Custom styling:

```tsx
<Button className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-700">
  <span className="font-semibold">Create</span>
</Button>
```

### Card

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from 'delightplus-ui';

export default function ExampleCard() {
  return (
    <Card variant="default">
      <CardHeader>
        <CardTitle>Project Dashboard</CardTitle>
        <CardDescription>Manage your projects and tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-foreground">Your content here</p>
      </CardContent>
      <CardFooter>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  );
}
```

### Container

```tsx
import { Container } from 'delightplus-ui';

export default function Page() {
  return (
    <Container width="xl" padded>
      <h1 className="text-2xl font-semibold">Hello World</h1>
      <p className="text-muted-foreground">Welcome to your application</p>
    </Container>
  );
}
```

### Input

```tsx
import { Input } from 'delightplus-ui';

function LoginForm() {
  return (
    <div className="space-y-4">
      <Input 
        label="Email" 
        type="email" 
        placeholder="you@example.com"
        helperText="We'll never share your email"
      />
      <Input 
        label="Password" 
        type="password" 
        placeholder="••••••••"
        variant="outlined"
      />
    </div>
  );
}
```

### Textarea

```tsx
import { Textarea } from 'delightplus-ui';

function BioForm() {
  return (
    <Textarea
      id="bio"
      label="Bio"
      placeholder="Tell us about yourself"
      variant="outlined"
      size="md"
      helperText="Max 500 characters"
    />
  );
}
```

### Select

```tsx
import { Select } from 'delightplus-ui';

const options = [
  { value: 'opt1', label: 'Option 1' },
  { value: 'opt2', label: 'Option 2' },
];

function Example() {
  return (
    <Select 
      label="Choice" 
      options={options} 
      variant="outlined" 
      size="md" 
    />
  );
}
```

### Modal

```tsx
import { Modal, Button } from 'delightplus-ui';
import { useState } from 'react';

function ExampleModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Example Modal"
      >
        <p>Modal content goes here</p>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsOpen(false)}>
            Confirm
          </Button>
        </div>
      </Modal>
    </>
  );
}
```

### Using Icons

All icons are available as React components:

```tsx
import { GitHubIcon, ReactIcon, StarIcon } from 'delightplus-ui/icons';

function IconExamples() {
  return (
    <div className="flex gap-4 items-center">
      <GitHubIcon size={32} className="text-gray-800" />
      <ReactIcon size={28} className="text-sky-500" />
      <StarIcon size={24} className="text-yellow-500" />
    </div>
  );
}
```

See the full icon list for all available icons.

## Theming

Wrap your app with the `ThemeProvider`:

```tsx
// app/layout.tsx or _app.tsx
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

Toggle theme in your components:

```tsx
import { useTheme } from 'delightplus-ui';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button 
      onClick={toggleTheme}
      className="px-4 py-2 rounded bg-primary text-primary-foreground"
    >
      Switch to {theme === 'light' ? 'dark' : 'light'} mode
    </button>
  );
}
```

## Development

To contribute or develop locally:

```bash
# Clone and setup
git clone <repository>
cd delightplus-ui
npm install

# Build package
npm run build

# Link locally
npm link
cd ../your-project
npm link delightplus-ui
```

## Publishing

```bash
npm run release  # Increments version, builds, and publishes
```

## Troubleshooting

### Vite + ESM Configuration

If using ESM, rename `postcss.config.js` to `postcss.config.cjs` or use:

```javascript
// postcss.config.js (ESM)
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### Tailwind Classes Not Found

Ensure your `tailwind.config.js` includes the library in content:

```javascript
content: [
  './src/**/*.{js,ts,jsx,tsx}',
  './node_modules/delightplus-ui/**/*.{js,jsx,ts,tsx,mjs}',
],
```

## License

MIT © Kabelo Peter Matlakala