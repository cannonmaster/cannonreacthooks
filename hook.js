#!/usr/bin/env node

import fs from "fs";
import path from "path";
import inquirer from "inquirer";
import { Command } from "commander";

// Define the program
const program = new Command();
program.version("1.0.0").description("Create a folder with three files.");

// Prompt the user for input
const promptUser = async () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "folderName",
      message: "Enter the folder name:",
    },
  ]);
};

// Create the folder and files
const createFolderWithFiles = (folderName) => {
  const folderPath = path.resolve(
    process.cwd() + "/src/hook_store",
    folderName
  );

  if (fs.existsSync(folderPath)) {
    console.error(`Error: Folder "${folderName}" already exists.`);
    process.exit(1);
  }

  try {
    fs.mkdirSync(folderPath);
    fs.writeFileSync(path.join(folderPath, "index.ts"), "");
    fs.writeFileSync(path.join(folderPath, "demo.tsx"), "");
    fs.writeFileSync(path.join(folderPath, `${folderName}.ts`), "");
  } catch (error) {
    console.error(`Error: Failed to create folder and files: ${error}`);
    process.exit(1);
  }

  console.log(`Success! Folder "${folderName}" with files created.`);
};

// Run the program
program
  .action(async () => {
    const { folderName } = await promptUser();
    createFolderWithFiles(folderName);
  })
  .parse(process.argv);
