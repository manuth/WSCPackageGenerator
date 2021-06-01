import { FileMapping, GeneratorOptions, IFileMapping, Question } from "@manuth/extended-yo-generator";
import { ensureFile } from "fs-extra";
import { join } from "upath";
import { ApplicationQuestions } from "../Inquiry/ApplicationQuestions";
import { AssetQuestion } from "../Inquiry/AssetQuestion";
import { IWoltLabGeneratorSettings } from "../IWoltLabGeneratorSettings";
import { WoltLabGenerator } from "../WoltLabGenerator";
import { WoltLabSettingKey } from "../WoltLabSettingKey";
import { WoltLabUnit } from "../WoltLabUnit";
import { WoltLabUnitName } from "../WoltLabUnitName";

/**
 * Represents a unit for executing php-scripts.
 */
export class PHPScriptUnit<TSettings extends IWoltLabGeneratorSettings, TOptions extends GeneratorOptions> extends WoltLabUnit<TSettings, TOptions>
{
    /**
     * @inheritdoc
     */
    public get ID(): WoltLabUnitName
    {
        return WoltLabUnitName.PHPScript;
    }

    /**
     * @inheritdoc
     */
    public get DisplayName(): string
    {
        return "PHP-Scripts to Execute During the Installation";
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
        return "PHPScript.ts";
    }

    /**
     * @inheritdoc
     */
    public override get Questions(): Array<Question<TSettings>>
    {
        return [
            ...super.Questions,
            {
                type: "list",
                name: WoltLabSettingKey.SelfContainedPHP,
                message: "What kind of PHP-script do you want to execute?",
                default: false,
                choices: [
                    {
                        value: true,
                        name: "I want to create a new script"
                    },
                    {
                        value: false,
                        name: "A script which already exists on the server"
                    }
                ]
            },
            ...new ApplicationQuestions<IWoltLabGeneratorSettings>(
                WoltLabSettingKey.PHPScriptApp,
                "What application's directory do you want to load the php-script from?",
                (answers) => !answers[WoltLabSettingKey.SelfContainedPHP]),
            {
                name: WoltLabSettingKey.PHPScriptSource,
                message: "Where do you want to load the file from?",
                when: (answers) => !answers[WoltLabSettingKey.SelfContainedPHP],
                filter: (input) => input ?? ""
            },
            ...new ApplicationQuestions<IWoltLabGeneratorSettings>(
                WoltLabSettingKey.PHPScriptApp,
                "What application do you want to upload the php-file to?",
                (answers) => answers[WoltLabSettingKey.SelfContainedPHP]),
            new class extends AssetQuestion<TSettings, TOptions>
            {
                /**
                 * @inheritdoc
                 *
                 * @param answers
                 * The answers provided by the user.
                 *
                 * @returns
                 * A value indicating whether the question should be asked.
                 */
                protected override async When(answers: TSettings): Promise<boolean>
                {
                    return answers[WoltLabSettingKey.SelfContainedPHP];
                }
            }(
                this.Generator,
                WoltLabSettingKey.PHPScriptFile,
                "Where do you want to store the php-file?",
                (answers) => join(answers[WoltLabSettingKey.PHPScriptApp], "install.php")),
            {
                name: WoltLabSettingKey.PHPScriptSource,
                message: "Where do you want to upload the php-file to?",
                default: (answers: TSettings) => `lib/install_${answers[WoltLabSettingKey.Identifier]}_0.0.0.php`,
                when: (answers) => answers[WoltLabSettingKey.SelfContainedPHP]
            }
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
                Destination: (target, generator) => generator.Settings[WoltLabSettingKey.PHPScriptFile],
                Processor: async (target, generator) =>
                {
                    if (generator.Settings[WoltLabSettingKey.SelfContainedPHP])
                    {
                        await ensureFile(generator.Settings[WoltLabSettingKey.PHPScriptFile]);
                    }
                }
            }
        ];
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
        return this.Generator.templatePath("components", `${generator.Settings[WoltLabSettingKey.SelfContainedPHP] ? "SelfContainedPHPScript" : "PHPScript"}.ts.ejs`);
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
        let result = {
            ...super.GetTemplateContext(target, generator),
            Application: generator.Settings[WoltLabSettingKey.PHPScriptApp],
            PHPFile: generator.Settings[WoltLabSettingKey.PHPScriptFile]
        };

        if (generator.Settings[WoltLabSettingKey.SelfContainedPHP])
        {
            Object.assign(
                result,
                {
                    PHPSource: generator.Settings[WoltLabSettingKey.PHPScriptSource]
                });
        }

        return result;
    }
}
