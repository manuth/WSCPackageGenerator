import * as FileSystem from "fs-extra";
import * as Generator from "yeoman-generator";
import * as Path from "path";
import chalk from "chalk";
import yosay = require("yosay");

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
    constructor(args, opts)
    {
        super(args, opts);
    }

    /**
     * Validates whether a folder other than the destination is provided.
     * 
     * @param {string} value
     * The value that is to be validated.
     * 
     * @param {Generator.Answers} answers
     * The answers provided by the user.
     */
    private EnforceDifferentFolder = (value: string, answers?: Generator.Answers): boolean | string =>
    {
        if (this.destination !== Path.resolve(process.cwd(), this.destination, value))
        {
            return true;
        }
        else
        {
            return "Files must be stored in a separate folder!";
        }
    }

    /**
     * Validates whether the a value is provided.
     * 
     * @param {string} value
     * The value that is to be validated.
     * 
     * @param {Generator.Answers} answers
     * The answers provided by the user.
     */
    private ForceInput = (value: string, answers?: Generator.Answers): boolean | string =>
    {
        if (value.length > 0)
        {
            return true;
        }
        else
        {
            return "Please enter a valid input!";
        }
    }

    /**
     * Collects all informations about the packaged that is to be created.
     */
    public Prompting()
    {
        this.log(yosay(`Welcome to the ${chalk.whiteBright("WoltLab Suite Core Package")} generator!`));

        let prompts: Generator.Questions = [
            {
                type: "input",
                name: "destination",
                message: "What directory do you want to create the package to?",
                default: "./",
                filter: (value: string, answers?: Generator.Answers) =>
                {
                    this.destination = Path.resolve(process.cwd(), value);
                    return value;
                }
            },
            {
                type: "input",
                name: "name",
                message: "What's the name of your package?",
                default: (answers: Generator.Answers) =>
                {
                    return Path.basename(this.destination);
                },
                validate: this.ForceInput
            },
            {
                type: "input",
                name: "displayName",
                message: "What's the display-name of your package?",
                default: (answers: Generator.Answers) =>
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
                message: "Please enter your name.",
                default: this.user.git.name
            },
            {
                type: "input",
                name: "authorURL",
                message: "Please enter your homepage."
            },
            {
                type: "input",
                name: "identifier",
                message: "Please type an identifier for your package:",
                default: (answers: Generator.Answers) =>
                {
                    let reversedURI = (answers.authorURL as string).replace(/(.*:\/\/)?(.*?)(\/.*)?/g, "$2").split(".").reverse().join(".");

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
                        name: "Files (for example PHP-scripts or pictures)",
                        value: "files"
                    },
                    {
                        name: "Control Panel-Options and Categories",
                        value: "acpOptions"
                    },
                    {
                        name: "Event-Listeners",
                        value: "eventListener"
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
                        line: "Customization"
                    },
                    {
                        name: "Styles",
                        value: "style"
                    },
                    {
                        name: "Templates",
                        value: "template"
                    },
                    {
                        name: "ACP-Templates",
                        value: "acpTemplate"
                    },
                    {
                        name: "Template-Listeners",
                        value: "templateListener"
                    },
                    {
                        type: "separator",
                        line: "Other"
                    },
                    {
                        name: "Emojis",
                        value: "emoji"
                    },
                    {
                        name: "BBCodes",
                        value: "bbcode"
                    }
                ]
            },
            {
                type: "input",
                name: "componentPaths.style",
                message: "Where do you want to store styles?",
                default: "styles",
                when: (answers: Generator.Answers) =>
                {
                    return (answers.components as string[]).includes("style");
                }
            },
            {
                type: "input",
                name: "componentPaths.files",
                message: "Where do you want to store your file-mappings?",
                default: "Files",
                when: (answers: Generator.Answers) =>
                {
                    return (answers.components as string[]).includes("files");
                }
            },
            {
                type: "input",
                name: "componentPaths.acpOptions",
                message: "Where do you want to store the ACP-options and categories?",
                default: "Options",
                when: (answers: Generator.Answers) =>
                {
                    return (answers.components as string[]).includes("acpOptions");
                }
            },
            {
                type: "input",
                name: "componentPaths.eventListener",
                message: "Where do you want to store your event-listeners?",
                default: "EventListeners",
                when: (answers: Generator.Answers) =>
                {
                    return (answers.components as string[]).includes("eventListener");
                }
            },
            {
                type: "input",
                name: "componentPaths.translations",
                message: "Where do you want to store your translations?",
                default: "Translations",
                when: (answers: Generator.Answers) =>
                {
                    return (answers.components as string[]).includes("translations");
                }
            },
            {
                type: "input",
                name: "componentPaths.errors",
                message: "Where do you want to store your error-messages?",
                default: "ErrorMessages",
                when: (answers: Generator.Answers) =>
                {
                    return (answers.components as string[]).includes("errors");
                }
            },
            {
                type: "input",
                name: "componentPaths.template",
                message: "Where do you want to store templates?",
                default: "Templates",
                when: (answers: Generator.Answers) =>
                {
                    return (answers.components as string[]).indexOf("template") >= 0;
                }
            },
            {
                type: "input",
                name: "componentPaths.acpTemplate",
                message: "Where do you want to store ACP-templates?",
                default: "ACPTemplates",
                when: (answers: Generator.Answers) =>
                {
                    return (answers.components as string[]).indexOf("acpTemplate") >= 0;
                },
                validate: this.EnforceDifferentFolder
            },
            {
                type: "input",
                name: "componentPaths.templateListener",
                message: "Where do you want to store template-listeners?",
                default: "TemplateListeners",
                when: (answers: Generator.Answers) =>
                {
                    return (answers.components as string[]).indexOf("templateListener") >= 0;
                },
            },
            {
                type: "input",
                name: "componentPaths.emoji",
                default: "Emojis",
                message: "Where do you want to store emojis?",
                when: (answers: Generator.Answers) =>
                {
                    return (answers.components as string[]).indexOf("emoji") >= 0;
                }
            },
            {
                type: "input",
                name: "componentPaths.bbcode",
                default: "BBCodes",
                message: "Where do you want to store BB-Codes?",
                when: (answers: Generator.Answers) =>
                {
                    return (answers.components as string[]).indexOf("bbcode") >= 0;
                }
            }
        ];

        return this.prompt(prompts).then(answers =>
        {
            this.settings = answers;
        });
    }

    /**
     * Writes the templates
     */
    public writing()
    {
        let componentsPath = (value: string): string =>
        {
            return this.destinationPath("components", value);
        };

        let componentTemplates: { [key: string]: string } = {
            files: "Files.ts",
            acpOptions: "Options.ts",
            eventListener: "EventListeners.ts",
            translations: "Translations.ts",
            errors: "ErrorMessages.ts",
            template: "Templates.ts",
            acpTemplate: "ACPTemplates.ts",
            templateListener: "TemplateListeners.ts",
            emoji: "Emojis.ts",
            bbcode: "BBCodes.ts"
        };

        this.destinationRoot(this.destination);
        this.fs.copy(this.templatePath("_.vscode"), this.destinationPath(".vscode"));
        this.fs.copy(this.templatePath("lib"), this.destinationPath("lib"));
        this.fs.copy(this.templatePath("lib/templates"), this.destinationPath("lib/templates"));
        this.fs.copy(this.templatePath("_.gitignore"), this.destinationPath(".gitignore"));
        this.fs.copyTpl(this.templatePath("_package.json"), this.destinationPath("package.json"), this.settings);
        this.fs.copyTpl(this.templatePath("Package.ts"), this.destinationPath("Package.ts"), this.settings);
        this.fs.copyTpl(this.templatePath("README.md"), this.destinationPath("README.md"), this.settings);
        this.fs.copy(this.templatePath("_tsconfig.json"), this.destinationPath("tsconfig.json"));
        this.fs.copyTpl(this.templatePath("wsc-package-quickstart.md"), this.destinationPath("wsc-package-quickstart.md"), { });

        for (let component of this.settings.components)
        {
            switch (component)
            {
                case "style":
                    FileSystem.mkdirpSync(this.destinationPath(this.settings.componentPaths[component]));
                    break;
                default:
                    this.fs.copyTpl(
                        this.templatePath("components", componentTemplates[component]),
                        componentsPath(this.settings.componentPaths[component] + ".ts"),
                        this.settings);
                    break;
            }
        }
    }

    /**
     * Installs the dependencies.
     */
    public install()
    {   
        if (this.settings.components.includes("style"))
        {
            this.config.set("stylesPath", this.settings.componentPaths.style);
        }

        this.config.save();
        
        this.installDependencies({ bower: false, npm: true });
    }

    /**
     * Show some helpful messages after finishing the installation-process.
     */
    public End()
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