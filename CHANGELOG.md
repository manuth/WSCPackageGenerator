# WSCPackageGenerator v0.0.6
  - Rework the folder-structure
  - Complete `SQLInstruction`-support
  - Patched `mem-fs-editor`'s way to handle binary files by adding a dirty fix.  
    A PR is already opened (https://github.com/SBoudrias/mem-fs-editor/pull/110) - let's hope it will be merged soon!

# WSCPackageGenerator v0.0.5
  - Beautify code using tslint
  - Add new Instruction-Types
    - SQL-Instruction
    - PHPInstruction

# WSCPackageGenerator v0.0.3
  - Fixed several templates which caused packages to not install such as:
    - The Package-metadata `package.xml`
    - The Style-metadata `style.xml`
    - The Emoji-metadata `emojis.xml`
    - The instruction-lists inside the package-metadata `instructions.xml`