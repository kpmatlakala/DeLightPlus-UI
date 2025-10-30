#!/usr/bin/env node
import fsExtra from "fs-extra";
const { copySync, pathExistsSync } = fsExtra;

import path from "path";
import { fileURLToPath } from "url";
import inquirer from "inquirer";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log(chalk.cyanBright("\n✨ Welcome to create-delightplus-ui!\n"));

  // Step 1: Ask where to initialize
  const { locationChoice } = await inquirer.prompt([
    {
      type: "list",
      name: "locationChoice",
      message: "Where would you like to create the project?",
      choices: [
        { name: "📂 Current directory", value: "current" },
        { name: "🆕 New directory", value: "new" },
      ],
    },
  ]);

  let targetDir;
  let projectName = "delightplus-project";

  if (locationChoice === "new") {
    const { name } = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Enter project name:",
        default: projectName,
      },
    ]);

    projectName = name;
    targetDir = path.resolve(process.cwd(), projectName);

    if (pathExistsSync(targetDir)) {
      console.error(chalk.red(`❌ Directory "${projectName}" already exists.`));
      process.exit(1);
    }

    fsExtra.mkdirSync(targetDir);
  } else {
    targetDir = process.cwd();
  }

  // Step 2: Ask for template
  const templatesDir = path.resolve(__dirname, "../templates");
  if (!fsExtra.existsSync(templatesDir)) {
    console.error(chalk.red("❌ No templates folder found."));
    process.exit(1);
  }

  const availableTemplates = fsExtra
    .readdirSync(templatesDir)
    .filter((dir) => fsExtra.statSync(path.join(templatesDir, dir)).isDirectory());

  if (availableTemplates.length === 0) {
    console.error(chalk.red("❌ No templates found inside /templates."));
    process.exit(1);
  }

  const { template } = await inquirer.prompt([
    {
      type: "list",
      name: "template",
      message: "Select a template to use:",
      choices: availableTemplates.map((t) => ({
        name: `📦 ${t}`,
        value: t,
      })),
    },
  ]);

  // Step 3: Copy template
  const templateDir = path.join(templatesDir, template);

  console.log(chalk.yellowBright(`\n🧩 Creating project using "${template}" template...\n`));
  copySync(templateDir, targetDir, { overwrite: false, errorOnExist: false });

  // Step 4: Update package.json name (optional)
  const pkgPath = path.join(targetDir, "package.json");
  if (fsExtra.existsSync(pkgPath)) {
    const pkg = await fsExtra.readJSON(pkgPath);
    pkg.name = projectName;
    await fsExtra.writeJSON(pkgPath, pkg, { spaces: 2 });
  }

  // Step 5: Done!
  console.log(chalk.greenBright(`✅ Project created successfully at: ${targetDir}`));
  console.log(chalk.cyan("\nNext steps:"));
  if (locationChoice === "new") console.log(`  cd ${projectName}`);
  console.log("  npm install");
  console.log("  npm run dev\n");
}

main().catch((err) => {
  console.error(chalk.red("❌ Error:"), err.message);
  process.exit(1);
});
