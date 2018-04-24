import * as Generator from "yeoman-generator";
import * as Path from "path";
import chalk from "chalk";
import { isNullOrUndefined } from "util";
import yosay = require("yosay");

/**
 * Provides the functionality to generate WSC-styles.
 */
class WSCStyleGenerator extends Generator
{
    /**
     * The options provided by the user.
     */
    private settings: { [key: string]: any };

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
     * Collects all informations about the style that is to be created.
     */
    prompting()
    {
        this.log(yosay(`Welcome to the ${chalk.whiteBright("WoltLab Suite Core Style")} generator!`));

        let prompts: Generator.Questions = [
            {
                type: "input",
                name: "stylesPath",
                message: "Where do you want to store your styles?",
                default: "styles",
                when: (answers: Generator.Answers) =>
                {
                    if (isNullOrUndefined(this.config.get("stylesPath")))
                    {
                        return true;
                    }
                    else
                    {
                        answers["stylesPath"] = this.config.get("stylesPath");
                    }
                }
            },
            {
                type: "input",
                name: "name",
                message: "What's the name of your style?",
                validate: this.forceInput
            },
            {
                type: "input",
                name: "displayName",
                message: "What's the display-name of your style?",
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
                type: "checkbox",
                name: "components",
                message: "What do you want to provide?",
                choices: [
                    {
                        name: "Custom SCSS-Styles",
                        value: "customStyles"
                    },
                    {
                        name: "Variable-Overrides",
                        value: "variableOverrides"
                    }
                ]
            },
            {
                type: "input",
                name: "componentPaths.customStyles",
                message: "Where do you want to store the custom SCSS-styles?",
                default: "styles.scss",
                when: (answers: Generator.Answers) =>
                {
                    return (answers["components"] as string[]).includes("customStyles");
                }
            },
            {
                type: "input",
                name: "componentPaths.variableOverrides",
                message: "Where do you want to store the variable-overrides?",
                default: "override.scss",
                when: (answers: Generator.Answers) =>
                {
                    return (answers["components"] as string[]).includes("variableOverrides");
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
        let basePath: string = Path.relative(Path.join(this.settings["stylesPath"], this.settings["name"]), ".");
        basePath = basePath.replace("\\", "/");

        if (basePath.length === 0)
        {
            basePath = ".";
        }

        this.settings["basePath"] = basePath + "/";
        this.fs.copyTpl(this.templatePath("Style.ts"), this.destinationPath(this.settings["stylesPath"], this.settings["name"], "Style.ts"), this.settings);

        for (let component of (this.settings["components"] as string[]))
        {
            switch (component)
            {
                case "customStyles":
                    this.fs.copyTpl(
                        this.templatePath("blank.scss"),
                        this.destinationPath(this.settings["stylesPath"], this.settings["name"], this.settings["componentPaths"][component]),
                        this.settings);
                    break;
                case "variableOverrides":
                    this.fs.copyTpl(
                        this.templatePath("blank.scss"),
                        this.destinationPath(this.settings["stylesPath"], this.settings["name"], this.settings["componentPaths"][component]),
                        this.settings);
                    break;
                        
            }
        }
    }

    /**
     * Installs the dependencies.
     */
    finalize()
    {
        this.config.set("stylesPath", this.settings["stylesPath"]);
        this.config.save();

        this.log();
        this.log("Your style \"" + this.settings["name"] + "\" has been created!");
        this.log();
        this.log(
            "Please keep in mind to add your styles-folder to the package" +
            "by adding \"...new StyleInstructionCollection(\"" + this.settings["stylesPath"] + "\"" +
            "to the Install- or Update instruction-collection.");
    }
}

export = WSCStyleGenerator;