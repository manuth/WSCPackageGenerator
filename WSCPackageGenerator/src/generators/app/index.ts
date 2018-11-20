import chalk from "chalk";
import escapeStringRegexp = require("escape-string-regexp");
import * as FileSystem from "fs-extra";
import * as Path from "path";
import { isNullOrUndefined } from "util";
import * as YoGenerator from "yeoman-generator";
import yosay = require("yosay");
import { Generator } from "../Generator";
import { IComponent } from "../IComponent";
import { IComponentCategory } from "../IComponentCategory";

/**
 * Provides the functionality to generate a WSC-Package.
 */
class WSCPackageGenerator extends Generator
{
    /**
     * The options provided by the user.
     */
    private settings: YoGenerator.Answers;

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
     * Gets the path to load component-templates from and to save component-files to.
     */
    protected get ComponentTemplatePath(): string
    {
        return "components";
    }

    /**
     * Gets the name of the setting which contains the path to the component-directory.
     */
    protected get ComponentRootSetting(): string
    {
        return "componentRoot";
    }

    protected get Components(): IComponentCategory[]
    {
        return [
            {
                DisplayName: "General",
                Components: [
                    {
                        ID: "files",
                        DisplayName: "Files to Upload",
                        Message: "Where do you want to store your file-mappings?",
                        TemplateFile: "Files.ts.ejs",
                        DefaultFileName: "Files"
                    },
                    {
                        ID: "cronJobs",
                        DisplayName: "Cron Jobs",
                        Message: "Where do you want to store your cron-jobs?",
                        TemplateFile: "CronJobs.ts.ejs",
                        DefaultFileName: "CronJobs"
                    },
                    {
                        ID: "php",
                        DisplayName: "PHP-Script to Execute during Installation",
                        Message: "Where do you want to store the settings for your php-script?",
                        TemplateFile: "PHPScript.ts.ejs",
                        DefaultFileName: "PHPScript"
                    },
                    {
                        ID: "sql",
                        DisplayName: "SQL-Script to Execute during Installation",
                        Message: "Where do you want to store the settings for your sql-script?",
                        TemplateFile: "SQLScript.ts.ejs",
                        DefaultFileName: "SQLScript"
                    }
                ]
            },
            {
                DisplayName: "Globalization",
                Components: [
                    {
                        ID: "translations",
                        DisplayName: "Translations",
                        Message: "Where do you want to store your translations?",
                        TemplateFile: "Translations.ts.ejs",
                        DefaultFileName: "Translations"
                    },
                    {
                        ID: "errors",
                        DisplayName: "Error-Messages",
                        Message: "Where do you want to store your error-messages?",
                        TemplateFile: "ErrorMessages.ts.ejs",
                        DefaultFileName: "ErrorMessages"
                    }
                ]
            },
            {
                DisplayName: "Options",
                Components: [
                    {
                        ID: "acpOptions",
                        DisplayName: "Control-Panel Options",
                        Message: "Where do you want to store the Contron Panel options?",
                        TemplateFile: "Options.ts.ejs",
                        DefaultFileName: "Options"
                    },
                    {
                        ID: "userOptions",
                        DisplayName: "User-Options",
                        Message: "Where do you want to store the User-Options?",
                        TemplateFile: "UserOptions.ts.ejs",
                        DefaultFileName: "UserOptions"
                    },
                    {
                        ID: "groupOptions",
                        DisplayName: "Group-Permission Options",
                        Message: "Where do you want to store the Group-Permission Options?",
                        TemplateFile: "GroupOptions.ts.ejs",
                        DefaultFileName: "GroupOptions"
                    }
                ]
            },
            {
                DisplayName: "Customization",
                Components: [
                    {
                        ID: "themes",
                        DisplayName: "Themes",
                        Message: "Where do you want to store themes?",
                        DefaultFileName: "Themes"
                    },
                    {
                        ID: "emojis",
                        DisplayName: "Emojis",
                        Message: "Where do you want to store emojis?",
                        TemplateFile: "Emojis.ts.ejs",
                        DefaultFileName: "Emojis"
                    },
                    {
                        ID: "bbCodes",
                        DisplayName: "BB-Codes",
                        Message: "Where do you want to store BB-Codes?",
                        TemplateFile: "BBCodes.ts.ejs",
                        DefaultFileName: "BBCodes"
                    },
                    {
                        ID: "templates",
                        DisplayName: "Templates",
                        Message: "Where do you want to store templates?",
                        TemplateFile: "Templates.ts.ejs",
                        DefaultFileName: "Templates"
                    },
                    {
                        ID: "acpTemplates",
                        DisplayName: "Templates for the Control Panel",
                        Message: "Where do you want to store ACP-templates?",
                        TemplateFile: "ACPTemplates.ts.ejs",
                        DefaultFileName: "ACPTemplates"
                    }
                ]
            },
            {
                DisplayName: "Events",
                Components: [
                    {
                        ID: "eventListeners",
                        DisplayName: "Event-Listeners",
                        Message: "Where do you want to store your event-listeners?",
                        TemplateFile: "EventListeners.ts.ejs",
                        DefaultFileName: "EventListeners"
                    },
                    {
                        ID: "templateListeners",
                        DisplayName: "Template-Listeners",
                        Message: "Where do you want to store template-listeners?",
                        TemplateFile: "TemplateListeners.ts.ejs",
                        DefaultFileName: "TemplateListeners"
                    }
                ]
            }
        ];
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
                    return answers["destination"];
                },
                validate: this.ForceInput
            },
            {
                type: "input",
                name: "displayName",
                message: "What's the display-name of your package?",
                default: (answers: YoGenerator.Answers): string =>
                {
                    return answers["name"];
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
                default: "",
                store: true
            },
            {
                type: "input",
                name: "identifier",
                message: "Please type an identifier for your package:",
                default: (answers: YoGenerator.Answers): string =>
                {
                    let reversedURI: string = (answers["authorURL"] as string).replace(/(.*:\/\/)?(.*?)(\/.*)?/g, "$2").split(".").reverse().join(".");

                    if (reversedURI.length === 0)
                    {
                        reversedURI = "com.example";
                    }

                    return reversedURI + "." + (answers["name"] as string).toLowerCase();
                },
                validate: this.ForceInput
            },
            {
                type: "input",
                name: this.ComponentRootSetting,
                message: "Where do you want to store the components?",
                default: "components",
                validate: this.ForceInput
            },
            ...this.ComponentQuestions
        ];

        this.settings = await this.prompt(prompts);
    }

    /**
     * Writes the templates
     */
    public async writing(): Promise<void>
    {
        this.destinationRoot(this.destination);

        let componentsPath: (value: string) => string = (value: string): string =>
        {
            return this.destinationPath(this.settings[this.ComponentRootSetting], value);
        };

        let CopyTemplate: (source: string, destination: string) => Promise<void> = async (source: string, destination: string): Promise<void> =>
        {
            let relativePackage: string = Path.posix.normalize(Path.relative(Path.dirname(destination), process.cwd()).replace(new RegExp(escapeStringRegexp(Path.sep), "g"), "/"));

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
                    packagePath: this.destination,
                    relativePackage,
                    componentDir: this.ComponentTemplatePath,
                    components: this.settings[this.ComponentSetting],
                    componentPaths: this.settings[this.ComponentPathSetting],
                    Path,
                    process,
                    Settings: this.settings
                });
        };

        let CopyComponent: (component: IComponent, destination: string) => Promise<void> = async (component: IComponent, destination: string): Promise<void> =>
        {
            await CopyTemplate(this.templatePath(this.ComponentTemplatePath, component.TemplateFile), componentsPath(destination));
        };

        this.fs.copy(this.templatePath("_.vscode"), this.destinationPath(".vscode"));
        this.fs.copy(Path.join(__dirname, "..", "..", "..", "..", "WSCPackage", "src"), this.destinationPath("lib"));
        this.fs.copy(this.templatePath("_.gitignore"), this.destinationPath(".gitignore"));
        CopyTemplate(this.templatePath("package.json.ejs"), this.destinationPath("package.json"));
        CopyTemplate(this.templatePath("Package.ts.ejs"), this.destinationPath("Package.ts"));
        CopyTemplate(this.templatePath("README.md.ejs"), this.destinationPath("README.md"));
        this.fs.copy(this.templatePath("_tsconfig.json"), this.destinationPath("tsconfig.json"));
        this.fs.copy(this.templatePath("wsc-package-quickstart.md"), this.destinationPath("wsc-package-quickstart.md"));

        for (let category of this.Components)
        {
            for (let component of category.Components)
            {
                if ((this.settings[this.ComponentSetting] as string[]).includes(component.ID))
                {
                    let componentPath: string = this.settings[this.ComponentPathSetting][component.ID];

                    switch (component.ID)
                    {
                        case "themes":
                            this.config.set(this.ThemePathSetting, componentPath);
                            await FileSystem.mkdirp(this.destinationPath(componentPath));
                            break;
                        default:
                            if (!isNullOrUndefined(component.TemplateFile))
                            {
                                await CopyComponent(component, componentPath + ".ts");
                            }
                            else
                            {
                                await FileSystem.ensureFile(componentsPath(componentPath + ".ts"));
                            }
                    }
                }
            }
        }
    }

    /**
     * Installs the dependencies.
     */
    public async install(): Promise<void>
    {
        this.installDependencies({ bower: false, npm: true });
    }

    /**
     * Show some helpful messages after finishing the installation-process.
     */
    public async end(): Promise<void>
    {
        this.config.save();
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