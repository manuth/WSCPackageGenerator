# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

### WSCPackageGenerator v2.1.0
  - Improved all complex instruction-generations
  - Completely reworked the generator
  - Updated all packages

[Show differences][v2.1.0]

## WSCPackageGenerator v2.0.1
  - Updated all packages
  - Reworked the build-tasks
  - Fixed the InstructionSet-serialization

[Show differences][v2.0.1]

## WSCPackageGenerator v2.0.0
  - Provided full build-features for the package-library
  - Moved from `ejs`-templates to `DOMDocument`s
  - Added tests for both the generators and the package-library
  - Completely reworked the whole code

[Show differences][v2.0.0]

## WSCPackageGenerator v0.0.18
  - Fix the build-task which caused VSCode to be unable to build the package

[Show differences][v0.0.18]

## WSCPackageGenerator v0.0.17
  - Add TSLint-support
  - Provide the functionality to query controlpanel-categories inside EJS-flavored files using `Categories.{ Category-Name }`.
  - Fix the listener-templates
  - Improve the way to declare theme-variables:  
    You can now declare theme-variables using either a `.json` or a `.js`-file
  - Improve the way to declare images for themes
  - Fix the way to handle theme-variables
    - Theme-Variables are now resolved using SASS and then added to the `variables.xml`-file
  - Provide the functionality to declare thumbnails for themes
  - Provide the functionality to add a default cover-photo

[Show differences][v0.0.17]

## WSCPackageGenerator v0.0.16
  - Add some more `.gitignore`-entries for a better user-experience
  - Fix spelling-errors
  - Store often used inputs such as the author's name or URL
  - Fix the generation of language-files for errors and options

[Show differences][v0.0.16]

## WSCPackageGenerator v0.0.15
  - Adjust the `.gitignore`-file to only ignore automatically generated JavaScript-files
  - Update all `npm`-packages

[Show differences][v0.0.15]

## WSCPackageGenerator v0.0.14
  - Fix the creation of template-listeners

[Show differences][v0.0.14]

## WSCPackageGenerator v0.0.13
  - Fix the event-listener class
  - Rework xml-templates

[Show differences][v0.0.13]

## WSCPackageGenerator v0.0.12
  - Add missing dependency  
    I just noticed my generator never really worked unless one has `fs-extra` installed already

[Show differences][v0.0.12]

## WSCPackageGenerator v0.0.11
  - Display the path chosen when prompted for the destination-path after the generation has finished

[Show differences][v0.0.11]

## WSCPackageGenerator v0.0.10
  - Improve the user-experience of the main generator
  - Fix the quickstart-package

[Show differences][v0.0.10]

## WSCPackageGenerator v0.0.9
  - Provide the functionality to access translation-identifiers using EJS

[Show differences][v0.0.9]

## WSCPackageGenerator v0.0.8
  - Add the most recent version of `mem-fs-editor`  
    I'm so excited my PR really got merged just some days ago - can't believe it, tbh xD

[Show differences][v0.0.8]

## WSCPackageGenerator v0.0.7
  - Its getting even worse... this time I forgot to add a some required dependencies to the template.  
    Looks just like today isn't my day xD

[Show differences][v0.0.7]

## WSCPackageGenerator v0.0.6
  - Rework the fixed `copyTpl`-method which was written the wrong way.  
    Sorry guys 😅

[Show differences][v0.0.6]

## WSCPackageGenerator v0.0.5
  - Rework the folder-structure
  - Complete `SQLInstruction`-support
  - Patched `mem-fs-editor`'s way to handle binary files by adding a dirty fix.  
    A PR is already opened (https://github.com/SBoudrias/mem-fs-editor/pull/110) - let's hope it will be merged soon!
  - Beautify code using tslint
  - Add new Instruction-Types
    - SQL-Instruction
    - PHPInstruction

[Show differences][v0.0.5]

## WSCPackageGenerator v0.0.4
  - Add some more info about BBCodes
  - Beautify Templates

[Show differences][v0.0.4]

## WSCPackageGenerator v0.0.3
  - Fixed several templates which caused packages to not install such as:
    - The Package-metadata `package.xml`
    - The Theme-metadata `theme.xml`
    - The Emoji-metadata `emojis.xml`
    - The instruction-lists inside the package-metadata `instructions.xml`

[Show differences][v0.0.3]

## WSCPackageGenerator v0.0.2

[Show differences][v0.0.2]

## WSCPackageGenerator v0.0.1

[Show differences][v0.0.1]

## WSCPackageGenerator v0.0.0

[Show differences][v0.0.0]

<!-- References -->
[v0.0.0]: https://github.com/manuth/WSCPackageGenerator/compare/1be77af...v0.0.0
[v0.0.1]: https://github.com/manuth/WSCPackageGenerator/compare/v0.0.0...v0.0.1
[v0.0.2]: https://github.com/manuth/WSCPackageGenerator/compare/v0.0.1...v0.0.2
[v0.0.3]: https://github.com/manuth/WSCPackageGenerator/compare/v0.0.2...v0.0.3
[v0.0.4]: https://github.com/manuth/WSCPackageGenerator/compare/v0.0.3...v0.0.4
[v0.0.5]: https://github.com/manuth/WSCPackageGenerator/compare/v0.0.4...v0.0.5
[v0.0.6]: https://github.com/manuth/WSCPackageGenerator/compare/v0.0.5...v0.0.6
[v0.0.7]: https://github.com/manuth/WSCPackageGenerator/compare/v0.0.6...v0.0.7
[v0.0.8]: https://github.com/manuth/WSCPackageGenerator/compare/v0.0.7...v0.0.8
[v0.0.9]: https://github.com/manuth/WSCPackageGenerator/compare/v0.0.8...v0.0.9
[v0.0.10]: https://github.com/manuth/WSCPackageGenerator/compare/v0.0.9...v0.0.10
[v0.0.11]: https://github.com/manuth/WSCPackageGenerator/compare/v0.0.10...v0.0.11
[v0.0.12]: https://github.com/manuth/WSCPackageGenerator/compare/v0.0.11...v0.0.12
[v0.0.13]: https://github.com/manuth/WSCPackageGenerator/compare/v0.0.12...v0.0.13
[v0.0.14]: https://github.com/manuth/WSCPackageGenerator/compare/v0.0.13...v0.0.14
[v0.0.15]: https://github.com/manuth/WSCPackageGenerator/compare/v0.0.14...v0.0.15
[v0.0.16]: https://github.com/manuth/WSCPackageGenerator/compare/v0.0.15...v0.0.16
[v2.0.0]: https://github.com/manuth/WSCPackageGenerator/compare/v0.0.16...v2.0
[v2.0.1]: https://github.com/manuth/WSCPackageGenerator/compare/v2.0...v2.0.1
[v2.0.2]: https://github.com/manuth/WSCPackageGenerator/compare/v2.0.1...v2.0.2