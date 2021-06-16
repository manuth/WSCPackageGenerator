import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { IEmojiInstructionOptions } from "@manuth/woltlab-compiler";
import { ObjectLiteralExpression, printNode, ts } from "ts-morph";
import { FileInstructionComponent } from "../../../Components/FileInstructionComponent";
import { FileInstructionMapping } from "../../../FileMappings/FileInstructionMapping";
import { IWoltLabComponentOptions } from "../../../Settings/IWoltLabComponentOptions";
import { IWoltLabGeneratorSettings } from "../../../Settings/IWoltLabGeneratorSettings";

/**
 * Provides the functionality to generate emoji instruction files.
 */
export class EmojiInstructionFileMapping<TSettings extends IWoltLabGeneratorSettings, TOptions extends GeneratorOptions, TComponentOptions extends IWoltLabComponentOptions> extends FileInstructionMapping<TSettings, TOptions, TComponentOptions>
{
    /**
     * Initializes a new instance of the {@link EmojiInstructionFileMapping `EmojiInstructionFileMapping<TSettings, TOptions, TComponentOptions>`} class.
     *
     * @param component
     * The component to create an instruction-file for.
     */
    public constructor(component: FileInstructionComponent<TSettings, TOptions, TComponentOptions>)
    {
        super(component);
    }

    /**
     * @inheritdoc
     */
    protected override get InstructionOptions(): ObjectLiteralExpression
    {
        let options = super.InstructionOptions;

        options.addPropertyAssignment(
            {
                name: nameof<IEmojiInstructionOptions>((instruction) => instruction.Emojis),
                initializer: printNode(ts.factory.createArrayLiteralExpression())
            });

        return options;
    }
}