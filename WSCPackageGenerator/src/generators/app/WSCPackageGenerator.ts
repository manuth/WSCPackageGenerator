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
import { IWSCPackageSettings } from "./IWSCPackageSettings";
import { WSCPackageComponent } from "./WSCPackageComponent";
import { WSCPackageSetting } from "./WSCPackageSetting";

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
                default: () => this.config.get(WSCPackageSetting.Author) || this.user.git.name
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
                                {
                                    Source: "Files.ts.ejs",
                                    Destination: {
                                        Message: "Where do you want to store your file-mappings?",
                                        Default: "./components/Files.ts"
                                    }
                                }
                            ]
                        },
                        {
                            ID: WSCPackageComponent.CronJobs,
                            DisplayName: "Cron-Jobs",
                            FileMappings: [
                                {
                                    Source: "CronJobs.ts.ejs",
                                    Destination: {
                                        Message: "Where do you want to store your cron-jobs?",
                                        Default: "./components/CronJobs.ts"
                                    }
                                }
                            ]
                        },
                        {
                            ID: WSCPackageComponent.PHPScript,
                            DisplayName: "PHP-Scripts to Execute During the Installation",
                            FileMappings: [
                                {
                                    Source: "PHPScript.ts.ejs",
                                    Destination: {
                                        Message: "Where do you want to store the settings for the PHP-script?",
                                        Default: "./components/PHPScript.ts"
                                    }
                                }
                            ]
                        },
                        {
                            ID: WSCPackageComponent.SQLScript,
                            DisplayName: "SQL-Script to Execute During the Installation",
                            FileMappings: [
                                {
                                    Source: "SQLScript.ts.ejs",
                                    Destination: {
                                        Message: "Where do you want to store the settings for the SQL-script?",
                                        Default: "./components/SQLScript.ts"
                                    }
                                }
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
                                {
                                    Source: "Translations.ts.ejs",
                                    Destination: {
                                        Message: "Where do you want to store the translations?",
                                        Default: "./components/Translations.ts"
                                    }
                                }
                            ]
                        },
                        {
                            ID: WSCPackageComponent.ErrorMessages,
                            DisplayName: "Error-Messages",
                            FileMappings: [
                                {
                                    Source: "ErrorMessages.ts.ejs",
                                    Destination: {
                                        Message: "Where do you want to store the error-messages?",
                                        Default: "./components/ErrorMessages.ts"
                                    }
                                }
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
                                {
                                    Source: "Options.ts.ejs",
                                    Destination: {
                                        Message: "Where do you want to store the Admin Control-Panel Options?",
                                        Default: "./components/Options.ts"
                                    }
                                }
                            ]
                        },
                        {
                            ID: WSCPackageComponent.UserOptions,
                            DisplayName: "User-Options",
                            FileMappings: [
                                {
                                    Source: "UserOptions.ts.ejs",
                                    Destination: {
                                        Message: "Where do you want to store the User-Options?",
                                        Default: "./components/UserOptions.ts"
                                    }
                                }
                            ]
                        },
                        {
                            ID: WSCPackageComponent.GroupOptions,
                            DisplayName: "Group-Permission Options",
                            FileMappings: [
                                {
                                    Source: "GroupOptions.ts.ejs",
                                    Destination: {
                                        Message: "Where do you want to store the Group-Permission Options?",
                                        Default: "./components/GroupOptions.ts"
                                    }
                                }
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
                                    Source: null,
                                    Destination: {
                                        Message: "Where do you want to store themes?",
                                        Default: "./components/Themes.ts"
                                    }
                                }
                            ]
                        },
                        {
                            ID: WSCPackageComponent.Emojis,
                            DisplayName: "Emojis",
                            FileMappings: [
                                {
                                    Source: "Emojis.ts.ejs",
                                    Destination: {
                                        Message: "Where do you want to store the emojis?",
                                        Default: "./components/Emojis.ts"
                                    }
                                }
                            ]
                        },
                        {
                            ID: WSCPackageComponent.BBCodes,
                            DisplayName: "BB-Codes",
                            FileMappings: [
                                {
                                    Source: "BBCodes.ts.ejs",
                                    Destination: {
                                        Message: "Where do you want to store the BB-Codes?",
                                        Default: "./components/BBCodes.ts"
                                    }
                                }
                            ]
                        },
                        {
                            ID: WSCPackageComponent.Templates,
                            DisplayName: "Templates",
                            FileMappings: [
                                {
                                    Source: "Templates.ts.ejs",
                                    Destination: {
                                        Message: "Where do you want to store the templates?",
                                        Default: "./components/Templates.ts"
                                    }
                                }
                            ]
                        },
                        {
                            ID: WSCPackageComponent.ACPTemplates,
                            DisplayName: "Admin Control Panel-Templates",
                            FileMappings: [
                                {
                                    Source: "ACPTemplates.ts.ejs",
                                    Destination: {
                                        Message: "Where do you want to store the Admin Control Panel-Templates?",
                                        Default: "./components/ACPTemplates.ts"
                                    }
                                }
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
                                {
                                    Source: "EventListeners.ts.ejs",
                                    Destination: {
                                        Message: "Where do you want to store the Event-Listeners?",
                                        Default: "./components/EventListeners.ts"
                                    }
                                }
                            ]
                        },
                        {
                            ID: WSCPackageComponent.TemplateListeners,
                            DisplayName: "Template-Listeners",
                            FileMappings: [
                                {
                                    Source: "TemplateListeners.ts.ejs",
                                    Destination: {
                                        Message: "Where do you want to store the Template-Listeners?",
                                        Default: "./components/TemplateListeners.ts"
                                    }
                                }
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
            let relativePackage = Path.posix.normalize(Path.relative(Path.dirname(destination), process.cwd()).replace(new RegExp(escapeStringRegexp(Path.sep), "g"), "/"));

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
                    componentPaths: (
                        () =>
                        {
                            let result: { [key: string]: string } = {};

                            for (let component in this.Settings[GeneratorSetting.ComponentPaths])
                            {
                                result[component] = Path.join(
                                    Path.dirname(this.Settings[GeneratorSetting.ComponentPaths][component]),
                                    Path.parse(this.Settings[GeneratorSetting.ComponentPaths][component]).name);
                            }

                            return result;
                    })(),
                    Path,
                    process,
                    Settings: this.Settings
                });
        };

        this.fs.copy(this.templatePath("_.vscode"), this.destinationPath(".vscode"));
        this.fs.copy(Path.join(__dirname, "..", "..", "..", "..", "WSCPackage", "src"), this.destinationPath("lib"));
        this.fs.copy(this.templatePath("_.gitignore"), this.destinationPath(".gitignore"));
        CopyTemplate(this.templatePath("package.json.ejs"), this.destinationPath("package.json"));
        CopyTemplate(this.templatePath("Package.ts.ejs"), this.destinationPath("Package.ts"));
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