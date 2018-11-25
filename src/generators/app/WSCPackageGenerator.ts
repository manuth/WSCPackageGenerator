import chalk from "chalk";
import escapeStringRegexp = require("escape-string-regexp");
import * as FileSystem from "fs-extra";
import { Question } from "inquirer";
import kebabCase = require("lodash.kebabcase");
import * as Path from "path";
import { isNullOrUndefined } from "util";
import * as YoGenerator from "yeoman-generator";
import yosay = require("yosay");
import { Generator } from "../../Generator";
import { GeneratorSetting } from "../../GeneratorSetting";
import { IComponentProvider } from "../../IComponentProvider";
import { SourceFileMapping } from "../../SourceFileMapping";
import { ThemeDestination } from "../../ThemeDestination";
import { IWSCPackageSettings } from "./IWSCPackageSettings";
import { WSCPackageComponent } from "./WSCPackageComponent";
import { WSCPackageSetting } from "./WSCPackageSetting";

/**
 * Represents a tag of a file-mapping.
 */
enum Tag
{
    /**
     * Indicates a main-file.
     */
    Main = "main"
}

/**
 * Provides the functionality to generate a WSC-Package.
 */
export class WSCPackageGenerator extends Generator<IWSCPackageSettings>
{
    /**
     * Initializes a new instance of the `WSCPackageGenerator` class.
     *
     * @param args
     * A set of arguments.
     *
     * @param opts
     * A set of options.
     */
    constructor(args: string | string[], opts: {})
    {
        super(args, opts);
    }

    protected get TemplateRoot()
    {
        return "app";
    }

    protected get Questions(): Question<IWSCPackageSettings>[]
    {
        return [
            {
                type: "input",
                name: WSCPackageSetting.Destination,
                message: "What directory do you want to create the package to?",
                default: "./",
                filter: (value: string) => Path.resolve(process.cwd(), value)
            },
            {
                type: "input",
                name: WSCPackageSetting.DisplayName,
                message: "What's the display-name of your package?",
                default: (answers: IWSCPackageSettings) => Path.basename(answers[WSCPackageSetting.Destination]),
                validate: (input: string) => /.+/.test(input.trim()) ? true : "The name must not be empty!"
            },
            {
                type: "input",
                name: WSCPackageSetting.Name,
                message: "What's the name of your package?",
                default: (answers: IWSCPackageSettings) => kebabCase(answers[WSCPackageSetting.DisplayName]),
                validate: (input) =>
                {
                    return /[\w-]+/.test(input) ? true : "Please provide a name according to the npm naming-conventions.";
                }
            },
            {
                type: "input",
                name: WSCPackageSetting.Description,
                message: "Please enter a description:"
            },
            {
                type: "input",
                name: WSCPackageSetting.Author,
                message: "Please enter your name:",
                default: () => this.config.get(WSCPackageSetting.Author) || this.user.git.name()
            },
            {
                type: "input",
                name: WSCPackageSetting.HomePage,
                message: "Please enter your homepage:",
                default: () => this.config.get(WSCPackageSetting.HomePage) || ""
            },
            {
                type: "input",
                name: WSCPackageSetting.Identifier,
                message: "Please type an identifier for your package:",
                default: (answers: YoGenerator.Answers) =>
                {
                    let reversedURI: string = (answers["authorURL"] as string).replace(/(.*:\/\/)?(.*?)(\/.*)?/g, "$2").split(".").reverse().join(".");

                    if (reversedURI.length === 0)
                    {
                        reversedURI = "com.example";
                    }

                    return reversedURI + "." + (answers["name"] as string).toLowerCase();
                },
                validate: (input: string) => /.+/.test(input.trim()) ? true : "The name must not be empty!"
            }
        ];
    }

