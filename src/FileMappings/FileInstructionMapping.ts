import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { IInstructionOptions } from "@manuth/woltlab-compiler";
import { ObjectLiteralExpression, printNode, ts } from "ts-morph";
import { FileInstructionComponent } from "../Components/FileInstructionComponent";
import { IWoltLabComponentOptions } from "../Settings/IWoltLabComponentOptions";
import { IWoltLabGeneratorSettings } from "../Settings/IWoltLabGeneratorSettings";
import { InstructionFileMapping } from "./InstructionFileMapping";

/**
 * Provides the functionality to generate bbcode instruction files.
 */
export abstract class FileInstructionMapping<TSettings extends IWoltLabGeneratorSettings, TOptions extends GeneratorOptions, TComponentOptions extends IWoltLabComponentOptions> extends InstructionFileMapping<TSettings, TOptions, TComponentOptions>
{
    /**
     * The component to create an instruction-file for.
     */
    private fileInstructionComponent: FileInstructionComponent<TSettings, TOptions, TComponentOptions>;

    /**
     * Initializes a new instance of the {@link BBCodeInstructionFileMapping `BBCodeInstructionFileMapping<TSettings, TOptions, TComponentOptions>`} class.
     *
     * @param component
     * The component to create an instruction-file for.
     */
    public constructor(component: FileInstructionComponent<TSettings, TOptions, TComponentOptions>)
    {
        super(component);
        this.fileInstructionComponent = component;
    }

    /**
     * @inheritdoc
     */
    protected override get Component(): FileInstructionComponent<TSettings, TOptions, TComponentOptions>
    {
        return this.fileInstructionComponent;
    }

    /**
     * @inheritdoc
     */
    protected override get InstructionOptions(): ObjectLiteralExpression
    {
        let options = super.InstructionOptions;

        options.addPropertyAssignment(
            {
                name: nameof<IInstructionOptions>((instruction) => instruction.FileName),
                initializer: printNode(ts.factory.createStringLiteral(this.Component.OutputFileName))
            });

        return options;
    }
}
