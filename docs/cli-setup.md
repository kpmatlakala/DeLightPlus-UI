## 🚀 DelightPlus CLI & Template Setup (Single Repo)

This guide walks you through structuring and publishing a CLI tool create-delightplus-ui that scaffolds DelightPlus UI apps using Vite, Next.js, or T3 Stack — from within the same repo.
---

### CLI Structure: create-delightplus-ui

This is a Node CLI that:
- Prompts the user for a project name
- Prompts which template to use (vite / next / t3)
- Copies the correct template folder into the new project
- Installs dependencies

### 📂 Folder Structure Example
delightplus-ui repo:
```
delightplus-ui/
├── src/                       # Your UI lib source (builds to NPM)
├── create-delightplus-ui/    # CLI entry point
│   ├── index.js              # CLI logic
│   └── package.json          # CLI package definition
│
├── templates/                # Template projects
│   ├── vite/
│   ├── next/
│   └── t3/
│
├── package.json              # delightplus-ui lib (already published)
└── ...
```

### CLI: create-delightplus-ui
A simple CLI that:
- Prompts the user for a project name
- Asks which starter template to use (vite / next / t3)
- Copies the correct template from templates/
- Installs dependencies
- 💡 Optionally adds Git init
---
### 📝 create-delightplus-ui/package.json
```json
{
  "name": "create-delightplus-ui",
  "version": "0.1.0",
  "bin": {
    "create-delightplus-ui": "index.js"
  },
  "dependencies": {
    "inquirer": "^9.0.0",
    "degit": "^2.8.4" // for copying template folders
  }
}
```


### Install dependencies:
```bash
cd create-delightplus-ui
npm install inquirer degit
npm install
```

### 📝 create-delightplus-ui/index.js (CLI entry point)
```js
#!/usr/bin/env node

const inquirer = require('inquirer');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

(async () => {
  console.log("✨ Welcome to DelightPlus UI Project Creator ✨");

  const { projectName } = await inquirer.prompt([
    {
      name: 'projectName',
      message: 'Project name:',
      default: 'my-app'
    }
  ]);

  const { template } = await inquirer.prompt([
    {
      type: 'list',
      name: 'template',
      message: 'Choose a template:',
      choices: ['vite', 'next', 't3']
    }
  ]);

  const projectPath = path.join(process.cwd(), projectName);
  const templatePath = path.join(__dirname, '..', 'templates', template);

  if (fs.existsSync(projectPath)) {
    console.error(`❌ Directory ${projectName} already exists.`);
    process.exit(1);
  }

  fs.mkdirSync(projectPath);

  console.log(`📂 Copying template...`);
  execSync(`npx degit file:${templatePath} ${projectName}`, { stdio: 'inherit' });

  console.log('📦 Installing dependencies...');
  process.chdir(projectPath);
  execSync('npm install', { stdio: 'inherit' });

  console.log('\n✅ Project created successfully!');
  console.log(`👉 cd ${projectName}`);
  console.log('👉 npm run dev');
})();
```

Make it executable:
```bash
chmod +x index.js
```

---

### 📝 Template Structure

You’ll need three folders:
```luo
templates/
├── vite/
│   ├── package.json
│   ├── src/
│   ├── tailwind.config.js
│   └── ...
├── next/
└── t3/
```

Each template folder is just a ready-to-run project (like a starter).
Inside each template’s package.json, you already include:

```json
"dependencies": {
  "delightplus-ui": "^0.1.32",
  "react": "^18.0.0",
  "react-dom": "^18.0.0"
}
```
And Tailwind CSS pre-installed.

---

### 📝 Vite Template Example (shortened)

templates/vite/package.json:
```json
{
  "name": "delightplus-ui-vite-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "delightplus-ui": "^0.1.32",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "vite": "^4.0.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

templates/vite/tailwind.config.js:
```js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/delightplus-ui/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {}
  },
  plugins: []
};
```

templates/vite/src/main.tsx:
```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, Button } from "delightplus-ui";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Welcome to DelightPlus UI</h1>
        <Button variant="outlined" className="mt-4">Hello World</Button>
      </div>
    </ThemeProvider>
  </React.StrictMode>
);
```

### 📝 Next Template Example
- Similar structure but Next.js:
- pages/_app.tsx wraps with <ThemeProvider>
- tailwind.config.js same as above
- Add next + react + react-dom to deps

### 📝 T3 Template Example
- Start with create-t3-app output
- Add delightplus-ui
- Add <ThemeProvider> in _app.tsx

### How to Test & Publish CLI
🧪 Local test
```
cd create-delightplus-ui
npm link
create-delightplus-ui my-app
```

📦 Publish to npm
```
cd create-delightplus-ui
npm publish --access public
```

🧪 Use
```
npx create-delightplus-ui my-app
```
---

### ✅ Benefits of This Setup
- No Monorepo Complexity — No Turborepo, no Nx.
- One GitHub Repo — Easy to manage on branches or folders.
- One place for all DelightPlus tools.
- Easily add more templates or tooling later.

---