#!/usr/bin/env node
import fsExtra from 'fs-extra';
const { copySync, pathExistsSync } = fsExtra;

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = process.argv[2];
if (!targetDir) {
  console.error('Please provide a project name');
  process.exit(1);
}

if (pathExistsSync(targetDir)) {
  console.error(`❌ Directory "${targetDir}" already exists. Choose a different name.`);
  process.exit(1);
}

const templateDir = path.resolve(__dirname, '../templates/react-tailwind-starter');
copySync(templateDir, targetDir, { overwrite: false, errorOnExist: true });

console.log(`✅ Project created at ${targetDir}`);
console.log('Next steps:');
console.log(`  cd ${targetDir}`);
console.log('  npm install');
console.log('  npm run dev');

