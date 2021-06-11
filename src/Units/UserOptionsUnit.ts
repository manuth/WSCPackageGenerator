import { FileMapping, GeneratorOptions } from "@manuth/extended-yo-generator";
import { IWoltLabGeneratorSettings } from "../IWoltLabGeneratorSettings";
import { WoltLabGenerator } from "../WoltLabGenerator";
import { WoltLabUnit } from "../WoltLabUnit";
import { WoltLabUnitName } from "../WoltLabUnitName";

/**
 * Represents a unit for creating user-options.
 *
 * @template TSettings
 * The type of the generator-settings.
 *
 * @template TOptions
 * The type of the generator-options.
 */
export class UserOptionsUnit<TSettings extends IWoltLabGeneratorSettings, TOptions extends GeneratorOptions> extends WoltLabUnit<TSettings, TOptions>
{
    /**
     * @inheritdoc
     */
    public get ID(): WoltLabUnitName
    {
        return WoltLabUnitName.UserOptions;
    }

    /**
     * @inheritdoc
     */
    public get DisplayName(): string
    {
        return "User-Options";
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
        return "UserOptions.ts";
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
        return this.Generator.templatePath("components", "UserOptions.ts.ejs");
    }
}
