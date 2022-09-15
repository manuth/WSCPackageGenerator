import { join, relative } from "path";
import { GeneratorOptions, IFileMapping, Question } from "@manuth/extended-yo-generator";
import { IPathQuestionOptions, JSONCCreatorMapping, PathPrompt, TSProjectDisplayNameQuestion } from "@manuth/generator-ts-project";
// eslint-disable-next-line node/no-unpublished-import
import type { ThemeInstruction } from "@manuth/woltlab-compiler";
import { DistinctQuestion, InputQuestionOptions, QuestionTypeName } from "inquirer";
import pascalcase from "pascalcase";
import { InstructionComponent } from "../../../Components/InstructionComponent.js";
import { IWoltLabSettings } from "../../../Settings/IWoltLabSettings.js";
import { WoltLabGenerator } from "../../../WoltLabGenerator.js";
import { ThemeInstructionFileMapping } from "../FileMappings/ThemeInstructionFileMapping.js";
import { IThemeComponentOptions } from "../Settings/IThemeComponentOptions.js";
import { PackageComponentType } from "../Settings/PackageComponentType.js";
import { ThemeComponent } from "../Settings/ThemeComponent.js";

/**
 * Provides a component for generating theme-instructions.
 *
 * @template TSettings
 * The type of the settings of the generator.
 *
 * @template TOptions
 * The type of the options of the generator.
 *
 * @template TComponentOptions
 * The type of the options of the component.
 */
export class ThemeInstructionComponent<TSettings extends IWoltLabSettings, TOptions extends GeneratorOptions, TComponentOptions extends IThemeComponentOptions> extends InstructionComponent<TSettings, TOptions, TComponentOptions>
{
    /**
     * Initializes a new instance of the {@link ThemeInstructionComponent `ThemeInstructionComponent<TSettings, TOptions, TComponentOptions>`} class.
     *
     * @param generator
     * The generator of the component.
     */
    public constructor(generator: WoltLabGenerator<TSettings, TOptions>)
    {
        super(generator);
    }

    /**
     * @inheritdoc
     */
    public get ID(): string
    {
        return PackageComponentType.Theme;
    }

    /**
     * @inheritdoc
     */
    public get DisplayName(): string
    {
        return "Theme";
    }

    /**
     * @inheritdoc
     */
    public override get FileMappings(): Array<IFileMapping<TSettings, TOptions>>
    {
        let result = super.FileMappings;
        let blankFiles: Array<IFileMapping<TSettings, TOptions>> = [];

        if (this.ComponentOptions?.Components?.includes(ThemeComponent.CustomScss))
        {
            blankFiles.push(
                {
                    Destination: this.ComponentOptions.CustomScssFileName
                });
        }

        if (this.ComponentOptions?.Components?.includes(ThemeComponent.ScssOverrides))
        {
            blankFiles.push(
                {
                    Destination: this.ComponentOptions.ScssOverridesFileName
                });
        }

        for (let blankFileMapping of blankFiles)
        {
            blankFileMapping.Processor = (target, generator) =>
            {
                generator.fs.write(target.Destination, "");
            };
        }

        result.push(...blankFiles);

        if (this.ComponentOptions?.Components?.includes(ThemeComponent.Variables))
        {
            result.push(new JSONCCreatorMapping(this.Generator, this.ComponentOptions.VariableFileName, {}));
        }

        return result;
    }

    /**
     * @inheritdoc
     */
    protected get InstructionFileMapping(): IFileMapping<TSettings, TOptions>
    {
        return new ThemeInstructionFileMapping(this);
    }

    /**
     * Gets a question for asking for the name of the theme.
     */
    protected get NameQuestion(): Question<TComponentOptions>
    {
        return {
            ...(new TSProjectDisplayNameQuestion(this.Generator) as InputQuestionOptions<any>),
            name: nameof<TComponentOptions>((options) => options.Name),
            message: "What's the name of the theme?",
            default: undefined
        } as Question<TComponentOptions>;
    }

    /**
     * Gets a question for asking for the human-readable name of the theme.
     */
    protected get DisplayNameQuestion(): Question<TComponentOptions>
    {
        return {
            ...this.NameQuestion,
            name: nameof<TComponentOptions>((options) => options.DisplayName),
            message: "What's the human-readable name of the theme?",
            default: (answers) => answers.Name
        } as DistinctQuestion<TComponentOptions> as any;
    }

    /**
     * Gets a question for asking for a description for the theme.
     */
    protected get DescriptionQuestion(): Question<TComponentOptions>
    {
        return {
            name: nameof<TComponentOptions>((options) => options.Description),
            message: "Please enter a description for your theme."
        };
    }

