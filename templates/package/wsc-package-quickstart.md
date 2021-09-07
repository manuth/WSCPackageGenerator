# Welcome to your WSC Package
This environment allows you to easily create packages for WoltLab Suite Core.

## What's in the folder?
  - `.vscode`  
    This folder contains settings and build-task configurations for VSCode.  
    Feel free to delete this folder if you won't use VSCode.
  - `tsconfig.json` contains configurations for the TypeScript-compiler.
    This allows you to write your meta-files in TypeScript instead of JavaScript.
  - `Package.ts` contains meta-data about the package.

## Console-Commands
When running a console inside this folder you can use following commands:  
Use this command in order to compile the TypeScript-files to JavaScript:
```bash
npm run compile
```

Using the watch-script you can run the compiler in background and let it compile whenever you save a TypeScript-file:
```bash
npm run watch
```

By running the build-script you can build the package:
```bash
npm run build
```

## Building the Package
If you're using Visual Studio Code you just have to open up this folder and press <kbd>CTRL</kbd> <kbd>SHIFT</kbd> + <kbd>B</kbd> in order to build the package. All build-results will be saved to the `bin`-folder.

You could optionally build the package by running following commands in your favorite console:
```bash
npm run compile
npm run build
```

## Creating Themes
In order to create a theme open a console window inside the package-folder and run following command:
```bash
yo wsc-package:theme
```