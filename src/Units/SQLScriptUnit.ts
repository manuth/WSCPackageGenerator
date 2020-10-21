import { FileMapping, GeneratorOptions, IFileMapping, Question } from "@manuth/extended-yo-generator";
import { ensureFile } from "fs-extra";
import { AssetQuestion } from "../Inquiry/AssetQuestion";
import { IWoltLabGeneratorSettings } from "../IWoltLabGeneratorSettings";
import { WoltLabGenerator } from "../WoltLabGenerator";
import { WoltLabSettingKey } from "../WoltLabSettingKey";
import { WoltLabUnit } from "../WoltLabUnit";
import { WoltLabUnitName } from "../WoltLabUnitName";

/**
 * Represents a unit for executing an sql-script.
 */
export class SQLScriptUnit<TSettings extends IWoltLabGeneratorSettings, TOptions extends GeneratorOptions> extends WoltLabUnit<TSettings, TOptions>
{
    /**
     * @inheritdoc
     */
    public get ID(): WoltLabUnitName
    {
        return WoltLabUnitName.SQLScript;
    }

    /**
     * @inheritdoc
     */
    public get DisplayName(): string
    {
        return "SQL-Script to Execute During the Installation";
    }

    /**
     * @inheritdoc
     */
    public get Questions(): Array<Question<TSettings>>
    {
        return [
            ...super.Questions,
            new AssetQuestion<TSettings, TOptions>(
                this.Generator,
                WoltLabSettingKey.SQLFile,
                "Where do you want to store the SQL-file?",
                "install.sql")
        ];
    }

    /**
     * @inheritdoc
     */
    public get FileMappings(): Array<IFileMapping<TSettings, TOptions>>
    {
        return [
            ...super.FileMappings,
            {
                Destination: (target, generator) => generator.Settings[WoltLabSettingKey.SQLFile],
                Processor: async (target, generator) =>
                {
                    await ensureFile(target.Destination);
                }
            }
        ];
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
        return "SQLScript.ts";
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
        return this.Generator.templatePath("components", "SQLScript.ts.ejs");
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
    protected GetTemplateContext(target: FileMapping<TSettings, TOptions>, generator: WoltLabGenerator<TSettings, TOptions>): any
    {
        return {
            ...super.GetTemplateContext(target, generator),
            SQLFile: generator.Settings[WoltLabSettingKey.SQLFile]
        };
    }
}
