import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { INodeSystemInstructionOptions } from "@manuth/woltlab-compiler";
import { ObjectLiteralExpression, printNode, ts } from "ts-morph";
import { InstructionComponent } from "../../../Components/InstructionComponent";
import { FileInstructionMapping } from "../../../FileMappings/FileInstructionMapping";
import { IWoltLabComponentOptions } from "../../../Settings/IWoltLabComponentOptions";
import { IWoltLabGeneratorSettings } from "../../../Settings/IWoltLabGeneratorSettings";

/**
 * Provides the functionality to generate translation instruction files.
 */
export class TranslationInstructionFileMapping<TSettings extends IWoltLabGeneratorSettings, TOptions extends GeneratorOptions, TComponentOptions extends IWoltLabComponentOptions> extends FileInstructionMapping<TSettings, TOptions, TComponentOptions>
{
    /**
     * Initializes a new instance of the {@link TemplateInstructionFileMapping `TemplateInstructionFileMapping<TSettings, TOptions, TComponentOptions>`} class.
     *
     * @param component
     * The component to create an instruction-file for.
     */
    public constructor(component: InstructionComponent<TSettings, TOptions, TComponentOptions>)
    {
        super(component);
    }

    /**
     * Gets the options to pass to the instruction-constructor.
     */
    protected override get InstructionOptions(): ObjectLiteralExpression
    {
        let options = super.InstructionOptions;

        options.addPropertyAssignments(
            [
                {
                    name: nameof<INodeSystemInstructionOptions<any>>((instruction) => instruction.Nodes),
                    initializer: printNode(ts.factory.createArrayLiteralExpression())
                }
            ]);

        return options;
    }

    /**
     * @inheritdoc
     */
    protected get FileName(): string
    {
        return "translations";
    }
}
