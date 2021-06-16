import { GeneratorOptions, IFileMapping } from "@manuth/extended-yo-generator";
import type { EmojiInstruction } from "@manuth/woltlab-compiler";
import { FileInstructionComponent } from "../../../Components/FileInstructionComponent";
import { IWoltLabComponentOptions } from "../../../Settings/IWoltLabComponentOptions";
import { IWoltLabSettings } from "../../../Settings/IWoltLabSettings";
import { WoltLabGenerator } from "../../../WoltLabGenerator";
import { EmojiInstructionFileMapping } from "../FileMappings/EmojiInstructionFileMapping";
import { PackageComponentType } from "../Settings/PackageComponentType";

/**
 * Provides a component for generating emojis.
 */
export class EmojiComponent<TSettings extends IWoltLabSettings, TOptions extends GeneratorOptions, TComponentOptions extends IWoltLabComponentOptions> extends FileInstructionComponent<TSettings, TOptions, TComponentOptions>
{
    /**
     * Initializes a new instance of the {@link EmojiComponent `EmojiComponent<TSettings, TOptions, TComponentOptions>`} class.
     *
     * @param generator
     * The generator of the component.
     */
    // ToDo: Replace `any` w/ `TSettings`
    public constructor(generator: WoltLabGenerator<any, TOptions>)
    {
        super(generator);
    }

    /**
     * @inheritdoc
     */
    public get ClassName(): string
    {
        return nameof<EmojiInstruction>();
    }

    /**
     * @inheritdoc
     */
    public get OutputFileName(): string
    {
        return "emojis.xml";
    }

    /**
     * @inheritdoc
     */
    public get ID(): string
    {
        return PackageComponentType.Emoji;
    }

    /**
     * @inheritdoc
     */
    public get DisplayName(): string
    {
        return "Emojis";
    }

    /**
     * @inheritdoc
     */
    protected get InstructionFileMapping(): IFileMapping<TSettings, TOptions>
    {
        return new EmojiInstructionFileMapping(this);
    }
}
