import chalk from "chalk";
import * as FileSystem from "fs-extra";
import * as Path from "path";
import * as YoGenerator from "yeoman-generator";
import yosay = require("yosay");
import { Generator } from "../Generator";

/**
 * Provides the functionality to generate a WSC-Package.
 */
class WSCPackageGenerator extends Generator
{
    /**
     * The options provided by the user.
     */
    private settings: { [key: string]: any };

    /**
     * The path to save the result to.
     */
    private destination: string;

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

    protected get TemplateRoot(): string
    {
        return "app";
    }

    /**
     * Collects all information about the package that is to be created.
     */
    public async prompting(): Promise<void>
    {
        this.log(yosay(`Welcome to the ${chalk.whiteBright("WoltLab Suite Core Package")} generator!`));

        let prompts: YoGenerator.Questions = [
            {
                type: "input",
                name: "destination",
                message: "What directory do you want to create the package to?",
                default: "./",
                filter: (value: string): string =>
                {
                    this.destination = Path.resolve(process.cwd(), value);
                    return value;
                }
            },
            {
                type: "input",
                name: "name",
                message: "What's the name of your package?",
                default: (answers: YoGenerator.Answers): string =>
                {
                    return Path.basename(this.destination);
                },
                validate: this.ForceInput
            },
            {
                type: "input",
                name: "displayName",
                message: "What's the display-name of your package?",
                default: (answers: YoGenerator.Answers): string =>
                {
                    return answers.name;
                },
                validate: this.ForceInput
            },
            {
                type: "input",
                name: "description",
                message: "Please enter a description:"
            },
            {
                type: "input",
                name: "author",
                message: "Please enter your name:",
                default: this.user.git.name,
                store: true
            },
            {
                type: "input",
                name: "authorURL",
                message: "Please enter your homepage:",
                store: true
            },
            {
                type: "input",
                name: "identifier",
                message: "Please type an identifier for your package:",
                default: (answers: YoGenerator.Answers): string =>
                {
                    let reversedURI: string = (answers.authorURL as string).replace(/(.*:\/\/)?(.*?)(\/.*)?/g, "$2").split(".").reverse().join(".");

                    if (reversedURI.length === 0)
                    {
                        reversedURI = "com.example";
                    }

                    return reversedURI + "." + (answers.name as string).toLowerCase();
                },
                validate: this.ForceInput
            },
            {
                type: "checkbox",
                name: "components",
                message: "What components do you want to provide?",
                choices: [
                    {
                        type: "separator",
                        line: "General"
                    },
                    {
                        name: "Files to Upload",
                        value: "files"
                    },
                    {
                        name: "Cron Jobs",
                        value: "cronJobs"
                    },
                    {
                        name: "PHP-Script to Execute during Installation",
                        value: "php"
                    },
                    {
                        name: "SQL-Script to Execute during Installation",
                        value: "sql"
                    },
                    {
                        type: "separator",
                        line: "Globalization"
                    },
                    {
                        name: "Translations",
                        value: "translations"
                    },
                    {
                        name: "Error-Messages",
                        value: "errors"
                    },
                    {
                        type: "separator",
                        line: "Options"
                    },
                    {
                        name: "Control-Panel Options",
                        value: "acpOptions"
                    },
                    {
                        name: "User-Options",
                        value: "userOptions"
                    },
                    {
                        name: "Group-Permission Options",
                        value: "groupOptions"
                    },
                    {
                        type: "separator",
                        line: "Customization"
                    },
                    {
                        name: "Themes",
                        value: "themes"
                    },
                    {
                        name: "Emojis",
                        value: "emojis"
                    },
                    {
                        name: "BB-Codes",
                        value: "bbCodes"
                    },
                    {
                        name: "Templates",
                        value: "templates"
                    },
                    {
                        name: "Templates for the Control Panel",
                        value: "acpTemplates"
                    },
                    {
                        type: "separator",
                        line: "Events"
                    },
                    {
                        name: "Event-Listeners",
                        value: "eventListeners"
                    },
                    {
                        name: "Template-Listeners",
                        value: "templateListeners"
                    }
                ]
            },
            {
                type: "input",
                name: "componentPaths.files",
                message: "Where do you want to store your file-mappings?",
                default: "Files",
                when: (answers: YoGenerator.Answers): boolean =>
                {
                    return (answers.components as string[]).includes("files");
                }
            },
            {
                type: "input",
                name: "componentPaths.cronJobs",
                message: "Where do you want to store your cron-jobs?",
                default: "CronJobs",
                when: (answers: YoGenerator.Answers): boolean =>
                {
                    return (answers.components as string[]).includes("cronJobs");
                }
            },
            {
                type: "input",
                name: "componentPaths.php",
                message: "Where do you want to store the settings for your php-script?",
                default: "PHPScript",
                when: (answers: YoGenerator.Answers): boolean =>
                {
                    return (answers.components as string[]).includes("php");
                }
            },
            {
                type: "input",
                name: "componentPaths.sql",
                message: "Where do you want to store the settings for your sql-script?",
                default: "SQLScript",
                when: (answers: YoGenerator.Answers): boolean =>
                {
                    return (answers.components as string[]).includes("sql");
                }
            },
            {
                type: "input",
                name: "componentPaths.translations",
                message: "Where do you want to store your translations?",
                default: "Translations",
                when: (answers: YoGenerator.Answers): boolean =>
                {
                    return (answers.components as string[]).includes("translations");
                }
            },
            {
                type: "input",
                name: "componentPaths.errors",
                message: "Where do you want to store your error-messages?",
                default: "ErrorMessages",
                when: (answers: YoGenerator.Answers): boolean =>
                {
                    return (answers.components as string[]).includes("errors");
                }
            },
            {
                type: "input",
                name: "componentPaths.acpOptions",
                message: "Where do you want to store the Contron Panel options?",
                default: "Options",
                when: (answers: YoGenerator.Answers): boolean =>
                {
                    return (answers.components as string[]).includes("acpOptions");
                }
            },
            {
                type: "input",
                name: "componentPaths.userOptions",
                message: "Where do you want to store the User-Options?",
                default: "UserOptions",
                when: (answers: YoGenerator.Answers): boolean =>
                {
                    return (answers.components as string[]).includes("userOptions");
                }
            },
            {
                type: "input",
                name: "componentPaths.groupOptions",
                message: "Where do you want to store the Group-Permission Options?",
                default: "GroupOptions",
                when: (answers: YoGenerator.Answers): boolean =>
                {
                    return (answers.components as string[]).includes("groupOptions");
                }
            },
            {
                type: "input",
                name: "componentPaths.themes",
                message: "Where do you want to store themes?",
                default: "themes",
                when: (answers: YoGenerator.Answers): boolean =>
                {
                    return (answers.components as string[]).includes("themes");
                }
            },
            {
                type: "input",
                name: "componentPaths.emojis",
                default: "Emojis",
                message: "Where do you want to store emojis?",
                when: (answers: YoGenerator.Answers): boolean =>
                {
                    return (answers.components as string[]).indexOf("emojis") >= 0;
                }
            },
            {
                type: "input",
                name: "componentPaths.bbCodes",
                default: "BBCodes",
                message: "Where do you want to store BB-Codes?",
                when: (answers: YoGenerator.Answers): boolean =>
                {
                    return (answers.components as string[]).indexOf("bbCodes") >= 0;
                }
            },
            {
                type: "input",
                name: "componentPaths.templates",
                message: "Where do you want to store templates?",
                default: "Templates",
                when: (answers: YoGenerator.Answers): boolean =>
                {
                    return (answers.components as string[]).indexOf("templates") >= 0;
                }
            },
            {
                type: "input",
                name: "componentPaths.acpTemplates",
                message: "Where do you want to store ACP-templates?",
                default: "ACPTemplates",
                when: (answers: YoGenerator.Answers): boolean =>
                {
                    return (answers.components as string[]).indexOf("acpTemplates") >= 0;
                },
                validate: this.ForceSeparateFolder
            },
            {
                type: "input",
                name: "componentPaths.eventListeners",
                message: "Where do you want to store your event-listeners?",
                default: "EventListeners",
                when: (answers: YoGenerator.Answers): boolean =>
                {
                    return (answers.components as string[]).includes("eventListeners");
                }
            },
            {
                type: "input",
                name: "componentPaths.templateListeners",
                message: "Where do you want to store template-listeners?",
                default: "TemplateListeners",
                when: (answers: YoGenerator.Answers): boolean =>
                {
                    return (answers.components as string[]).indexOf("templateListeners") >= 0;
                },
            }
        ];

        return this.prompt(prompts).then((answers: YoGenerator.Answers) =>
        {
            this.settings = answers;
        });
    }

