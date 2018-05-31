# WSCPackageGenerator v0.0.16
  - Add some more `.gitignore`-entries for a better user-experience
  - Fix spelling-errors
  - Store often used inputs such as the author's name or URL
  - Fix the genration of language-files for errors and options

# WSCPackageGenerator v0.0.15
  - Adjust the `.gitignore`-file to only ignore automatically generated JavaScript-files
  - Update all `npm`-packages

# WSCPackageGenerator v0.0.14
  - Fix the creation of template-listeners

# WSCPackageGenerator v0.0.13
  - Fix the event-listener class
  - Rework xml-templates

# WSCPackageGenerator v0.0.12
  - Add missing dependency  
    I just noticed my generator never really worked unless one has `fs-extra` installed already

# WSCPackageGenerator v0.0.11
  - Display the path chosen when prompted for the destination-path after the generation has finished

# WSCPackageGenerator v0.0.10
  - Improve the user-experience of the main generator
  - Fix the quickstart-package

# WSCPackageGenerator v0.0.9
  - Provide the functionality to access translation-identifiers using EJS

# WSCPackageGenerator v0.0.8
  - Add the most recent version of `mem-fs-editor`  
    I'm so excited my PR really got merged just some days ago - can't believe it, tbh xD

# WSCPackageGenerator v0.0.7
  - Its getting even worse... this time I forgot to add a some required dependencies to the template.  
    Looks just like today isn't my day xD

# WSCPackageGenerator v0.0.6
  - Rework the fixed `copyTpl`-method which was written the wrong way.  
    Sorry guys :sweat_smile:

# WSCPackageGenerator v0.0.5
  - Rework the folder-structure
  - Complete `SQLInstruction`-support
  - Patched `mem-fs-editor`'s way to handle binary files by adding a dirty fix.  
    A PR is already opened (https://github.com/SBoudrias/mem-fs-editor/pull/110) - let's hope it will be merged soon!
  - Beautify code using tslint
  - Add new Instruction-Types
    - SQL-Instruction
    - PHPInstruction

# WSCPackageGenerator v0.0.4
  - Add some more info about BBCodes
  - Beautify Templates

# WSCPackageGenerator v0.0.3
  - Fixed several templates which caused packages to not install such as:
    - The Package-metadata `package.xml`
    - The Style-metadata `style.xml`
    - The Emoji-metadata `emojis.xml`
    - The instruction-lists inside the package-metadata `instructions.xml`