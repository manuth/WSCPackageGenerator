# WSCPackageGenerator
A yeoman generator for WoltLab Suite Core 3.1.1 packages

## Usage
### Install WSCPackageGenerator
You can install `WSCPackageGenerator` using following commands:

```bash
npm install -g yo generator-wsc-package
```

### Generate a WoltLab Suite Core Package
You can create a package for WoltLab Suite Core using following command:

```bash
yo wsc-package
```

## Generator Output
  - Create a basic folder structure
  - Create npm-scripts for...
    - Compiling TypeScript
    - Watching TypeScript-files
    - Building the Package
  - Create Visual Studio Code-Tasks for compiling and building the package by pressing <kbd>CTRL</kbd>, <kbd>SHIFT</kbd> + <kbd>B</kbd>