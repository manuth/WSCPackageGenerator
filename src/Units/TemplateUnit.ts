import { FileMapping, GeneratorOptions, IFileMapping, Question } from "@manuth/extended-yo-generator";
import { ensureDir, ensureFile } from "fs-extra";
import { join } from "upath";
import { ApplicationQuestions } from "../Inquiry/ApplicationQuestions";
import { AssetQuestion } from "../Inquiry/AssetQuestion";
import { IWoltLabGeneratorSettings } from "../IWoltLabGeneratorSettings";
import { WoltLabGenerator } from "../WoltLabGenerator";
import { WoltLabSettingKey } from "../WoltLabSettingKey";
import { WoltLabUnit } from "../WoltLabUnit";
import { WoltLabUnitName } from "../WoltLabUnitName";

/**
 * Represents a unit for creating templates.
 *
 * @template TSettings
 * The type of the generator-settings.
 *
 * @template TOptions
 * The type of the generator-options.
 */
export class TemplateUnit<TSettings extends IWoltLabGeneratorSettings, TOptions extends GeneratorOptions> extends WoltLabUnit<TSettings, TOptions>
{
    /**
     * @inheritdoc
     */
    public get ID(): WoltLabUnitName
    {
        return WoltLabUnitName.Templates;
    }

    /**
     * @inheritdoc
     */
    public get DisplayName(): string
    {
        return "Templates";
    }

    /**
     * @inheritdoc
     */
    public override get Questions(): Array<Question<TSettings>>
    {
        return [
            ...super.Questions,
            ...new ApplicationQuestions(
                WoltLabSettingKey.TemplateApp,
                "What's the application you want to provide templates for?"),
            new AssetQuestion<TSettings, TOptions>(
                this.Generator,
                WoltLabSettingKey.TemplateRoot,
                "Where do you want to store the templates?",
                (answers) => join("templates", answers[WoltLabSettingKey.TemplateApp]))
        ];
    }

    /**
     * @inheritdoc
     */
    public override get FileMappings(): Array<IFileMapping<TSettings, TOptions>>
    {
        return [
            ...super.FileMappings,
            {
                Destination: (taget, generator) => generator.Settings[WoltLabSettingKey.ACPTemplateRoot],
                Processor: async (target) =>
                {
                    await ensureDir(target.Destination);
                    await ensureFile(join(target.Destination, "Place templates here"));
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
        return "Templates.ts";
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
        return this.Generator.templatePath("components", "Templates.ts.ejs");
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
    protected override GetTemplateContext(target: FileMapping<TSettings, TOptions>, generator: WoltLabGenerator<TSettings, TOptions>): any
    {
        return {
            ...super.GetTemplateContext(target, generator),
            Application: generator.Settings[WoltLabSettingKey.TemplateApp],
            TemplateRoot: generator.Settings[WoltLabSettingKey.TemplateRoot]
        };
    }
}
