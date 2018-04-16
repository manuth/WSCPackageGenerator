'use strict';
import * as Path from "path";
import * as Generator from "yeoman-generator";
import chalk from "chalk";
import yosay = require("yosay");
import Node from "./templates/lib/Nodes/Node";

export = class extends Generator
{
    /**
     * The options provided by the user.
     */
    private settings: { [key: string]: any };

    /**
     * Initializes a new instance of the `Generator` class.
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
    private enforceDifferentFolder = (value: string, answers?: Generator.Answers): boolean | string =>
    {
        if (answers["destination"] !== Path.resolve(answers["destination"], value))
        {
            return true;
        }
        else
        {
            return "Files must be stored in a separate folder!";
        }
    }

    /**
     * Validates whether a file stored in a different folder is provided.
     * 
     * @param {string} value
     * The value that is to be validated.
     * 
     * @param {Generator.Answers} answers
     * The answers provided by the user.
     */
    private enforceSameFolder = (value: string, answers?: Generator.Answers): boolean | string =>
    {
        if (Path.dirname(value) === ".")
        {
            return true;
        }
        else
        {
            return "Subfolders are not allowed!";
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
    private forceInput = (value: string, answers?: Generator.Answers): boolean | string =>
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
    prompting()
    {
        // Have Yeoman greet the user.
        this.log(yosay(`Welcome to the ${chalk.whiteBright("WoltLab Suite Core Package")} generator!`));

        let prompts: Generator.Questions = [
            {
                type: "input",
                name: "destination",
                message: "What directory do you want to create the package to?",
                default: "./",
                filter: (value: string, answers?: Generator.Answers) =>
                {
                    return Path.resolve(process.cwd(), value);
                }
            },
            {
                type: "input",
                name: "name",
                message: "What\'s the name of your package?",
                default: (answers: Generator.Answers) =>
                {
                    return Path.basename(answers["destination"]);
                },
                validate: this.forceInput
            },
            {
                type: "input",
                name: "displayName",
                message: "What\'s the display-name of your package?",
                default: (answers: Generator.Answers) =>
                {
                    return answers["name"];
                },
                validate: this.forceInput
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
                    let reversedURI = (answers['authorURL'] as string).replace(/(.*:\/\/)?(.*?)(\/.*)?/g, "$2").split(".").reverse().join(".");

                    if (reversedURI.length === 0)
                    {
                        reversedURI = "com.example";
                    }

                    return reversedURI + "." + (answers["name"] as string).toLowerCase();
                },
                validate: this.forceInput
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
                        name: "Translations",
                        value: "translations"
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
                    return (answers["components"] as string[]).indexOf("style") >= 0;
                }
            },
            {
                type: "input",
                name: "componentPaths.files",
                message: "Where do you want to store your file-mappings?",
                default: "FileMappings",
                when: (answers: Generator.Answers) =>
                {
                    return (answers["components"] as string[]).indexOf("files") >= 0;
                }
            },
            {
                type: "input",
                name: "componentPaths.acpOptions",
                message: "Where do you want to store the ACP-options and categories?",
                default: "Options",
                when: (answers: Generator.Answers) =>
                {
                    return (answers["components"] as string[]).indexOf("acpOptions") >= 0;
                }
            },
            {
                type: "input",
                name: "componentPaths.eventListener",
                message: "Where do you want to store your event-listeners?",
                default: "EventListeners",
                when: (answers: Generator.Answers) =>
                {
                    return (answers["components"] as string[]).indexOf("eventListener") >= 0;
                }
            },
            {
                type: "input",
                name: "componentPaths.translations",
                message: "Where do you want to store your translations?",
                default: "Translations",
                when: (answers: Generator.Answers) =>
                {
                    return (answers["components"] as string[]).indexOf("translations") >= 0;
                }
            },
            {
                type: "input",
                name: "componentPaths.template",
                message: "Where do you want to store templates?",
                default: "Templates",
                when: (answers: Generator.Answers) =>
                {
                    return (answers["components"] as string[]).indexOf("template") >= 0;
                }
            },
            {
                type: "input",
                name: "componentPaths.acpTemplate",
                message: "Where do you want to store ACP-templates?",
                default: "ACPTemplates",
                when: (answers: Generator.Answers) =>
                {
                    return (answers["components"] as string[]).indexOf("acpTemplate") >= 0;
                },
                validate: this.enforceDifferentFolder
            },
            {
                type: "input",
                name: "componentPaths.templateListener",
                message: "Where do you want to store template-listeners?",
                default: "TemplateListeners",
                when: (answers: Generator.Answers) =>
                {
                    return (answers["components"] as string[]).indexOf("templateListener") >= 0;
                },
            },
            {
                type: "input",
                name: "componentPaths.emoji",
                default: "Emojis",
                message: "Where do you want to store emojis?",
                when: (answers: Generator.Answers) =>
                {
                    return (answers["components"] as string[]).indexOf("emoji") >= 0;
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
    writing()
    {
        let componentsPath = (value: string): string =>
        {
            return this.destinationPath("components", value);
        }

        let componentTemplates: { [key: string]: string } = {
            files: "Files.ts",
            acpOptions: "Options.ts",
            eventListener: "EventListeners.ts",
            translations: "Translations.ts",
            style: "wsc-style-getting-started.md",
            template: "Templates.ts",
            acpTemplate: "ACPTemplates.ts",
            templateListener: "TemplateListeners.ts",
            emoji: "Emojis.ts"
        }

        this.destinationRoot(this.settings["destination"]);
        this.fs.copy(this.templatePath("_.vscode"), this.destinationPath(".vscode"));
        this.fs.copy(this.templatePath("lib/**/*.ts"), this.destinationPath("lib"));
        this.fs.copy(this.templatePath("lib/templates"), this.destinationPath("lib/templates"));
        this.fs.copy(this.templatePath("_.gitignore"), this.destinationPath(".gitignore"));
        this.fs.copyTpl(this.templatePath("_package.json"), this.destinationPath("package.json"), this.settings);
        this.fs.copyTpl(this.templatePath("Package.ts"), this.destinationPath("Package.ts"), this.settings);
        this.fs.copy(this.templatePath("_tsconfig.json"), this.destinationPath("tsconfig.json"));

        for (let component of this.settings["components"])
        {
            switch (component)
            {
                case "style":
                    this.fs.copyTpl(
                        this.templatePath("styles", componentTemplates[component]),
                        this.destinationPath(Path.join(this.settings["componentPaths"][component], componentTemplates[component])),
                        this.settings);
                    break;
                default:
                    this.fs.copyTpl(
                        this.templatePath("components", componentTemplates[component]),
                        componentsPath(this.settings["componentPaths"][component] + ".ts"),
                        this.settings);
                    break;
            }
        }
    }

    install()
    {
        this.installDependencies({ bower: false, npm: true })
    }
};