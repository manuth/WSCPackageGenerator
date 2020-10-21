# WSCPackageGenerator
A Generator for WoltLab Suite Core Packages.

## Usage
### Installing `WSCPackageGenerator`
You can install `WSCPackageGenerator` using following command:

```bash
npm install -g yo @manuth/generator-wsc-package
```

### Using the Generator
You can run the generator by invoking this command on a command prompt:

```bash
yo @manuth/wsc-package
```

## Generator Output
  - WoltLab Suite Core Package
    - Meta-Data written in TypeScript
    - Components written in TypeScript (optional)
  - NPM-scripts for...
    - Compiling the Package-Metadata
    - Compiling the Package-Metadata in Watched Mode
    - Building the Package-File (`.tar`-archive)
  - Visual Studio Code-Environment (optional)
