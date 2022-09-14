import { relative } from "path";
import { GeneratorOptions, IFileMapping, Question } from "@manuth/extended-yo-generator";
import { IPathQuestion } from "@manuth/generator-ts-project";
import { IWoltLabComponentOptions } from "../Settings/IWoltLabComponentOptions.js";
import { IWoltLabSettings } from "../Settings/IWoltLabSettings.js";
import { WoltLabGenerator } from "../WoltLabGenerator.js";
import { WoltLabComponent } from "./WoltLabComponent.js";

/**
 * Provides a component for generating an instruction-file.
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
export abstract class InstructionComponent<TSettings extends IWoltLabSettings, TOptions extends GeneratorOptions, TComponentOptions extends IWoltLabComponentOptions = IWoltLabComponentOptions> extends WoltLabComponent<TSettings, TOptions, TComponentOptions>
{
    /**
     * Initializes a new instance of the {@link InstructionComponent `InstructionComponent<TSettings, TOptions, TComponentOptions>`} class.
     *
     * @param generator
     * The generator of the component.
     */
    public constructor(generator: WoltLabGenerator<TSettings, TOptions>)
    {
        super(generator);
    }

    /**
     * Gets the name of the instruction-class.
     */
    public get ClassName(): string
    {
        return this.GetClassName(this.ComponentOptions);
    }

    /**
     * Gets the name of the instruction-variable to export.
     */
    public get VariableName(): string
    {
        return this.GetVariableName(this.ComponentOptions);
    }

    /**
     * Gets the default name of the file to write the instruction to.
     */
    public get InstructionFileName(): string
    {
        return this.GetInstructionFileName(this.ComponentOptions);
    }

    /**
     * @inheritdoc
     */
    public override get FileMappings(): Array<IFileMapping<TSettings, TOptions>>
    {
        return [
            ...super.FileMappings,
            this.InstructionFileMapping
        ];
    }

    /**
     * A question for asking for the component-path.
     */
    protected override get PathQuestion(): Question<TComponentOptions>
    {
        let question = super.PathQuestion as any as IPathQuestion<TComponentOptions>;

        question.rootDir = {
            path: this.Generator.sourcePath(),
            allowOutside: false
        };

        question.default ??= (answers: TComponentOptions) =>
        {
            return relative(this.Generator.sourcePath(), this.GetInstructionFileName(answers));
        };

        return question as any;
    }

    /**
     * Gets a file-mapping for creating the instruction-file.
     */
    protected abstract get InstructionFileMapping(): IFileMapping<TSettings, TOptions>;

    /**
     * Gets the name of the instruction-class based on the options provided by the user.
     *
     * @param options
     * The options which have been provided by the user.
     *
     * @returns
     * The name of the instruction-class.
     */
    protected abstract GetClassName(options: TComponentOptions): string;

    /**
     * Gets the name of the instruction-variable to export based on the options provided by the user.
     *
     * @param options
     * The options which have been provided by the user.
     *
     * @returns
     * The name of the instruction-variable to export.
     */
    protected GetVariableName(options: TComponentOptions): string
    {
        return `My${this.GetClassName(options)}`;
    }

    /**
     * Gets the default name of the file to write the instruction to based on the options provided by the user.
     *
     * @param options
     * The options which have been provided by the user.
     *
     * @returns
     * The default name of the file to write the instruction to.
     */
    protected GetInstructionFileName(options: TComponentOptions): string
    {
        return this.Generator.componentPath(`${this.GetVariableName(options)}.ts`);
    }
}
