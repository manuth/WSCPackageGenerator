import { GeneratorOptions, IFileMapping } from "@manuth/extended-yo-generator";
// eslint-disable-next-line node/no-unpublished-import
import type { EmojiInstruction } from "@manuth/woltlab-compiler";
import { FileInstructionComponent } from "../../../Components/FileInstructionComponent.js";
import { IWoltLabComponentOptions } from "../../../Settings/IWoltLabComponentOptions.js";
import { IWoltLabSettings } from "../../../Settings/IWoltLabSettings.js";
import { WoltLabGenerator } from "../../../WoltLabGenerator.js";
import { EmojiInstructionFileMapping } from "../FileMappings/EmojiInstructionFileMapping.js";
import { PackageComponentType } from "../Settings/PackageComponentType.js";

/**
 * Provides a component for generating emojis.
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
export class EmojiComponent<TSettings extends IWoltLabSettings, TOptions extends GeneratorOptions, TComponentOptions extends IWoltLabComponentOptions> extends FileInstructionComponent<TSettings, TOptions, TComponentOptions>
{
    /**
     * Initializes a new instance of the {@link EmojiComponent `EmojiComponent<TSettings, TOptions, TComponentOptions>`} class.
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
        return nameof<EmojiInstruction>();
    }
}