    /**
     * @inheritdoc
     */
    protected override get PathQuestion(): Question<TComponentOptions>
    {
        return {
            ...super.PathQuestion,
            default: (answers) =>
            {
                return relative(
                    this.Generator.sourcePath(),
                    this.Generator.componentPath(`${pascalcase(answers.DisplayName)}.ts`));
            }
        } as DistinctQuestion<TComponentOptions> as any;
    }

    /**
     * Gets a question for asking for {@link ThemeComponent `ThemeComponent`}s to use.
     */
    protected get ComponentQuestion(): Question<TComponentOptions>
    {
        return {
            type: "checkbox",
            name: nameof<IThemeComponentOptions>((options) => options.Components),
            message: "What do you wish to include in your theme?",
            choices: [
                {
                    name: "Custom SCSS Code",
                    value: ThemeComponent.CustomScss
                },
                {
                    name: "SCSS Variable Overrides",
                    value: ThemeComponent.ScssOverrides
                },
                {
                    name: "Custom Theme Variables",
                    value: ThemeComponent.Variables
                }
            ]
        };
    }

    /**
     * Gets a question for asking for the name of the `.scss`-file containing custom code.
     */
    protected get ScssFileNameQuestion(): Question<TComponentOptions>
    {
        return {
            ...this.GetAssetQuestion(),
            name: nameof<IThemeComponentOptions>((options) => options.CustomScssFileName),
            message: "Where do you want to store the custom scss-code?",
            when: (answers) => answers.Components.includes(ThemeComponent.CustomScss),
            default: () => "theme.scss"
        } as Question<TComponentOptions>;
    }

    /**
     * Gets a question for asking for the name of the `.scss`-file containing variable overrides.
     */
    protected get OverridesFileNameQuestion(): Question<TComponentOptions>
    {
        return {
            ...this.GetAssetQuestion(),
            name: nameof<IThemeComponentOptions>((options) => options.ScssOverridesFileName),
            message: "Where do you want to store the scss variable overrides?",
            when: (answers) => answers.Components.includes(ThemeComponent.ScssOverrides),
            default: () => "overrides.scss"
        } as Question<TComponentOptions>;
    }

    /**
     * Gets a question for asking for the name of the `.json`-file containing the variables.
     */
    protected get VariableFileNameQuestion(): Question<TComponentOptions>
    {
        return {
            ...this.GetAssetQuestion(),
            name: nameof<IThemeComponentOptions>((options) => options.VariableFileName),
            message: "Where do you want to store the variables?",
            when: (answers) => answers.Components.includes(ThemeComponent.Variables),
            default: () => "variables.json"
        } as Question<TComponentOptions>;
    }

    /**
     * @inheritdoc
     */
    protected override get ComponentOptionQuestionCollection(): Array<Question<TComponentOptions>>
    {
        return [
            this.NameQuestion,
            this.DisplayNameQuestion,
            this.DescriptionQuestion,
            ...super.ComponentOptionQuestionCollection,
            this.ComponentQuestion,
            this.ScssFileNameQuestion,
            this.OverridesFileNameQuestion,
            this.VariableFileNameQuestion
        ];
    }

    /**
     * @inheritdoc
     *
     * @param options
     * The options which have been provided by the user.
     *
     * @returns
     * The name of the instruction-class.
     */
    protected GetClassName(options: TComponentOptions): string
    {
        return nameof<ThemeInstruction>();
    }

    /**
     * @inheritdoc
     *
     * @param options
     * The options which have been provided by the user.
     *
     * @returns
     * The name of the instruction-variable to export.
     */
    protected override GetVariableName(options: TComponentOptions): string
    {
        if ((options?.DisplayName ?? "").length > 0)
        {
            return `${pascalcase(options.DisplayName)}`;
        }
        else
        {
            return super.GetVariableName(options);
        }
    }

    /**
     * Gets the path to the suggested directory to store theme-assets.
     *
     * @param path
     * The path to join to the theme-directory.
     *
     * @returns
     * The name of the directory containing theme-assets.
     */
    protected GetThemeDirectory(...path: string[]): string
    {
        return join(this.Generator.assetPath("themes"), ...path);
    }

    /**
     * Gets a question for asking for a path to a theme-asset.
     *
     * @returns
     * A question for asking for a path to a theme-asset.
     */
    protected GetAssetQuestion(): Question<TComponentOptions>
    {
        return {
            type: PathPrompt.TypeName as QuestionTypeName,
            rootDir: (answers) =>
            {
                return {
                    path: this.GetThemeDirectory(answers.DisplayName),
                    allowOutside: true
                };
            }
        } as IPathQuestionOptions<TComponentOptions> as any;
    }
}
