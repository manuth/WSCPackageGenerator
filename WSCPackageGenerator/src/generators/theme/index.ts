import chalk from "chalk";
import escapeStringRegexp = require("escape-string-regexp");
import * as FileSystem from "fs-extra";
import * as Path from "path";
import { isNullOrUndefined } from "util";
import * as YoGenerator from "yeoman-generator";
import yosay = require("yosay");
import { Generator } from "../Generator";
import { IComponentCategory } from "../IComponentCategory";

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

    protected get TemplateRoot()
    {
        return "theme";
    }

    protected get Components(): IComponentCategory[]
    {
        return [
            {
                DisplayName: "General",
                Components: [
                    {
                        ID: "customScss",
                        DisplayName: "Custom SCSS-Code",
                        Message: "Where do you want to store the custom SCSS-Code?",
                        TemplateFile: "blank.scss",
                        DefaultFileName: "main.scss"
                    },
                    {
                        ID: "scssOverride",
                        DisplayName: "SCSS-Variable Overrides",
                        Message: "Where do you want to store the variable-overrides?",
                        TemplateFile: "blank.scss",
                        DefaultFileName: "overrides.scss"
                    },
                    {
                        ID: "variables",
                        DisplayName: "Theme-Variables",
                        Message: "Where do you want to store the theme-variables?",
                        TemplateFile: "variables.json",
                        DefaultFileName: "variables.json"
                    }
                ]
            }
        ];
    }

    /**
     * Collects all information about the theme that is to be created.
     */
    public async prompting()
    {
        this.log(yosay(`Welcome to the ${chalk.whiteBright("WoltLab Suite Core Theme")} generator!`));

        let prompts: YoGenerator.Questions = [
            {
                type: "input",
                name: this.ThemePathSetting,
                message: "Where do you want to store your themes?",
                default: "themes",
                when: (answers: YoGenerator.Answers) =>
                {
                    if (isNullOrUndefined(this.config.get(this.ThemePathSetting)))
                    {
                        return true;
                    }
                    else
                    {
                        answers[this.ThemePathSetting] = this.config.get(this.ThemePathSetting);
                        return false;
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
                default: (answers: YoGenerator.Answers) =>
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
            ...this.ComponentQuestions
        ];

        return this.prompt(prompts).then((answers: YoGenerator.Answers) =>
        {
            this.settings = answers;
        });
    }

    /**
     * Writes the templates
     */
    public async writing()
    {
        {
            let themeFileName = this.destinationPath(this.settings[this.ThemePathSetting], this.settings.name, "Theme.ts");
            let relativePackage = Path.posix.normalize(
                Path.relative(
                    Path.dirname(themeFileName),
                    process.cwd()).replace(new RegExp(escapeStringRegexp(Path.sep), "g"), "/"));

            if (!relativePackage.startsWith("."))
            {
                relativePackage = "./" + relativePackage;
            }

            if (!relativePackage.endsWith("/"))
            {
                relativePackage = relativePackage + "/";
            }

            this.fs.copyTpl(
                this.templatePath("Theme.ts.ejs"),
                themeFileName,
                {
                    RelativePackage: relativePackage,
                    Settings: this.settings,
                    Components: this.settings[this.ComponentSetting],
                    ComponentPaths: this.settings[this.ComponentPathSetting]
                });
        }

        for (let category of this.Components)
        {
            for (let component of category.Components)
            {
                if ((this.settings[this.ComponentSetting] as string[]).includes(component.ID))
                {
                    let destinationFile: string = this.settings[this.ComponentPathSetting][component.ID];

                    if (!isNullOrUndefined(component.TemplateFile))
                    {
                        this.fs.copyTpl(
                            this.templatePath(component.TemplateFile),
                            this.destinationPath(this.settings[this.ThemePathSetting], this.settings.name, destinationFile),
                            this.settings);
                    }
                    else
                    {
                        await FileSystem.ensureFile(destinationFile);
                    }
                }
            }
        }
    }

    /**
     * Installs the dependencies.
     */
    public async end()
    {
        this.config.set(this.ThemePathSetting, this.settings[this.ThemePathSetting]);
        this.config.save();

        this.log();
        this.log("Your theme \"" + (this.settings.name as string) + "\" has been created!");
        this.log();
        this.log(
            "Please keep in mind to add your themes-folder to the package" +
            "by adding \"...new ThemeInstructionCollection(\"" + (this.settings.themesPath as string) + "\"" +
            "to the Install- or Update instruction-collection.");
    }
}

export = WSCThemeGenerator;