    protected get ProvidedComponents(): IComponentProvider<IWSCPackageSettings>
    {
        return {
            Question: "What should be included in your package?",
            Categories: [
                {
                    DisplayName: "General",
                    Components: [
                        {
                            ID: WSCPackageComponent.Files,
                            DisplayName: "Files to Upload",
                            FileMappings: [
                                new SourceFileMapping(
                                    this,
                                    {
                                        Tag: Tag.Main,
                                        Source: "./components/Files.ts.ejs",
                                        Destination: {
                                            Message: "Where do you want to store your file-mappings?",
                                            Default: "Files.ts"
                                        }
                                    })
                            ]
                        },
                        {
                            ID: WSCPackageComponent.CronJobs,
                            DisplayName: "Cron-Jobs",
                            FileMappings: [
                                new SourceFileMapping(
                                    this,
                                    {
                                        Tag: Tag.Main,
                                        Source: "./components/CronJobs.ts.ejs",
                                        Destination: {
                                            Message: "Where do you want to store your cron-jobs?",
                                            Default: "CronJobs.ts"
                                        }
                                    })
                            ]
                        },
                        {
                            ID: WSCPackageComponent.PHPScript,
                            DisplayName: "PHP-Scripts to Execute During the Installation",
                            FileMappings: [
                                new SourceFileMapping(
                                    this,
                                    {
                                        Tag: Tag.Main,
                                        Source: "./components/PHPScript.ts.ejs",
                                        Destination: {
                                            Message: "Where do you want to store the settings for the PHP-script?",
                                            Default: "PHPScript.ts"
                                        }
                                    })
                            ]
                        },
                        {
                            ID: WSCPackageComponent.SQLScript,
                            DisplayName: "SQL-Script to Execute During the Installation",
                            FileMappings: [
                                new SourceFileMapping(
                                    this,
                                    {
                                        Tag: Tag.Main,
                                        Source: "./components/SQLScript.ts.ejs",
                                        Destination: {
                                            Message: "Where do you want to store the settings for the SQL-script?",
                                            Default: "SQLScript.ts"
                                        }
                                    })
                            ]
                        }
                    ]
                },
                {
                    DisplayName: "Globalization",
                    Components: [
                        {
                            ID: WSCPackageComponent.Translations,
                            DisplayName: "Translations",
                            FileMappings: [
                                new SourceFileMapping(
                                    this,
                                    {
                                        Tag: Tag.Main,
                                        Source: "./components/Translations.ts.ejs",
                                        Destination: {
                                            Message: "Where do you want to store the translations?",
                                            Default: "Translations.ts"
                                        }
                                    })
                            ]
                        },
                        {
                            ID: WSCPackageComponent.ErrorMessages,
                            DisplayName: "Error-Messages",
                            FileMappings: [
                                new SourceFileMapping(
                                    this,
                                    {
                                        Tag: Tag.Main,
                                        Source: "./components/ErrorMessages.ts.ejs",
                                        Destination: {
                                            Message: "Where do you want to store the error-messages?",
                                            Default: "ErrorMessages.ts"
                                        }
                                    })
                            ]
                        }
                    ]
                },
                {
                    DisplayName: "Options",
                    Components: [
                        {
                            ID: WSCPackageComponent.ACPOptions,
                            DisplayName: "Admin Control-Panel Options",
                            FileMappings: [
                                new SourceFileMapping(
                                    this,
                                    {
                                        Tag: Tag.Main,
                                        Source: "./components/Options.ts.ejs",
                                        Destination: {
                                            Message: "Where do you want to store the Admin Control-Panel Options?",
                                            Default: "Options.ts"
                                        }
                                    })
                            ]
                        },
                        {
                            ID: WSCPackageComponent.UserOptions,
                            DisplayName: "User-Options",
                            FileMappings: [
                                new SourceFileMapping(
                                    this,
                                    {
                                        Tag: Tag.Main,
                                        Source: "./components/UserOptions.ts.ejs",
                                        Destination: {
                                            Message: "Where do you want to store the User-Options?",
                                            Default: "UserOptions.ts"
                                        }
                                    })
                            ]
                        },
                        {
                            ID: WSCPackageComponent.GroupOptions,
                            DisplayName: "Group-Permission Options",
                            FileMappings: [
                                new SourceFileMapping(
                                    this,
                                    {
                                        Tag: Tag.Main,
                                        Source: "./components/GroupOptions.ts.ejs",
                                        Destination: {
                                            Message: "Where do you want to store the Group-Permission Options?",
                                            Default: "GroupOptions.ts"
                                        }
                                    })
                            ]
                        }
                    ]
                },
                {
                    DisplayName: "Customization",
                    Components: [
                        {
                            ID: WSCPackageComponent.Themes,
                            DisplayName: "Themes",
                            FileMappings: [
                                {
                                    Tag: Tag.Main,
                                    Source: null,
                                    Destination: new ThemeDestination(
                                        this,
                                        {
                                            Message: "Where do you want to store themes?",
                                            Default: "Themes"
                                        }),
                                    Processor: async (source, destination) =>
                                    {
                                        await FileSystem.ensureDir(destination);
                                    }
                                }
                            ]
                        },
                        {
                            ID: WSCPackageComponent.Emojis,
                            DisplayName: "Emojis",
                            FileMappings: [
                                new SourceFileMapping(
                                    this,
                                    {
                                        Tag: Tag.Main,
                                        Source: "./components/Emojis.ts.ejs",
                                        Destination: {
                                            Message: "Where do you want to store the emojis?",
                                            Default: "Emojis.ts"
                                        }
                                    })
                            ]
                        },
                        {
                            ID: WSCPackageComponent.BBCodes,
                            DisplayName: "BB-Codes",
                            FileMappings: [
                                new SourceFileMapping(
                                    this,
                                    {
                                        Tag: Tag.Main,
                                        Source: "./components/BBCodes.ts.ejs",
                                        Destination: {
                                            Message: "Where do you want to store the BB-Codes?",
                                            Default: "BBCodes.ts"
                                        }
                                    })
                            ]
                        },
                        {
                            ID: WSCPackageComponent.Templates,
                            DisplayName: "Templates",
                            FileMappings: [
                                new SourceFileMapping(
                                    this,
                                    {
                                        Tag: Tag.Main,
                                        Source: "./components/Templates.ts.ejs",
                                        Destination: {
                                            Message: "Where do you want to store the templates?",
                                            Default: "Templates.ts"
                                        }
                                    })
                            ]
                        },
                        {
                            ID: WSCPackageComponent.ACPTemplates,
                            DisplayName: "Admin Control Panel-Templates",
                            FileMappings: [
                                new SourceFileMapping(
                                    this,
                                    {
                                        Tag: Tag.Main,
                                        Source: "./components/ACPTemplates.ts.ejs",
                                        Destination: {
                                            Message: "Where do you want to store the Admin Control Panel-Templates?",
                                            Default: "ACPTemplates.ts"
                                        }
                                    })
                            ]
                        }
                    ]
                },
                {
                    DisplayName: "Events",
                    Components: [
                        {
                            ID: WSCPackageComponent.EventListeners,
                            DisplayName: "Event-Listeners",
                            FileMappings: [
                                new SourceFileMapping(
                                    this,
                                    {
                                        Tag: Tag.Main,
                                        Source: "./components/EventListeners.ts.ejs",
                                        Destination: {
                                            Message: "Where do you want to store the Event-Listeners?",
                                            Default: "EventListeners.ts"
                                        }
                                    })
                            ]
                        },
                        {
                            ID: WSCPackageComponent.TemplateListeners,
                            DisplayName: "Template-Listeners",
                            FileMappings: [
                                new SourceFileMapping(
                                    this,
                                    {
                                        Tag: Tag.Main,
                                        Source: "./components/TemplateListeners.ts.ejs",
                                        Destination: {
                                            Message: "Where do you want to store the Template-Listeners?",
                                            Default: "TemplateListeners.ts"
                                        }
                                    })
                            ]
                        }
                    ]
                }
            ]
        };
    }

