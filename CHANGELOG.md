# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## WSCPackageGenerator [Unreleased]

[Show differences](https://github.com/manuth/WSCPackageGenerator/compare/v4.0.1...dev)

## WSCPackageGenerator v4.0.1
### Updated
  - TypeScript configuration to cover all files
  - All dependencies

[Show differences](https://github.com/manuth/WSCPackageGenerator/compare/v4.0.0...v4.0.1)

## WSCPackageGenerator v4.0.0
### Breaking
  - Converted the package to an `ESModule`

### Fixed
  - The generator to create the actual self contained php script if desired
  - The generator to add all selected components to the template package file
  - The generator to write the theme description to the corresponding theme file
  - Creation of `path.join` calls which in some cases used to contain an unnecessary empty argument
  - The creation process of the `MyPackage.ts` file to order all imports by default

### Updated
  - All dependencies
  - Generator to provide improved suggestions when asking for the theme's file name
  - All `node` imports to use the `node:`-protocol

### Added
  - Support for creating WoltLab packages written as `CommonJS` or `ESModule` code
  - New unit tests

[Show differences](https://github.com/manuth/WSCPackageGenerator/compare/v3.0.3...v4.0.0)

## WSCPackageGenerator v3.0.3
### Fixed
  - Vulnerabilities in dependencies

### Updated
  - All dependencies

[Show differences](https://github.com/manuth/WSCPackageGenerator/compare/v3.0.2...v3.0.3)

## WSCPackageGenerator v3.0.2
### Fixed
  - Broken `cleanup`-task
  - Vulnerabilities in dependencies

### Updated
  - All dependencies
  - The package metadata creation according to WoltLab's recommendations

[Show differences](https://github.com/manuth/WSCPackageGenerator/compare/v3.0.1...v3.0.2)

## WSCPackageGenerator v3.0.1
### Fixed
  - Vulnerabilities in dependencies

### Updated
  - All dependencies
  - Linting environment

[Show differences](https://github.com/manuth/WSCPackageGenerator/compare/v3.0.0...v3.0.1)

## WSCPackageGenerator v3.0.0
### Fixed
  - Package by adding missing dependencies
  - Broken `WoltLabIdentifierQuestion` which caused errors if the homepage is an invalid URL
  - Vulnerabilities in dependencies
  - Broken Drone-pipeline scripts
  - Drone-pipeline steps for multi-digit version-numbers
  - Broken release-notes scripts in Drone-pipelines

### Updated
  - All dependencies
  - Drone-pipelines to use smaller docker-images
  - Generator to use `ts-morph` for creating TypeScript-files instead of `.ejs`-files

### Added
  - A workflow for merging Dependabot-PRs
  - A workflow for analyzing the code
  - A prompt `ApplicationPrompt` for asking for a WoltLab-application
  - Support for the `ts-nameof`-plugin
  - Support for parallel step-execution in Drone-pipelines
  - Support for the Test Explorer UI

[Show differences](https://github.com/manuth/WSCPackageGenerator/compare/v2.2.1...v3.0.0)

## WSCPackageGenerator v2.2.1
### Fixed
  - All vulnerabilities
  - Broken dependabot-settings

### Added
  - Missing npm-scripts

### Updated
  - All dependencies

[Show differences](https://github.com/manuth/WSCPackageGenerator/compare/v2.2.0...v2.2.1)

## WSCPackageGenerator v2.2.0
### Updated
  - The development environment
  - All dependencies
  - The generators

[Show differences](https://github.com/manuth/WSCPackageGenerator/compare/v2.1.1...v2.2.0)

## WSCPackageGenerator v2.1.1
  - Improved the stability
  - Updated all packages
  - Fix all vulnerabilities

[Show differences](https://github.com/manuth/WSCPackageGenerator/compare/v2.1.0...v2.1.1)

## WSCPackageGenerator v2.1.0
  - Improved all complex instruction-generations
  - Completely reworked the generator
  - Updated all packages
  - Improved the stability

[Show differences](https://github.com/manuth/WSCPackageGenerator/compare/v2.0.2...v2.1.0)

## WSCPackageGenerator v2.0.2
  - Fixed the relative path-handling of the Theme class
  - Fixed the default value of the author-homepage

[Show differences](https://github.com/manuth/WSCPackageGenerator/compare/v2.0.1...v2.0.2)

## WSCPackageGenerator v2.0.1
  - Updated all packages
  - Reworked the build-tasks
  - Fixed the InstructionSet-serialization

[Show differences](https://github.com/manuth/WSCPackageGenerator/compare/v2.0...v2.0.1)

## WSCPackageGenerator v2.0.0
  - Provided full build-features for the package-library
  - Moved from `ejs`-templates to `DOMDocument`s
  - Added tests for both the generators and the package-library
  - Completely reworked the whole code
  - Fix the build-task which caused VSCode to be unable to build the package
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

[Show differences](https://github.com/manuth/WSCPackageGenerator/compare/v0.0.16...v2.0)

## WSCPackageGenerator v0.0.16
  - Add some more `.gitignore`-entries for a better user-experience
  - Fix spelling-errors
  - Store often used inputs such as the author's name or URL
  - Fix the generation of language-files for errors and options

[Show differences](https://github.com/manuth/WSCPackageGenerator/compare/v0.0.15...v0.0.16)

## WSCPackageGenerator v0.0.15
  - Adjust the `.gitignore`-file to only ignore automatically generated JavaScript-files
  - Update all `npm`-packages

[Show differences](https://github.com/manuth/WSCPackageGenerator/compare/v0.0.14...v0.0.15)

## WSCPackageGenerator v0.0.14
  - Fix the creation of template-listeners

[Show differences](https://github.com/manuth/WSCPackageGenerator/compare/v0.0.13...v0.0.14)

## WSCPackageGenerator v0.0.13
  - Fix the event-listener class
  - Rework xml-templates

[Show differences](https://github.com/manuth/WSCPackageGenerator/compare/v0.0.12...v0.0.13)

## WSCPackageGenerator v0.0.12
  - Add missing dependency  
    I just noticed my generator never really worked unless one has `fs-extra` installed already

[Show differences](https://github.com/manuth/WSCPackageGenerator/compare/v0.0.11...v0.0.12)

## WSCPackageGenerator v0.0.11
  - Display the path chosen when prompted for the destination-path after the generation has finished

[Show differences](https://github.com/manuth/WSCPackageGenerator/compare/v0.0.10...v0.0.11)

## WSCPackageGenerator v0.0.10
  - Improve the user-experience of the main generator
  - Fix the quickstart-package

[Show differences](https://github.com/manuth/WSCPackageGenerator/compare/v0.0.9...v0.0.10)

## WSCPackageGenerator v0.0.9
  - Provide the functionality to access translation-identifiers using EJS

[Show differences](https://github.com/manuth/WSCPackageGenerator/compare/v0.0.8...v0.0.9)

## WSCPackageGenerator v0.0.8
  - Add the most recent version of `mem-fs-editor`  
    I'm so excited my PR really got merged just some days ago - can't believe it, tbh xD

[Show differences](https://github.com/manuth/WSCPackageGenerator/compare/v0.0.7...v0.0.8)

## WSCPackageGenerator v0.0.7
  - Its getting even worse... this time I forgot to add a some required dependencies to the template.  
    Looks just like today isn't my day xD

[Show differences](https://github.com/manuth/WSCPackageGenerator/compare/v0.0.6...v0.0.7)

## WSCPackageGenerator v0.0.6
  - Rework the fixed `copyTpl`-method which was written the wrong way.  
    Sorry guys 😅

[Show differences](https://github.com/manuth/WSCPackageGenerator/compare/v0.0.5...v0.0.6)

## WSCPackageGenerator v0.0.5
  - Rework the folder-structure
  - Complete `SQLInstruction`-support
  - Patched `mem-fs-editor`'s way to handle binary files by adding a dirty fix.  
    A PR is already opened (https://github.com/SBoudrias/mem-fs-editor/pull/110) - let's hope it will be merged soon!
  - Beautify code using tslint
  - Add new Instruction-Types
    - SQL-Instruction
    - PHPInstruction

[Show differences](https://github.com/manuth/WSCPackageGenerator/compare/v0.0.4...v0.0.5)

## WSCPackageGenerator v0.0.4
  - Add some more info about BBCodes
  - Beautify Templates

[Show differences](https://github.com/manuth/WSCPackageGenerator/compare/v0.0.3...v0.0.4)

## WSCPackageGenerator v0.0.3
  - Fixed several templates which caused packages to not install such as:
    - The Package-metadata `package.xml`
    - The Theme-metadata `theme.xml`
    - The Emoji-metadata `emojis.xml`
    - The instruction-lists inside the package-metadata `instructions.xml`

[Show differences](https://github.com/manuth/WSCPackageGenerator/compare/v0.0.2...v0.0.3)

## WSCPackageGenerator v0.0.2
  - Improved the user-experience
  - Provided the functionality to declare required, optional and conflicting packages to the package-metadata
  - Added more predefined option-types
  - Provided the functionality to add invariant translations to the package- and style-metadata
  - Provided support for localizable options

[Show differences](https://github.com/manuth/WSCPackageGenerator/compare/v0.0.1...v0.0.2)

## WSCPackageGenerator v0.0.1
  - Added a style-generator
  - Reworked the directory-structure
  - Extended the option-instruction
  - Updated the coding-style to es7
  - Provided the functionality to write files of instruction-sets into separate directories
  - Improved the readability of the ejs-templates
  - Removed unused files
  - Added the option to create error-messages

[Show differences](https://github.com/manuth/WSCPackageGenerator/compare/v0.0.0...v0.0.1)

## WSCPackageGenerator v0.0.0
  - First release of the module

[Show differences](https://github.com/manuth/WSCPackageGenerator/compare/1be77af5dd389c497528babbddf3e591633fc7ca...v0.0.0)
