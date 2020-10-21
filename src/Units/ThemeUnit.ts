import { FileMapping, GeneratorOptions, IFileMapping } from "@manuth/extended-yo-generator";
import { ensureDir } from "fs-extra";
import { IWoltLabGeneratorSettings } from "../IWoltLabGeneratorSettings";
import { WoltLabGenerator } from "../WoltLabGenerator";
import { WoltLabUnit } from "../WoltLabUnit";
import { WoltLabUnitName } from "../WoltLabUnitName";

/**
 * Represents a unit for creating themes.
 */
export class ThemeUnit<TSettings extends IWoltLabGeneratorSettings, TOptions extends GeneratorOptions> extends WoltLabUnit<TSettings, TOptions>
{
    /**
     * @inheritdoc
     */
    public get ID(): WoltLabUnitName
    {
        return WoltLabUnitName.Themes;
    }

    /**
     * @inheritdoc
     */
    public get DisplayName(): string
    {
        return "Themes";
    }

    /**
     * @inheritdoc
     */
    public get AllowOutside(): boolean
    {
        return true;
    }

    /**
     * @inheritdoc
     */
    protected get UnitFileMapping(): IFileMapping<TSettings, TOptions>
    {
        return {
            ...super.UnitFileMapping,
            Source: null,
            Processor: async (target) =>
            {
                await ensureDir(target.Destination);
            }
        };
    }

    /**
     * @inheritdoc
     *
     * @param answers
     * The answers provided by the user.
     *
     * @returns
     * The message to show to the user.
     */
    public async Message(answers: TSettings): Promise<string>
    {
        return "Where do you want to store themes?";
    }

    /**
     * @inheritdoc
     *
     * @param answers
     * The answers provided by the users.
     *
     * @returns
     * The directory the path should be relative to.
     */
    public DefaultBaseName(answers: TSettings): string
    {
        return "Themes";
    }

    /**
     * @inheritdoc
     *
     * @param target
     * The file-mapping to get the context for.
     *
     * @param generator
     * The generator of the file-mapping.
     *
     * @returns
     * The context for copying the template-file.
     */
    protected GetTemplateFileName(target: FileMapping<TSettings, TOptions>, generator: WoltLabGenerator<TSettings, TOptions>): string
    {
        return null;
    }
}
