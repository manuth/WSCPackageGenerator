import chalk from "chalk";
import { Answers, IComponentProvider, Question } from "extended-yo-generator";
import * as FileSystem from "fs-extra";
import kebabCase = require("lodash.kebabcase");
import * as Path from "path";
import yosay = require("yosay");
import { AssetQuestion } from "../../AssetQuestion";
import { Generator } from "../../Generator";
import { SourceComponent } from "../../SourceComponent";
import { SourceFileMapping } from "../../SourceFileMapping";
import { WoltLabComponent } from "../../WoltLabComponent";
import { ApplicationQuestions } from "./ApplicationQuestion";
import { IWSCPackageSettings } from "./IWSCPackageSettings";
import { PackageContext } from "./PackageContext";
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
                default: () => this.config.get(WSCPackageSetting.Author) || this.user.git.name()
            },
            {
                type: "input",
                name: WSCPackageSetting.HomePage,
                message: "Please enter your homepage:",
                default: () => this.config.get(WSCPackageSetting.HomePage)
            },
            {
                type: "input",
                name: WSCPackageSetting.Identifier,
                message: "Please type an identifier for your package:",
                default: (answers: Answers) =>
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
                        new WoltLabComponent(
                            this,
                            {
                                ID: WSCPackageComponent.Files,
                                DisplayName: "Files to Upload",
                                FileMapping: {
                                    Source: "./components/Files.ts.ejs",
                                    Context: (settings) =>
                                    {
                                        return {
                                            Application: settings[WSCPackageSetting.FilesApp],
                                            FilesDirectory: settings[WSCPackageSetting.FilesDirectory]
                                        };
                                    }
                                },
                                Question: {
                                    message: "Where do you want to store your file-mappings?",
                                    default: "Files.ts"
                                },
                                AdditionalFiles: [
                                    {
                                        Source: null,
                                        Destination: (settings) => settings[WSCPackageSetting.FilesDirectory],
                                        Process: async (source, destination) =>
                                        {
                                            await FileSystem.ensureDir(destination);
                                        }
                                    }
                                ],
                                AdditionalQuestions: [
                                    new AssetQuestion(
                                        this,
                                        {
                                            name: WSCPackageSetting.FilesDirectory,
                                            message: "Where do you want to store the files?",
                                            default: "files"
                                        }),
                                    ...new ApplicationQuestions(
                                        WSCPackageSetting.FilesApp,
                                        "What application do you want to upload the files to?")
                                ]
                            }),
                        new WoltLabComponent(
                            this,
                            {
                                ID: WSCPackageComponent.CronJobs,
                                DisplayName: "Cron-Jobs",
                                FileMapping: {
                                    Source: "./components/CronJobs.ts.ejs"
                                },
                                Question: {
                                    message: "Where do you want to store your cron-jobs?",
                                    default: "CronJobs.ts"
                                }
                            }),
                        new WoltLabComponent(
                            this,
                            {
                                ID: WSCPackageComponent.PHPScript,
                                DisplayName: "PHP-Scripts to Execute During the Installation",
                                FileMapping: {
                                    Source: "./components/PHPScript.ts.ejs",
                                    Context: (settings) =>
                                    {
                                        return {
                                            Application: settings[WSCPackageSetting.PHPScriptApp],
                                            PHPFile: settings[WSCPackageSetting.PHPScriptFile]
                                        };
                                    }
                                },
                                Question: {
                                    message: "Where do you want to store the settings for the PHP-script?",
                                    default: "PHPScript.ts"
                                },
                                AdditionalFiles: [
                                    {
                                        Source: null,
                                        Destination: (settings) => settings[WSCPackageSetting.PHPScriptFile]
                                    }
                                ],
                                AdditionalQuestions: [
                                    ...new ApplicationQuestions(
                                        WSCPackageSetting.PHPScriptApp,
                                        "What application's directory do you want to load the php-script from?"),
                                    {
                                        name: WSCPackageSetting.PHPScriptFile,
                                        message: "Where do you want to load the file from?",
                                        transformer: (input) => input || ""
                                    }
                                ]
                            }),
                        new WoltLabComponent(
                            this,
                            {
                                ID: WSCPackageComponent.SQLScript,
                                DisplayName: "SQL-Script to Execute During the Installation",
                                FileMapping: {
                                    Source: "./components/SQLScript.ts.ejs",
                                    Context: (settings) =>
                                    {
                                        return {
                                            SQLFile: settings[WSCPackageSetting.SQLFile]
                                        };
                                    }
                                },
                                Question: {
                                    message: "Where do you want to store the settings for the SQL-script?",
                                    default: "SQLScript.ts"
                                },
                                AdditionalFiles: [
                                    {
                                        Source: null,
                                        Destination: (settings) => settings[WSCPackageSetting.SQLFile],
                                        Process: async (source, destination) =>
                                        {
                                            await FileSystem.ensureFile(destination);
                                        }
                                    }
                                ],
                                AdditionalQuestions: [
                                    new AssetQuestion(
                                        this,
                                        {
                                            name: WSCPackageSetting.SQLFile,
                                            message: "Where do you want to store the SQL-file?",
                                            default: "install.sql"
                                        })
                                ]
                            })
                    ]
                },
                {
                    DisplayName: "Globalization",
                    Components: [
                        new WoltLabComponent(
                            this,
                            {
                                ID: WSCPackageComponent.Translations,
                                DisplayName: "Translations",
                                FileMapping: {
                                    Source: "./components/Translations.ts.ejs"
                                },
                                Question: {
                                    message: "Where do you want to store the translations?",
                                    default: "Translations.ts"
                                }
                            }),
                        new WoltLabComponent(
                            this,
                            {
                                ID: WSCPackageComponent.ErrorMessages,
                                DisplayName: "Error-Messages",
                                FileMapping: {
                                    Source: "./components/ErrorMessages.ts.ejs"
                                },
                                Question: {
                                    message: "Where do you want to store the error-messages?",
                                    default: "ErrorMessages.ts"
                                }
                            })
                    ]
                },
                {
                    DisplayName: "Options",
                    Components: [
                        new WoltLabComponent(
                            this,
                            {
                                ID: WSCPackageComponent.ACPOptions,
                                DisplayName: "Admin Control-Panel Options",
                                FileMapping: {
                                    Source: "./components/Options.ts.ejs"
                                },
                                Question: {
                                    message: "Where do you want to store the Admin Control-Panel Options?",
                                    default: "Options.ts"
                                }
                            }),
                        new WoltLabComponent(
                            this,
                            {
                                ID: WSCPackageComponent.UserOptions,
                                DisplayName: "User-Options",
                                FileMapping: {
                                    Source: "./components/UserOptions.ts.ejs"
                                },
                                Question: {
                                    message: "Where do you want to store the User-Options?",
                                    default: "UserOptions.ts"
                                }
                            }),
                        new WoltLabComponent(
                            this,
                            {
                                ID: WSCPackageComponent.GroupOptions,
                                DisplayName: "Group-Permission Options",
                                FileMapping: {
                                    Source: "./components/GroupOptions.ts.ejs"
                                },
                                Question: {
                                    message: "Where do you want to store the Group-Permission Options?",
                                    default: "GroupOptions.ts"
                                }
                            })
                    ]
                },
                {
                    DisplayName: "Customization",
                    Components: [
                        new SourceComponent(
                            this,
                            {
                                ID: WSCPackageComponent.Themes,
                                DisplayName: "Themes",
                                FileMapping: {
                                    Source: null,
                                    Process: async (source, destination) =>
                                    {
                                        await FileSystem.ensureDir(destination);
                                    }
                                },
                                Question: {
                                    message: "Where do you want to store themes?",
                                    default: "Themes"
                                }
                            }),
                        new WoltLabComponent(
                            this,
                            {
                                ID: WSCPackageComponent.Emojis,
                                DisplayName: "Emojis",
                                FileMapping: {
                                    Source: "./components/Emojis.ts.ejs"
                                },
                                Question: {
                                    message: "Where do you want to store the emojis?",
                                    default: "Emojis.ts"
                                }
                            }),
                        new WoltLabComponent(
                            this,
                            {
                                ID: WSCPackageComponent.BBCodes,
                                DisplayName: "BB-Codes",
                                FileMapping: {
                                    Source: "./components/BBCodes.ts.ejs"
                                },
                                Question: {
                                    message: "Where do you want to store the BB-Codes?",
                                    default: "BBCodes.ts"
                                }
                            }),
                        new WoltLabComponent(
                            this,
                            {
                                ID: WSCPackageComponent.Templates,
                                DisplayName: "Templates",
                                FileMapping: {
                                    Source: "./components/Templates.ts.ejs",
                                    Context: (settings) =>
                                    {
                                        return {
                                            Application: settings[WSCPackageSetting.TemplateApp],
                                            TemplateRoot: settings[WSCPackageSetting.TemplateRoot]
                                        };
                                    }
                                },
                                Question: {
                                    message: "Where do you want to store the template-settings?",
                                    default: "Templates.ts"
                                },
                                AdditionalFiles: [
                                    {
                                        Source: null,
                                        Destination: (settings) => settings[WSCPackageSetting.TemplateRoot],
                                        Process: async (source, destination) =>
                                        {
                                            await FileSystem.ensureDir(destination);
                                        }
                                    }
                                ],
                                AdditionalQuestions: [
                                    new AssetQuestion(
                                        this,
                                        {
                                            name: WSCPackageSetting.TemplateRoot,
                                            message: "Where do you want to store the templates?",
                                            default: "templates"
                                        }),
                                    ...new ApplicationQuestions(
                                        WSCPackageSetting.TemplateApp,
                                        "What's the application you want to provide templates for?")
                                ]
                            }),
                        new WoltLabComponent(
                            this,
                            {
                                ID: WSCPackageComponent.ACPTemplates,
                                DisplayName: "Admin Control Panel-Templates",
                                FileMapping: {
                                    Source: "./components/ACPTemplates.ts.ejs",
                                    Context: (settings) =>
                                    {
                                        return {
                                            Application: settings[WSCPackageSetting.ACPTemplateApp],
                                            TemplateRoot: settings[WSCPackageSetting.ACPTemplateRoot]
                                        };
                                    }
                                },
                                Question: {
                                    message: "Where do you want to store the settings for the Admin Control Panel-Templates?",
                                    default: "ACPTemplates.ts"
                                },
                                AdditionalFiles: [
                                    {
                                        Source: null,
                                        Destination: (settings) => settings[WSCPackageSetting.ACPTemplateRoot],
                                        Process: async (source, destination) =>
                                        {
                                            await FileSystem.ensureDir(destination);
                                        }
                                    }
                                ],
                                AdditionalQuestions: [
                                    new AssetQuestion(
                                        this,
                                        {
                                            name: WSCPackageSetting.ACPTemplateRoot,
                                            message: "Where do you want to store the Admin Control Panel-Templates?",
                                            default: "acpTemplates"
                                        }),
                                    ...new ApplicationQuestions(
                                        WSCPackageSetting.ACPTemplateApp,
                                        "What's the application you want to provide Admin Control Panel-Templates for?")
                                ]
                            })
                    ]
                },
                {
                    DisplayName: "Events",
                    Components: [
                        new WoltLabComponent(
                            this,
                            {
                                ID: WSCPackageComponent.EventListeners,
                                DisplayName: "Event-Listeners",
                                FileMapping: {
                                    Source: "./components/EventListeners.ts.ejs"
                                },
                                Question: {
                                    message: "Where do you want to store the Event-Listeners?",
                                    default: "EventListeners.ts"
                                }
                            }),
                        new WoltLabComponent(
                            this,
                            {
                                ID: WSCPackageComponent.TemplateListeners,
                                DisplayName: "Template-Listeners",
                                FileMapping: {
                                    Source: "./components/TemplateListeners.ts.ejs"
                                },
                                Question: {
                                    message: "Where do you want to store the Template-Listeners?",
                                    default: "TemplateListeners.ts"
                                }
                            })
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

        this.fs.copyTpl(
            this.templatePath("package.json.ejs"),
            this.destinationPath("package.json"),
            {
                Name: this.Settings[WSCPackageSetting.Name],
                Description: this.Settings[WSCPackageSetting.Description] || "",
                Author: this.Settings[WSCPackageSetting.Author],
                HomePage: this.Settings[WSCPackageSetting.HomePage]
            });

        this.ProcessFile(
            new SourceFileMapping(
                this,
                {
                    Source: this.templatePath("Package.ts.ejs"),
                    Context: () =>
                    {
                        let context = new PackageContext(this);

                        return {
                            Identifier: context.Identifier,
                            Name: context.Name,
                            DisplayName: context.DisplayName,
                            Author: context.Author,
                            HomePage: context.HomePage,
                            CreationDate: context.CreationDate,
                            Description: context.Description || "",
                            Instructions: context.Instructions || []
                        };
                    },
                    Destination: this.destinationPath(this.metaPath("Package.ts"))
                }));

        this.fs.copy(this.templatePath("_.vscode"), this.destinationPath(".vscode"));
        this.fs.copy(this.modulePath("WSCPackage", "src"), this.destinationPath(this.sourcePath()));
        this.fs.copy(this.templatePath(".gitignore.ejs"), this.destinationPath(".gitignore"));
        this.fs.copy(this.templatePath(".npmignore.ejs"), this.destinationPath(".npmignore"));
        this.fs.copyTpl(this.templatePath("README.md"), this.destinationPath("README.md"), { Settings: this.Settings });
        this.fs.copy(this.templatePath("tsconfig.template.json"), this.destinationPath("tsconfig.json"));
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