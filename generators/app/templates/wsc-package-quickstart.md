# Welcome to your WSC Package
This environment allows you to easily create packages for WoltLab Suite Core.

- [Welcome to your WSC Package](#welcome-to-your-wsc-package)
    - [What's in the folder?](#whats-in-the-folder)
    - [Console-Commands](#console-commands)
    - [Building the Package](#building-the-package)
    - [Creating Styles](#creating-styles)
    - [Creating Instructions](#creating-instructions)
- [Examples](#examples)
    - [**`Package.ts`**](#packagets)
    - [Templates and Files](#templates-and-files)
    - [`SQLInstruction`](#sqlinstruction)
    - [Options](#options)
    - [`SettingsNode`](#settingsnode)
    - [`Option`](#option)
    - [`OptionItem`](#optionitem)
    - [EventListeners](#eventlisteners)
    - [`EventListener`](#eventlistener)
    - [Cron-Jobs](#cron-jobs)
    - [`Cronjob`](#cronjob)
    - [Translations](#translations)
    - [ErrorMessages](#errormessages)
    - [TemplateListeners](#templatelisteners)
    - [`TemlpateListener`](#temlpatelistener)
    - [Emojis](#emojis)
    - [`Emoji`](#emoji)
    - [BBCodes](#bbcodes)
    - [`BBCode`](#bbcode)
    - [`BBCodeAttribute`](#bbcodeattribute)

## What's in the folder?
  - `.vscode`  
    This folder contains settings and build-task configurations for VSCode.  
    Feel free to delete this folder if you won't use VSCode.
  - `components` contains metadata of all components you want to provide.  
    It's recommended to edit these files using a smart IDE with autocompletion.  
    You might also want to have a look at the examples at the bottom of the page.
  - `lib` contains script-files for providing auto-completion and for building the package.  
    Do not touch this folder and its contents unless you know what you're doing!
  - `tsconfig.json` contains configurations for the TypeScript-compiler.
    This allows you to write your meta-files in TypeScript instead of JavaScript.
  - `Package.ts` contains meta-data about the package itself.
  - The `bin` folder contains all build-results.
  - The `obj` folder contains an uncompressed version of the package and the styles.

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

## Creating Styles
In order to create a style open a console window inside the package-folder and run following command:
```bash
yo wsc-package:style
```

## Creating Instructions
Each type of component you want to provide is represented by an instruction.  
It's good to know that their order is considered, so keep it in mind.  
The components you've chosen while generating this package are stored inside the `components`-directory.  
Using an IntelliSense will make it easy to you to correctly edit the components.

# Examples
In this section you'll see an interface for each component you might want to create or edit.  
The **`interface`** shows all possible parameters. A question sign `?` indicates that the parameter is *optional*.

`Localizable` values are multilingual strings.  
You can provide the value in whatever language you want.  
Use the Invariant Culture `inv` in order to provide a default translation.  
For example:
```ts
    Description: {
        inv: "This is an examlpe",
        de: "Das ist ein Beispiel",
        fr: "c'est un exemple"
    }
```

## **`Package.ts`**  
> The `Package.ts`-file contains meta-data of your package.
### Interface
```ts
<%- include("./lib/Packaging/IPackage.ts") %>
```

### Example
```ts
import * as Path from "path";
import { Package } from "./lib/Packaging/Package";
import { RequiredPackageDescriptor } from "./lib/Packaging/RequiredPackageDescriptor";
import { StyleInstructionCollection } from "./lib/Customization/Styles/StyleInstructionCollection";
import { FileDescriptor } from "./lib/Packaging/FileDescriptor";
import { OptionalPackageDescriptor } from "./lib/Packaging/OptionalPackageDescriptor";

function getComponentsPath(value: string): string
{
    return Path.join(__dirname, "components", value);
}

let pkg: Package = new Package({
    Identifier: "ch.nuth.test",
    Name: "Test",
    DisplayName: {
        inv: "Test"
    },
    Date: new Date("2018/04/20"),
    Description: {
        inv: "This is a test."
    },
    InstallInstructions: [
        require("./components/FileMappings"),
        require(getComponentsPath("Options")),
        ...new StyleInstructionCollection("styles")
    ],
    AdditionalFiles: [
        new FileDescriptor({
            Source: "../OptionalPackage/bin/OptionalPackage.tar",
            Destination: "optional/ch.nuth.optional-package.tar"
        }),
        new FileDescriptor({
            Source: "../AnotherPackage/bin/AnotherPackage.tar",
            Destination: "optional/ch.nuth.another-package.tar"
        })
    ],
    RequiredPackages: [
        new RequiredPackageDescriptor({
            Identifier: "com.woltlab.wcf",
            MinVersion: "3.0.0"
        })
    ],
    OptionalPackages: [
        new OptionalPackageDescriptor({
            Identifier: "ch.nuth.optional-package",
            FileName: "optional/ch.nuth.optional-package.tar"
        }),
        new OptionalPackageDescriptor({
            Identifier: "ch.nuth.another-package",
            FileName: "optional/ch.nuth.another-package.tar"
        })
    ]
});

export = pkg;
```

### Properties
#### `Identifier`
This is the identifier of your package.  
Usually it's your domain in reversed order followed by the project's name.

**Example:**
```ts
    Identifier: "ch.nuth.mypackage"
```

#### `Name`
The name of the package. This is the name the compressed file inside the `bin`-directory will have.

**Example:**
```ts
    Name: "Example"
```

#### `DisplayName`
This is the localizable display-name of the package.

**Example:**
```ts
    DisplayName: {
        inv: "Example",
        de: "Beispiel"
    }
```

#### `Description`
This is the localizable description of the package.

**Example:**
```ts
    Description: {
        inv: "This is a test."
    }
```

#### `Author`
This property contains the name and the homepage of the author.  
If you don't provide this property the author-information of `npm`'s `package.json` will be used.

**Example:**
```ts
    Author: new Person({
        Name: "manuth",
        URL: "https://nuth.ch/"
    });
```

#### `Version`
This property allows you to specify the version of your package.  
If you don't provide this property the version of the `package.json`-file will be used.

**Example:**
```ts
    Version: "0.0.1"
```

#### `License`
This property allows you to specify the license of your package.  
If you don't provide this property the license of the `package.json`-file will be used.

```ts
    License: "Apache-2.0"
```

#### `InstallInstructions`
A set of instructions which is executed when installing this package on WoltLab Suite Core.  
You might want to write these instructions in separate modules and `require` them in the `Package.ts`.

**Example:**
```ts
    InstallInstructions: [
        /* Use "require" to load modules relative to this file: */
        require("./Options"),
        /* Use "require(getComponentsPath({ path })" to load
        * modules inside the "components"-directory: */
        require(getComponentsPath("Templates")),
        /* Use "...new StyleInstructionCollection({ path })"
        * to load a folder containing one or more styles: */
        ...new StylesInstruction("styles")
    ]
```

#### `UpdateInstructions`
UpdateInstructions provides instructions which are executed when **updating** the package from a specific version.  
Please keep in mind that always either the install-instructions ore **only one** of the update-instruction-sets will be executed!  
An update-instruction-set provides a version-number to update from and a set of instructions to execute.  
Please have a look at [`InstallInstructions`](#installinstructions) to learn more about instruction-sets.

**Example:**
```ts
    UpdateInstructions: [
        {
            /* These instructions will be executed if an
             * update from version 2.0.1 is performed. */
            FromVersion: "2.0.1",
            Instructions: [
                require(getComponentsPath("updates/2.0.1/Options"))
            ]
        }
    ]
```

#### `AdditionalFiles`
This property allows you to provide custom files which will be copied into your package.  
Files provided using `FileSystemInstruction`s will be copied to the package.  
You can optionally provide a `FileName` to decide where to copy the file(s) to.

**Example:**
```ts
    AdditionalFiles: [
        new FileDescriptor({
            Source: "../OptionalPackage/bin/OptionalPackage.tar",
            Destination: "optional/ch.nuth.optional-package.tar"
        }),
        new FileDescriptor({
            /* Copies the ./sql/CreateDB.sql
             * to "./sql/CreateDB.sql" inside the package */
            Source: "./sql/CreateDB.sql"
        })
    ]
```

#### `RequiredPackages`
Using the `RequiredPackages`-property you can provide a set of packages and their minimal version which **must** be installed in order to install this package.

**Example:**
```ts
    RequiredPackages: [
        new RequiredPackageDescriptor({
            Identifier: "com.woltlab.wcf",
            MinVersion: "3.0.0"
        })
    ]
```

#### `OptionalPackages`
Provide a set of optional packages which can optionally be installed by the user after installing this package.  
Please don't forget to provide the package-files using [`AdditionalFiles`](#additionalfiles).

**Example:**
```ts
    OptionalPackages: [
        new OptionalPackageDescriptor({
            Identifier: "ch.nuth.optionalpackgae",
            FileName: "optional/ch.nuth.optional-package.tar"
        })
    ]
```

#### `ConflictingPackages`
Provide a set of packages and their minimal version which ***mustn't*** be installed in order to install this package.  
On the other hand packages listed here can't be installed after installing this package.

**Example:**
```ts
    ConflictingPackages: [
        new ConflictingPackageDescriptor({
            Identifier: "com.woltlab.ldap",
            MinVersion: "0.0.1"
        })
    ]
```

## Templates and Files
### General
There are three different instructions for providing templates and files:

>  - **`FilesInstruction`s**  
>    FilesInstructions allow you to upload files to the WoltLab Suite Core server.  
>    This might be useful if you want to provide custom images for Emojis or custom PHP-scripts.
>  - **`TemplatesInstruction`s**
>    Using this kind of instruction you can provide or overwrite templates for the front-end.
>  - **`ACPTemplatesInstruction`s**
>    Using these instructions you can provide or owerwrite templates for the back-end (the control-panel).

The files will always be copied using [Embeddes JavaScript](embeddedjs.com) with your package as its context.  
This allows you to include identifiers and properties from your package into your PHP-scripts.  
Example: 
```php
throw new NamedUserException(WCF::getLanguage()->getDynamicVariable('<%%= Errors.userAlreadyExists.FullName %%>'));
```

The variable inside the `<%%= %%>` will be evaluated using JavaScript and returns the full name of the error.

### Interface
```ts
<%- include("./lib/Core/IFilesInstruction.ts") %>
```

### Example
```ts
import { FilesInstruction } from "../lib/Core/FilesInstruction";

let filesInstruction: FilesInstruction = new FilesInstruction({
    SourceRoot: "files"
});

export = filesInstruction;
```
```ts
import { TemplatesInstruction } from "../lib/Customization/Presentation/TemplatesInstruction";

let templatesInstruction: TemplatesInstruction = new TemplatesInstruction({
    Application: "gallery",
    SourceRoot: "templates/gallery"
});

export = templatesInstruction;
```
```ts
import { ACPTemplatesInstruction } from "../lib/Customization/Presentation/ACPTemplatesInstruction";

let acpTemplatesInstruction: ACPTemplatesInstruction = new ACPTemplatesInstruction({
    Application: "filebase",
    SourceRoot: "templates/acp/filebase",
    FileName: "acptemlpates/filebase.tar"
});

export = acpTemplatesInstruction;
```

### Properties
#### `Application`
This property specifies the application these files should be uploaded to.  
If you don't specify an application the files will be uploaded to `WoltLab Suite Core`.

**Example:**
```ts
    Application: "filebase"
```

#### `SourceRoot`
This property is required and points to the folder which contains the files or the templates.

**Example:**
```ts
    SourceRoot: "templates/acp/filebase"
```

#### `FileName`
The `FileName` specifies where the compressed folder will be saved to.  
If you don't specify a `FileName` the file will be stored to the same path with a trailing `.tar` inside the package.

**Example:**
```ts
    FileName: "acptemplates/filebase.tar"
```

## `SQLInstruction`
Using this kind of instruction you can execute an SQL-file.

### Properties
#### `SourceRoot`
The path to the `SQL`-file.

## Options
Using the `OptionsInstruction` you can provide options and their translations for the Control-Panel.  

### Interface
```ts
<%- include("./lib/Options/ControlPanel/IOptionsInstruction.ts") %>
```

### Example
```ts
import { Option } from "../lib/Options/ControlPanel/Option";
import { OptionItem } from "../lib/Options/ControlPanel/OptionItem";
import { OptionsInstruction } from "../lib/Options/ControlPanel/OptionsInstruction";
import { OptionType } from "../lib/Options/ControlPanel/OptionType";
import { SettingsNode } from "../lib/Options/ControlPanel/SettingsNode";

let optionsInstruction: OptionsInstruction = new OptionsInstruction({
    SettingsNodes: [
        new SettingsNode({
            Name: "ldap",
            DisplayName: {
                en: "LDAP-Authentication"
            },
            Parent: "security",
            Nodes: [
                new SettingsNode({
                    Name: "general",
                    DisplayName: {
                        en: "General Settings"
                    },
                    Description: {
                        en: "General LDAP-settings"
                    },
                    Options: [
                        new Option({
                            ID: "Version",
                            Name: "ldap_version",
                            DisplayName: {
                                en: "LDAP-version"
                            },
                            Description: {
                                en: "Select an LDAP-version"
                            },
                            Type: OptionType.ComboBox,
                            Default: 3,
                            Items: [
                                new OptionItem({
                                    Name: "v2",
                                    DisplayName: {
                                        en: "LDAPv2"
                                    },
                                    Value: 2
                                }),
                                new OptionItem({
                                    Name: "v3",
                                    DisplayName: {
                                        en: "LDAPv3"
                                    },
                                    Value: 3
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    ]
});

export = optionsInstruction;
```

### Properties
#### `FileName`
The filename specifies the name of the file to save the options-file to.  
If you don't provide a `FileName` the name `options.xml` fill be used.

**Example:**
```ts
    FileName: "settings.xml"
```

#### `TranslationsDirectory`
The name of the folder to save the translations of the options to.  
If you don't provide this properts the `FileName` without extension will be used.

**Example:**
```ts
    TranslationsDirectory: "option-language"
```

#### `ObjectsToDelete`
This property allows you to provide a set of names of options to delete.

**Example:**
```ts
    ObjectsToDelete: [ "deprecated_option" ]
```

#### `SettingsNodes`
The `SettingsNodes` contains a set of [`SettingsNode`s](#settingsnode).

```ts
    SettingsNodes: [
        new SettingsNode({
            Name: "ldap",
            Parent: "security"
        })
    ]
```

## `SettingsNode`
A settings-node represents an option-category.  
A category may contain sub-categories or options.

### Interface
```ts
<%- include("./lib/Options/ControlPanel/ISettingsNode.ts") %>
```

### Example
```ts
new SettingsNode({
    Name: "ldap",
    DisplayName: {
        en: "LDAP-Authentication"
    },
    Parent: "security",
    Nodes: [
        new SettingsNode({
            Name: "general",
            DisplayName: {
                en: "General Settings"
            },
            Description: {
                en: "General LDAP-settings"
            },
            Options: [
                new Option({
                    ID: "Version",
                    Name: "ldap_version",
                    DisplayName: {
                        en: "LDAP-version"
                    },
                    Description: {
                        en: "Select an LDAP-version"
                    },
                    Type: OptionType.ComboBox,
                    Default: 3,
                    Items: [
                        new OptionItem({
                            Name: "v2",
                            DisplayName: {
                                en: "LDAPv2"
                            },
                            Value: 2
                        }),
                        new OptionItem({
                            Name: "v3",
                            DisplayName: {
                                en: "LDAPv3"
                            },
                            Value: 3
                        })
                    ]
                })
            ]
        })
    ]
})
```

### Properties
#### `Name`
The name of the node.

**Example:**
```ts
    Name: "ldap"
```

#### `DisplayName`
The localizable name of the category

**Example:**
```ts
    DisplayName: {
        en: "LDAP-Link",
        de: "LDAP-Anbindung"
    }
```

#### `Parent`
Use this property if you want to attach the category to an existing category.

**Examlpe:**
```ts
    Parent: "security"
```

#### `Description`
The localizable description of the category

**Example:**
```ts
    Description: {
        en: "Settings related to LDAP",
        de: "Einstellungen im Zusammenhang mit LDAP"
    }
```

#### `Nodes`
[`SettingsNode`s](#settingsnode) contained by this node.

#### `Options`
[`Option`s](#option) contained by this node.

**Example:**
```ts
    Options: [
        new Option({
            ID: "enabled",
            Name: "ldap_enabled",
            Type: OptionType.CheckBox
        })
    ]
```

## `Option`
Options are displayed in the Admin Control-Panel inside the category you've chosen.

### Interface
```ts
<%- include("./lib/Options/ControlPanel/IOption.ts") %>
```

### Properties
#### `ID`
The ID is a package-unique identifier of the option.  
As mentioned inside the [Templates and Files](#templates-and-files)-section all templates and files are compiled using Embedded JavaScript.  
The ID is used for accessing the option inside the compiled files like this:
```
<%%= Options.{ ID }.DisplayName["de"] %%>
```

**Examlpe:**
```ts
    ID: "Enabled"
```

#### `Name`
The global-unique identifier of the option.  
It's recommended to use prefixes to prevent existing options on WoltLab Suite Core being overwritten.

**Examples:**
```ts
    Name: "ldap_enable"
```
```ts
    Name: "mypackage_enabled"
```

#### `DisplayName`
The localizable display-name of the option.

**Examlpe:**
```ts
    DisplayName: {
        en: "Enable LDAP"
    }
```

#### `Description`
The localizable description of the option.

**Examlpe:**
```ts
    Description: {
        en: `
<p>
    If you enable this option:
    <ul>
        <li>Everything will be destroyed</li>
        <li>You will die</li>
        <li>Everyone else will die too</li>
        <li>But hey - good thing is: You wouldn't have to work anymore!</li>
    </ul>
</p>`
    }
```

#### `Default`
The default value of the option.

**Example:**
```ts
    Default: 1
```

#### `Type`
The type of the option.  
Following types are allowed:

```ts
<%- include("./lib/Options/Controlpanel/OptionType.ts") %>
```

**Examlpe:**
```ts
    Type: OptionType.Checkbox
```

#### `SupportsLocalization`
This property allows you to specify whether this option is localizable.

#### `RequiresLocalization`
This property allows you to force the user to set a value for each installed language.

#### `Items`
If you've chosen an option-type such as "ComboBox", "MultiSelect" etc. you may want to provide the items of the option.  
Have a look at the [`OptionItem`](#optionitem)-section.

#### `EnableOptions`
A set of options which are accessible in the UI when activating this option.  
Please have a look at the [official documentation](https://docs.woltlab.com/package_pip_option.html) for more information.

**Examlpe:**
```ts
    EnableOptions: [
        "ldap_username",
        "ldap_password"
    ]
```

## `OptionItem`
An option-item represents an item of an option with a `ComboBox`, `MultiSelect` or similar type.

### Interface
```ts
<%- include("./lib/Options/ControlPanel/IOptionItem.ts") %>
```

### Properties
#### `Name`
The name of the item.

**Examlpe:**
```ts
    Name: "v3"
```

#### `DisplayName`
The localizable display-name of the item.

**Examlpe:**
```ts
    DisplayName: {
        en: "LDAPv3"
    }
```

#### `Value`
The value of the item.

**Examlpe:**
```ts
    Value: 3
```

## EventListeners
The `EventListenerInstruction` allows you to make WoltLab executing custom code provided by the `FilesInstruction` when a specific event is raised.

### Interface
```ts
<%- include("./lib/Events/EventListener.ts") %>
```

### Examlpe
```ts
import { EventListener } from "../lib/Events/EventListener";
import { WSCEnvironment } from "../lib/Core/WSCEnvironment";
import { EventListenersInstruction } from "../lib/Events/EventListenersInstruction";

let eventListenersInstruction: EventListenersInstruction = new EventListenersInstruction({
    EventListeners: [
        new EventListener({
            Name: "LDAPAuthentication",
            ClassName: "wcf\\system\\user\\authentication\\UserAuthenticationFactory",
            Inherit: false,
            EventName: "init",
            EventHandlerClassName: "wcf\\system\\event\\listener\\ldap\\UserAuthenticationListener",
            Environment: WSCEnvironment.Admin
        })
    ]
});

export = eventListenersInstruction;
```

### Properties
#### `FileName`
This property specifies the name of the file to store into the package.  
If you don't set this property "eventListeners.xml" will be used.

#### `EventListeners`
A set of event-listeners.  
Have a look at [this section](#eventlistener) to learn more about it.

## `EventListener`
### Properties
#### `Name`
This is the name of the listener. If you chose to install the event-listener to both the admin- and the user-environment `BackEnd` and `FrontEnd` will be appended to the names of the event-listeners.

#### `ClassName`
This property specifies the class which raises the event.

#### `Inherit`
This value indicates whether events raised by classes which inherit from `ClassName` should be handled, too.

#### `EventName`
This is the name of the event which should be handled.

#### `EventHandlerClassName`
This is the name of the class which should handle the event.  
Please keep in mind to provide the PHP-file(s) using a `FilesInstruction`.

#### `Environment`
This property allows you to choose whether to install the event-listener to the Default- (front-end), the Admin- (back-end) or both environments.

#### `Options`
A set of options of which at least one must be enabled in order to activate the event-listener.

## Cron-Jobs
Using the `CronjobInstruction` you can provide one or more cron-jobs which are executed at specific times.  
Please keep in mind to provide said cron-jobs using a `FilesInstruction`.

The Cronjob-classes must implement the `wcf\system\cronjob\ICronjob` interface.

### Interface
```ts
<%- include("./lib/Core/Cronjobs/CronjobInstruction.ts") %>
```

### Example
```ts
import { Cronjob } from "../lib/Core/Cronjobs/Cronjob";
import { CronjobInstruction } from "../lib/Core/Cronjobs/CronjobInstruction";
import { TimePoint } from "../lib/Core/Cronjobs/TimePoint";

const cronjobInstruction: CronjobInstruction = new CronjobInstruction({
    Cronjobs: [
        new Cronjob({
            Name: "ch.nuth.pokemonbbcode.fetchPokemon",
            ClassName: "wcf\\system\\cronjob\\PokemonIconFetchCronJob",
            TimePoint: TimePoint.Daily // Executes the cron-job daily at 0:00
        }),
        new Cronjob({
            Name: "ch.nuth.pokemonbbcode.fetchItem",
            ClassName: "wcf\\system\\cronjob\\ItemIconFetchCronJob",
            TimePoint: new TimePoint("1", "0", "*", "*", "*") // Executes the cron-job daily at 0:01
        })
    ]
});

export = cronjobInstruction;
```

### Properties
#### `Cronjobs`
A set of cron-jobs which are installed by this instruction.

## `Cronjob`
This class represents a cron-job which is executed periodically.

### Interface
```ts
<%- include("./lib/Core/Cronjobs/ICronjob.ts") %>
```

### Properties
#### `Name`
The name of the cron-job.

#### `ClassName`
The name of the class of the cron-job which is to be executed.

#### `Description`
The localizable description of the cron-job.

#### `TimePoint`
The declaration of the time-point to execute the cron-job.

#### `AllowEdit`
Indicates whether the cron-job can be edited.

#### `AllowDisable`
Indicates whether the cron-job can be disabled.

#### `Options`
A set of options of which at least one must be enabled in order to activate the cron-job.

## Translations
The `TranslationsInstruction` allows you to provide localizable messages for WoltLab.  
When writing files (using the `FilesInstruction`) for WoltLab you may want to access the identifiers of the messages,
for example for displaying them when a user causes an exception.

These identifiers are pretty long and you have to change them always when you adjust the structure of your messages.  
That's why this package build-system allows you to access these identifiers using following syntax:
```
<%%= Translations.{ Translation-ID } %%>
```

For Example:
```php
    throw new NamedUserException(WCF::getLanguage()->getDynamicVariable('<%%= Translations.OutdatedInfraction %%>'));
```

### Interface
```ts
<%- include("./lib/Globalization/ITranslationsInstruction.ts") %>
```

### Examlpe
```ts
import { TranslationNode } from "../lib/Globalization/TranslationNode";
import { TranslationsInstruction } from "../lib/Globalization/TranslationsInstruction";

let translationsInstruction: TranslationsInstruction = new TranslationsInstruction({
    TranslationNodes: [
        new TranslationNode({
            Name: "wcf",
            Nodes: [
                new TranslationNode({
                    Name: "infraction",
                    Translations: {
                        en: "Infraction",
                        de: "Verwarnung"
                    },
                    Nodes: [
                        new TranslationNode({
                            ID: "OutdatedInfraction",
                            Name: "outdated",
                            Translations: {
                                de: "Die Verwarnung ist veraltet.",
                                en: "The infraction is outdated."
                            }
                        })
                    ]
                })
            ]
        })
    ]
});

export = translationsInstruction;
```
This should be pretty self-explaining.  
The localizable value "infraction" can be accessed by the identifier "wcf.infraction".  
Each translation-node can contain a set of translations.  
This is pretty useful if you're creating forms or something similar.

### Properties
#### `FileName`
The `FileName` specifies the folder the language-files will be saved to.  
If you don't specify a `FileName` "language" will be used.

## ErrorMessages
Error-Messages are made up just the same way like translations.  
You can access error-identifiers inside your ejs-flavored files like this:
```
<%%= Errors.{ Error-ID } %%>
```

### Interface
```ts
<%- include("./lib/Globalization/Errors/IErrorMessagesInstruction.ts") %>
```

### Example
```ts
import { ErrorMessageNode } from "../lib/Globalization/Errors/ErrorMessageNode";
import { ErrorMessagesInstruction } from "../lib/Globalization/Errors/ErrorMessagesInstruction";

let errorMessageInstruction: ErrorMessagesInstruction = new ErrorMessagesInstruction({
    TranslationNodes: [
        new ErrorMessageNode({
            Name: "wcf.acp.option.error",
            Nodes: [
                new ErrorMessageNode({
                    Name: "ldap",
                    Nodes: [
                        new ErrorMessageNode({
                            ID: "InvalidHostname",
                            Name: "invalidHostName",
                            Translations: {
                                en: "Host not found",
                                de: "Host nicht gefunden"
                            }
                        })
                    ]
                })
            ]
        })
    ]
});

export = errorMessageInstruction;
```
The full name of this error-message, for examlpe, is accessible using:
```
<%%= Errors.InvalidHostname.FullName %%>
```

### Properties
#### `FileName`
This property works just the same like in the `TranslationsInstruction`.  
If you don't specify it, "errors" will be used.

## TemplateListeners
Template-listeners allow you to dynamically change the content of WoltLab-pages.  
You can provide them using `TemlpateListenersInstruction`s.

### Interface
```ts
<%- include("./lib/Customization/Presentation/ITemplateListenersInstruction.ts") %>
```

### Examlpe
```ts
import { TemplateListener } from "../lib/Customization/Presentation/TemplateListener";
import { WSCEnvironment } from "../lib/Core/WSCEnvironment";
import { TemplateListenersInstruction } from "../lib/Customization/Presentation/TemplateListenersInstruction";

let templateListenersInstruction: TemplateListenersInstruction = new TemplateListenersInstruction({
    TemplateListeners: [
        new TemplateListener({
            Name: "Test",
            TemplateName: "Test",
            EventName: "Test",
            Code: "blah"
        })
    ]
})

export = templateListenersInstruction;
```

### Properties
#### `FileName`
This specifies the filename of the output-file to save to the package.  
The default filename is "temlpateListeners.xml".

#### `TemlpateListeners`
A set of temlpate-listeners.

## `TemlpateListener`
### Interface
```ts
<%- include("./lib/Customization/Presentation/ITemplateListener.ts") %>
```

### Properties
#### `Name`
Use this property to specify a name for the temlpate-listener.

#### `TemlpateName`
The name of the temlpate which raises the event.

#### `EventName`
This property specifies the name of the event which is to be handled.

#### `Code`
Code writtenm in [Smarty](https://www.smarty.net/) which will be inserted when the event is raised.

### `Order`
This property is used by WoltLab Suite Core for determining the execution-order of multiple temlpate-listeners which are listening to the same event.

#### `Options`
A set of options of which at least one must be enabled in order to activate the template-listener.

## Emojis
You can provide your own emojis by using an `EmojisInstruction`.

### Interface
```ts
<% include("./lib/Customization/Emojis/IEmojisInstruction.ts") %>
```

### Examlpe
```ts
import { Emoji } from "../lib/Customization/Emojis/Emoji";
import { EmojisInstruction } from "../lib/Customization/Emojis/EmojisInstruction";

let emojiInstruction: EmojisInstruction = new EmojisInstruction({
    FileName: "smileys.xml",
    Emojis: [
        new Emoji({
            Title: "Test",
            Name: ":test:",
            FileName: "images/smileys/test.png",
            Aliases: [
                ":sick_boi:"
            ]
        })
    ]
})

export = emojiInstruction;
```

### Properties
#### `FileName`
The name of the file to store in the package.  
If the `FileName` isn't specified "emojis.xml" will be used.

### `Emojis`
A set of emojis to provide.

## `Emoji`
This class represents an emoji.

### Interface
```ts
<%- include("./lib/Customization/Emojis/IEmoji.ts") %>
```

### Properties
#### `Title`
The title of the emoji.

#### `Name`
The main alias of the emoji.

#### `FileName`
Use this property to provide the path to the image-file of the emoji.  
Don't forget to upload it using a `FilesInstruction`.

#### `HighResFilename`
This property is optional and points to a high-resolution picture of the emoji.

#### `Aliases`
Other aliases to access the emoji.

## BBCodes
You can provide new bb-codes using a `BBCodesInstruction`.  

### Interface
```ts
<%- include("./lib/Customization/BBCodes/IBBCodesInstruction.ts") %>
```

### Example
```ts
import { BBCode } from "../lib/Customization/BBCodes/BBCode";
import { BBCodeAttribute } from "../lib/Customization/BBCodes/BBCodeAttribute";
import { BBCodesInstruction } from "../lib/Customization/BBCodes/BBCodesInstruction";

const bbcodesInstruction: BBCodesInstruction = new BBCodesInstruction({
    BBCodes: [
        new BBCode({
            Name: "anc",
            DisplayName: {
                en: "Set anchor",
                de: "Anker setzen"
            },
            Icon: "fa-anchor",
            OpeningTag: "span",
            ClosingTag: "span",
            Attributes: [
                new BBCodeAttribute({
                    Required: true,
                    Code: "id=\"%s\"",
                    ValidationPattern: /^.+$/
                })
            ]
        }),
        new BBCode({
            Name: "ancurl",
            DisplayName: {
                en: "Link to anchor",
                de: "Auf Anker verweisen"
            },
            Icon: "fa-arrows-v",
            OpeningTag: "a",
            ClosingTag: "a",
            Attributes: [
                new BBCodeAttribute({
                    Required: true,
                    Code: "href=\"#%s\"",
                    ValidationPattern: /^.+$/
                })
            ]
        })
    ]
});

export = bbcodesInstruction;
```

### Properties
#### `FileName`
The name of the file to store in the package.  
If the `FileName` isn't specified "bbcodes.xml" will be used.

## `BBCode`
A BB-Code is a tag you can use when editing or adding contents on/to WoltLab Suite Core.

### Interface
```ts
<%- include("./lib/Customization/BBCodes/IBBCode.ts") %>
```

### Properties
#### `Name`
Use this property to specify the name of the bb-code.  
The BB-code will be accessible by using `[Name][/Name]`.

### `DisplayName`
The display-name of the button that is shown in the WYSIWYG-Editor.

### `Icon`
The name of a font-awesome icon that is shown.

**Examlpe:**
```ts
    Icon: "fa-apple"
```

### `ClassName`
The name of a PHP-class which is used for parsing the tag.  
This class should either implement `wcf\system\bbcode\IBBCode` or extend `wcf\system\bbcode\AbstractBBCode`.

**Example:**
```ts
    ClassName: "wcf\\system\\bbcode\\EmailBBCode"
```

### `OpeningTag`
The **content** of the opening HTML-tag.

**Examlpe:**
```ts
    OpeningTag: "span style=\"color: red\""
```

### `ClosingTag`
The **content** of the closing HTML-tag.

**Examlpe:**
```ts
    ClosingTag: "span"
```

### `IsInline`
This property allows you to specify whether the bb-code renders an inline HTML-element.  
Default is `false`.

### `IsBBCode`
A value indicating whether the content of the bbcode is treated like HTML- or BB-code.  
Default is `true`.

> ***Important Notice:***
> If you set this to `false` please keep in mind to provide a `ClassName` of a class which parses the BBCode in order to ***prevent Cross-Site-Scripting**

### `Attributes`
A set of `BBCodeAttribute`s.

## `BBCodeAttribute`
A BBCode-attribute allows users to provide further arguments to the bbcode in order to manipulate the displayed html-element.

### Interface
```ts
<%- include("./lib/Customization/BBCodes/IBBCodeAttribute.ts") %>
```

### Properties
#### `Required`
A value indicating whether the user **must** provide a value for this attribute.

#### `ValueByContent`
This property allows you to specify whether the value should be taken from the content of the BB-code.  
Please note that **this will remove the content of the bb-code**.

URL-Tags, for example, have this set to `true` which causes...
```
[url="https://google.com/"]https://google.com/[/url]
```
...to be rendered the same way like...
```
[url]https://google.com/[/url]
```

#### `Code`
The code which will be appended to the opening tag.  
`%s` will be replaced by the value of the attribute.

**Examlpe:**
```ts
    Code: `href="%s"`
```

#### `ValidationPattern`
A pattern that is used for validating the value of the attribute.

```ts
    ValidationPattern: /^d+$/
```