    /**
     * Writes the templates
     */
    public async writing(): Promise<void>
    {
        this.destinationRoot(this.destination);

        let componentsPath: (value: string) => string = (value: string): string =>
        {
            return this.destinationPath("components", value);
        };

        let componentTemplates: { [key: string]: string } = {
            files: "Files.ts",
            cronJobs: "CronJobs.ts",
            translations: "Translations.ts",
            errors: "ErrorMessages.ts",
            acpOptions: "Options.ts",
            emojis: "Emojis.ts",
            bbCodes: "BBCodes.ts",
            templates: "Templates.ts",
            acpTemplates: "ACPTemplates.ts",
            eventListeners: "EventListeners.ts",
            templateListeners: "TemplateListeners.ts"
        };

        this.fs.copy(this.templatePath("_.vscode"), this.destinationPath(".vscode"));
        this.fs.copy(Path.join(__dirname, "..", "..", "..", "packageLib", "src"), this.destinationPath("lib"));
        this.fs.copy(this.templatePath("_.gitignore"), this.destinationPath(".gitignore"));
        this.fs.copyTpl(this.templatePath("package.json.ejs"), this.destinationPath("package.json"), this.settings);
        this.fs.copyTpl(this.templatePath("Package.ts.ejs"), this.destinationPath("Package.ts"), this.settings);
        this.fs.copyTpl(this.templatePath("README.md.ejs"), this.destinationPath("README.md"), this.settings);
        this.fs.copy(this.templatePath("_tsconfig.json"), this.destinationPath("tsconfig.json"));
        this.fs.copyTpl(this.templatePath("wsc-package-quickstart.md.ejs"), this.destinationPath("wsc-package-quickstart.md"), {});

        for (let component of this.settings.components)
        {
            switch (component)
            {
                case "theme":
                    FileSystem.mkdirpSync(this.destinationPath(this.settings.componentPaths[component]));
                    break;
                default:
                    if (component in componentTemplates)
                    {
                        this.fs.copyTpl(
                            this.templatePath("components", componentTemplates[component]),
                            componentsPath(this.settings.componentPaths[component] + ".ts"),
                            this.settings);
                    }
                    break;
            }
        }
    }

    /**
     * Installs the dependencies.
     */
    public async install(): Promise<void>
    {
        if (this.settings.components.includes("theme"))
        {
            this.config.set("themesPath", this.settings.componentPaths.theme);
        }

        this.config.save();

        this.installDependencies({ bower: false, npm: true });
    }

    /**
     * Show some helpful messages after finishing the installation-process.
     */
    public async end(): Promise<void>
    {
        this.log();
        this.log("Your package \"" + this.settings.name + "\" has been created!");
        this.log();
        this.log("To start editing with Visual Studio Code, use following commands:");
        this.log();
        this.log("    cd \"" + this.settings.destination + "\"");
        this.log("    code .");
        this.log();
        this.log("Open wsc-package-quickstart.md inside the new package for further instructions on how to build it.");
    }
}

export = WSCPackageGenerator;