    public async prompting()
    {
        this.log(yosay(`Welcome to the ${chalk.whiteBright("WoltLab Suite Core Package")} generator!`));
        return super.prompting();
    }

    public async writing()
    {
        this.destinationRoot(Path.join(this.Settings[WSCPackageSetting.Destination]));

        let CopyTemplate = async (source: string, destination: string) =>
        {
            let relativePackage = Path.posix.normalize(Path.relative(Path.dirname(destination), this.sourcePath()).replace(new RegExp(escapeStringRegexp(Path.sep), "g"), "/"));

            if (!relativePackage.startsWith("."))
            {
                relativePackage = "./" + relativePackage;
            }

            if (!relativePackage.endsWith("/"))
            {
                relativePackage = relativePackage + "/";
            }

            this.fs.copyTpl(
                source,
                destination,
                {
                    destinationFile: destination,
                    packagePath: this.Settings[WSCPackageSetting.Destination],
                    relativePackage,
                    components: this.Settings[GeneratorSetting.Components],
                    componentPaths: await (
                        async () =>
                        {
                            let result: { [key: string]: string } = {};

                            for (let category of this.ProvidedComponents.Categories)
                            {
                                for (let component of category.Components)
                                {
                                    if (this.Settings[GeneratorSetting.Components].includes(component.ID))
                                    {
                                        let fileMappings = await this.ResolveValue(component.FileMappings, this.Settings);

                                        for (let i = 0; i < fileMappings.length; i++)
                                        {
                                            if (fileMappings[i].Tag === Tag.Main)
                                            {
                                                let path = this.Settings[GeneratorSetting.ComponentPaths][component.ID][i];
                                                path = Path.relative(Path.dirname(destination), path);
                                                path = Path.posix.normalize(path.replace(new RegExp(escapeStringRegexp(Path.sep), "g"), "/"));

                                                switch (component.ID)
                                                {
                                                    case WSCPackageComponent.Themes:
                                                        break;
                                                    default:
                                                        if (/\.(js|ts)$/.test(path))
                                                        {
                                                            path = Path.posix.join(Path.posix.dirname(path), Path.posix.parse(path).name);
                                                        }

                                                        if (!path.startsWith("."))
                                                        {
                                                            path = "./" + path;
                                                        }
                                                        break;
                                                }

                                                result[component.ID] = path;
                                            }
                                        }
                                    }
                                }
                            }

                            return result;
                        })(),
                    Path,
                    process,
                    Settings: this.Settings
                });
        };

        this.fs.copy(this.templatePath("_.vscode"), this.destinationPath(".vscode"));
        this.fs.copy(this.modulePath("WSCPackage", "src"), this.destinationPath(this.sourcePath()));
        this.fs.copy(this.templatePath("_.gitignore"), this.destinationPath(".gitignore"));
        CopyTemplate(this.templatePath("package.json.ejs"), this.destinationPath("package.json"));
        CopyTemplate(this.templatePath("Package.ts.ejs"), this.destinationPath(this.metaPath("Package.ts")));
        CopyTemplate(this.templatePath("README.md.ejs"), this.destinationPath("README.md"));
        this.fs.copy(this.templatePath("_tsconfig.json"), this.destinationPath("tsconfig.json"));
        this.fs.copy(this.templatePath("wsc-package-quickstart.md"), this.destinationPath("wsc-package-quickstart.md"));
        return super.writing();
    }

    /**
     * Installs the dependencies.
     */
    public async install()
    {
        this.installDependencies({ bower: false, npm: true });
    }

    /**
     * Show some helpful messages after finishing the installation-process.
     */
    public async end()
    {
        this.config.save();
        this.log();
        this.log("Your package \"" + this.Settings[WSCPackageSetting.DisplayName] + "\" has been created!");
        this.log();
        this.log("To start editing with Visual Studio Code, use following commands:");
        this.log();
        this.log("    cd \"" + this.Settings[WSCPackageSetting.Destination] + "\"");
        this.log("    code .");
        this.log();
        this.log("Open wsc-package-quickstart.md inside the new package for further instructions on how to build it.");
    }
}