import { relative } from "path";
import { GeneratorOptions, IFileMapping, Question } from "@manuth/extended-yo-generator";
import { IPathQuestion } from "@manuth/generator-ts-project";
import { IWoltLabComponentOptions } from "../Settings/IWoltLabComponentOptions.js";
import { IWoltLabSettings } from "../Settings/IWoltLabSettings.js";
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
     * Gets the name of the instruction-class.
     */
    public abstract get ClassName(): string;

    /**
     * Gets the name of the instruction-variable to export.
     */
    public get VariableName(): string
    {
        return `My${this.ClassName}`;
    }

    /**
     * Gets the default name of the file to write the instruction to.
     */
    public get InstructionFileName(): string
    {
        return this.Generator.componentPath(`${this.VariableName}.ts`);
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

        question.default ??= relative(this.Generator.sourcePath(), this.InstructionFileName);
        return question as any;
    }

    /**
     * Gets a file-mapping for creating the instruction-file.
     */
    protected abstract get InstructionFileMapping(): IFileMapping<TSettings, TOptions>;
}
