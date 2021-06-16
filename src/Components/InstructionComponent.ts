import { GeneratorOptions, IFileMapping, Question } from "@manuth/extended-yo-generator";
import { IWoltLabComponentOptions } from "../Settings/IWoltLabComponentOptions";
import { IWoltLabSettings } from "../Settings/IWoltLabSettings";
import { IPathQuestion } from "./Inquiry/Prompts/IPathQuestion";
import { WoltLabComponent } from "./WoltLabComponent";

/**
 * Provides a component for generating an instruction-file.
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
        return this.WoltLabGenerator.componentPath(`${this.VariableName}.ts`);
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
        let question = super.PathQuestion as IPathQuestion<TComponentOptions>;

        question.rootDir = {
            path: this.WoltLabGenerator.sourcePath(),
            allowOutside: false
        };

        question.default ??= this.InstructionFileName;
        return question;
    }

    /**
     * Gets a file-mapping for creating the instruction-file.
     */
    protected abstract get InstructionFileMapping(): IFileMapping<TSettings, TOptions>;
}
