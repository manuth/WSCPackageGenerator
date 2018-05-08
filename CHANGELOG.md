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