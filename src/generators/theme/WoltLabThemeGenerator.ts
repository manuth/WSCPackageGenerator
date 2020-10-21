import { GeneratorOptions, GeneratorSettingKey, IComponentCollection, IFileMapping, Question } from "@manuth/extended-yo-generator";
import { TSProjectSettingKey } from "@manuth/generator-ts-project";
import chalk = require("chalk");
import yosay = require("yosay");
import { IWoltLabGeneratorSettings } from "../../IWoltLabGeneratorSettings";
import { WoltLabGenerator } from "../../WoltLabGenerator";
import { WoltLabSettingKey } from "../../WoltLabSettingKey";
import { WoltLabUnitName } from "../../WoltLabUnitName";
import { ThemeUnit } from "./Units/ThemeUnit";
import { WoltLabThemeComponent } from "./WoltLabThemeComponent";

/**
 * Provides the functionality to generate woltlab-themes.
 */
export class WoltLabThemeGenerator extends WoltLabGenerator<IWoltLabGeneratorSettings, GeneratorOptions>
{
    /**
     * Initializes a new instance of the `WoltLabThemeGenerator` class.
     *
     * @param args
     * A set of arguments.
     *
     * @param opts
     * A set of options.
     */
    public constructor(args: string | string[], opts: Record<string, unknown>)
    {
        super(args, opts);
    }

    /**
     * @inheritdoc
     */
    public get TemplateRoot(): string
    {
        return "theme";
    }

    /**
     * @inheritdoc
     */
    public get Questions(): Array<Question<IWoltLabGeneratorSettings>>
    {
        return [
            {
                type: "input",
                name: TSProjectSettingKey.Destination,
                message: "Which is the root directory of the package you want to add themes to?",
                default: "./"
            },
            {
                type: "input",
                name: `${WoltLabSettingKey.UnitPaths}[${WoltLabUnitName.Themes}]`,
                message: "Where do you want to store the theme?",
                default: this.sourcePath("Themes"),
                when: (answers) =>
                {
                    if (this.config.get(WoltLabUnitName.Themes))
                    {
                        answers[WoltLabSettingKey.UnitPaths] ??= {};
                        answers[WoltLabSettingKey.UnitPaths][WoltLabUnitName.Themes] = this.config.get(WoltLabUnitName.Themes);
                        return false;
                    }
                    else
                    {
                        return true;
                    }
                }
            },
            {
                type: "input",
                name: TSProjectSettingKey.Name,
                message: "What's the name of your theme?",
                validate: (input: string) => /.+/.test(input.trim()) ? true : "The name must not be empty!"
            },
            {
                type: "input",
                name: TSProjectSettingKey.DisplayName,
                message: "What's the display-name of your theme?",
                default: (answers: IWoltLabGeneratorSettings) =>
                {
                    return answers[TSProjectSettingKey.Name];
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

    /**
     * @inheritdoc
     */
    public get Components(): IComponentCollection<IWoltLabGeneratorSettings, GeneratorOptions>
    {
        return {
            Question: "What should be included in your theme?",
            Categories: [
                {
                    DisplayName: "General",
                    Components: [
                        new ThemeUnit(
                            this,
                            WoltLabThemeComponent.SCSSCode,
                            "Custom SCSS-Code",
                            () => "blank.scss",
                            "Where do you want to store the custom SCSS-Code?",
                            "main.scss"),
                        new ThemeUnit(
                            this,
                            WoltLabThemeComponent.SCSSOverrides,
                            "SCSS-Variable Overries",
                            () => "blank.scss",
                            "Where do you want to store the variable-overrides?",
                            "overrides.scss"),
                        new ThemeUnit(
                            this,
                            WoltLabThemeComponent.Variables,
                            "Theme-Variables",
                            () => "variables.json",
                            "Where do you want to store the variables?",
                            "variables.json")
                    ]
                }
            ]
        };
    }

    /**
     * @inheritdoc
     */
    public get FileMappings(): Array<IFileMapping<IWoltLabGeneratorSettings, GeneratorOptions>>
    {
        return [
            {
                Source: "Theme.ts.ejs",
                Context: () =>
                    {
                        return {
                            Settings: this.Settings,
                            Components: this.Settings[GeneratorSettingKey.Components],
                            ComponentPaths: this.Settings[WoltLabSettingKey.UnitPaths]
                        };
                    },
                Destination: () => this.destinationPath(this.sourcePath(), this.Settings[WoltLabSettingKey.UnitPaths][WoltLabUnitName.Themes], this.Settings[TSProjectSettingKey.Name], "Theme.ts")
            }
        ];
    }

    /**
     * @inheritdoc
     */
    public async prompting(): Promise<void>
    {
        this.log(yosay(`Welcome to the ${chalk.whiteBright("WoltLab Suite Core Theme")} generator!`));
        return super.prompting();
    }

    /**
     * @inheritdoc
     */
    public async writing(): Promise<void>
    {
        return super.writing();
    }

    /**
     * @inheritdoc
     */
    public async end(): Promise<void>
    {
        this.config.set(WoltLabUnitName.Themes, this.Settings[WoltLabSettingKey.UnitPaths][WoltLabUnitName.Themes]);
        this.config.save();

        this.log();
        this.log(`Your theme "${this.Settings[TSProjectSettingKey.DisplayName]}" has been created!`);
        this.log();
        this.log("Please keep in mind to add your themes-folder to the packageby adding a corresponding \"ThemeInstructionCollection\" to the Install- or Update instruction-collection.");
    }
}
