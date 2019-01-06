# <%= Name %>
<%= Description %>

## Building the Package
### Using Visual Studio Code
There are premade build-scripts inside the workspace.  
This allows you to build the package by simply pressing <kbd>CTRL</kbd>, <kbd>SHIFT</kbd>+<kbd>B</kbd>.

The package will be built to the `bin`-directory.

### Using a Console
#### Compiling TypeScript
You can compile the meta-data files written in TypeScript by using this command:

```bash
npm run compile
```

You may want to compile the TypeScript-files watching said files for changes.  
You can do this by using this command:

```bash
npm run watch
```

#### Building the Package
After compiling the TypeScript-files you can build the package using

```bash
npm run build
```

This will create the package into the `bin`-directory.