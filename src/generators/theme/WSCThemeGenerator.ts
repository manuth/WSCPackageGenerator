import chalk from "chalk";
import { Answers, GeneratorSetting, IComponentProvider, Question } from "extended-yo-generator";
import { isNullOrUndefined } from "util";
import yosay = require("yosay");
import { Generator } from "../../Generator";
import { WoltLabGeneratorSetting } from "../../GeneratorSetting";
import { SourceFileMapping } from "../../SourceFileMapping";
import { WSCPackageComponent } from "../app/WSCPackageComponent";
import { IWSCThemeSettings } from "./IWSCThemeSettings";
import { ThemeAssetComponent } from "./ThemeAssetComponent";
import { WSCThemeComponent } from "./WSCThemeComponent";
import { WSCThemeSetting } from "./WSCThemeSetting";

/**
 * Provides the functionality to generate WSC-themes.
 */
export class WSCThemeGenerator extends Generator<IWSCThemeSettings>
{
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

    protected get Questions(): Question<IWSCThemeSettings>[]
    {
        return [
            {
                type: "input",
                name: WSCThemeSetting.Destination,
                message: "Where do you want to store your themes?",
                default: "themes",
                when: (answers) =>
                {
                    if (isNullOrUndefined(this.config.get(WSCPackageComponent.Themes)))
                    {
                        return true;
                    }
                    else
                    {
                        answers[WSCThemeSetting.Destination] = this.config.get(WSCPackageComponent.Themes);
                        return false;
                    }
                }
            },
            {
                type: "input",
                name: WSCThemeSetting.Name,
                message: "What's the name of your theme?",
                validate: (input: string) => /.+/.test(input.trim()) ? true : "The name must not be empty!"
            },
            {
                type: "input",
                name: WSCThemeSetting.DisplayName,
                message: "What's the display-name of your theme?",
                default: (answers: Answers) =>
                {
                    return answers.name;
                },
                validate: (input: string) => /.+/.test(input.trim()) ? true : "The name must not be empty!"
            },
            {
                type: "input",
                name: "description",
                message: "Please enter a description:"
            }
        ];
    }

    protected get ProvidedComponents(): IComponentProvider<IWSCThemeSettings>
    {
        return {
            Question: "What should be included in your theme?",
            Categories: [
                {
                    DisplayName: "General",
                    Components: [
                        new ThemeAssetComponent(
                            this,
                            {
                                ID: WSCThemeComponent.SCSSCode,
                                DisplayName: "Custom SCSS-Code",
                                FileMapping: {
                                    Source: "blank.scss"
                                },
                                Question: {
                                    message: "Where do you want to store the custom SCSS-Code?",
                                    default: "main.scss"
                                }
                            }),
                        new ThemeAssetComponent(
                            this,
                            {
                                ID: WSCThemeComponent.SCSSOverrides,
                                DisplayName: "SCSS-Variable Overrides",
                                FileMapping: {
                                    Source: "blank.scss"
                                },
                                Question: {
                                    message: "Where do you want to store the variable-overrides?",
                                    default: "overrides.scss"
                                }
                            }),
                        new ThemeAssetComponent(
                            this,
                            {
                                ID: WSCThemeComponent.Variables,
                                DisplayName: "Theme-Variables",
                                FileMapping: {
                                    Source: "variables.json"
                                },
                                Question: {
                                    message: "Where do you want to store theme-variables?",
                                    default: "variables.json"
                                }
                            })
                    ]
                }
            ]
        };
    }

    /**
     * Collects all information about the theme that is to be created.
     */
    public async prompting()
    {
        this.log(yosay(`Welcome to the ${chalk.whiteBright("WoltLab Suite Core Theme")} generator!`));
        return super.prompting();
    }

    /**
     * Writes the templates
     */
    public async writing()
    {
        let themeFileName = this.destinationPath(this.sourcePath(this.Settings[WSCThemeSetting.Destination], this.Settings.name, "Theme.ts"));

        this.ProcessFile(
            new SourceFileMapping(
                this,
                {
                    Source: this.templatePath("Theme.ts.ejs"),
                    Context: () =>
                    {
                        return {
                            Settings: this.Settings,
                            Components: this.Settings[GeneratorSetting.Components],
                            ComponentPaths: this.Settings[WoltLabGeneratorSetting.ComponentPaths]
                        };
                    },
                    Destination: themeFileName
                }));

        return super.writing();
    }

    /**
     * Installs the dependencies.
     */
    public async end()
    {
        this.config.set(WSCPackageComponent.Themes, this.Settings[WSCThemeSetting.Destination]);
        this.config.save();

        this.log();
        this.log("Your theme \"" + this.Settings[WSCThemeSetting.DisplayName] + "\" has been created!");
        this.log();
        this.log(
            "Please keep in mind to add your themes-folder to the package" +
            "by adding \"...new ThemeInstructionCollection(\"" + this.Settings[WSCThemeSetting.Destination] + "\"" +
            "to the Install- or Update instruction-collection.");
    }
}