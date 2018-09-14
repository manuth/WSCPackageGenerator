import chalk from "chalk";
import * as Path from "path";
import { isNullOrUndefined } from "util";
import * as YoGenerator from "yeoman-generator";
import yosay = require("yosay");
import { Generator } from "../Generator";

/**
 * Provides the functionality to generate WSC-themes.
 */
class WSCThemeGenerator extends Generator
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
    constructor(args: string | string[], opts: {})
    {
        super(args, opts);
    }

    protected get TemplateRoot(): string
    {
        return "theme";
    }

    /**
     * Collects all informations about the theme that is to be created.
     */
    public async prompting(): Promise<void>
    {
        this.log(yosay(`Welcome to the ${chalk.whiteBright("WoltLab Suite Core Theme")} generator!`));

        let prompts: YoGenerator.Questions = [
            {
                type: "input",
                name: "themesPath",
                message: "Where do you want to store your themes?",
                default: "themes",
                when: (answers: YoGenerator.Answers): boolean =>
                {
                    if (isNullOrUndefined(this.config.get("themesPath")))
                    {
                        return true;
                    }
                    else
                    {
                        answers.themesPath = this.config.get("themesPath");
                    }
                }
            },
            {
                type: "input",
                name: "name",
                message: "What's the name of your theme?",
                validate: this.ForceInput
            },
            {
                type: "input",
                name: "displayName",
                message: "What's the display-name of your theme?",
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
                type: "checkbox",
                name: "components",
                message: "What do you want to provide?",
                choices: [
                    {
                        name: "Custom SCSS-Themes",
                        value: "customThemes"
                    },
                    {
                        name: "Variable-Overrides",
                        value: "variableOverrides"
                    }
                ]
            },
            {
                type: "input",
                name: "componentPaths.customThemes",
                message: "Where do you want to store the custom SCSS-themes?",
                default: "themes.scss",
                when: (answers: YoGenerator.Answers): boolean =>
                {
                    return (answers.components as string[]).includes("customThemes");
                }
            },
            {
                type: "input",
                name: "componentPaths.variableOverrides",
                message: "Where do you want to store the variable-overrides?",
                default: "override.scss",
                when: (answers: YoGenerator.Answers): boolean =>
                {
                    return (answers.components as string[]).includes("variableOverrides");
                }
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
        let basePath: string = Path.relative(Path.join(this.settings.themesPath, this.settings.name), ".");
        basePath = basePath.replace("\\", "/");

        if (basePath.length === 0)
        {
            basePath = ".";
        }

        this.settings.basePath = basePath + "/";
        this.fs.copyTpl(this.templatePath("Theme.ts.ejs"), this.destinationPath(this.settings.themesPath, this.settings.name, "Theme.ts"), this.settings);

        for (let component of (this.settings.components as string[]))
        {
            switch (component)
            {
                case "customThemes":
                    this.fs.copyTpl(
                        this.templatePath("blank.scss"),
                        this.destinationPath(this.settings.themesPath, this.settings.name, this.settings.componentPaths[component]),
                        this.settings);
                    break;
                case "variableOverrides":
                    this.fs.copyTpl(
                        this.templatePath("blank.scss"),
                        this.destinationPath(this.settings.themesPath, this.settings.name, this.settings.componentPaths[component]),
                        this.settings);
                    break;

            }
        }
    }

    /**
     * Installs the dependencies.
     */
    public async end(): Promise<void>
    {
        this.config.set("themesPath", this.settings.themesPath);
        this.config.save();

        this.log();
        this.log("Your theme \"" + this.settings.name + "\" has been created!");
        this.log();
        this.log(
            "Please keep in mind to add your themes-folder to the package" +
            "by adding \"...new ThemeInstructionCollection(\"" + this.settings.themesPath + "\"" +
            "to the Install- or Update instruction-collection.");
    }
}

export = WSCThemeGenerator;