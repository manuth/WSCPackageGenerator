import { posix } from "path";
import { GeneratorOptions, IFileMapping, Question } from "@manuth/extended-yo-generator";
import { IPathQuestion, PathPrompt, SetQuestion } from "@manuth/generator-ts-project";
// eslint-disable-next-line node/no-unpublished-import
import type { PHPInstruction, SelfContainedPHPInstruction } from "@manuth/woltlab-compiler";
import fs from "fs-extra";
import { AsyncDynamicQuestionProperty, ListQuestion } from "inquirer";
import path from "upath";
import { FileUploadComponentBase } from "../../../Components/FileUploadComponentBase.js";
import { IApplicationQuestion } from "../../../Components/Inquiry/Prompts/IApplicationQuestion.js";
import { IWoltLabSettings } from "../../../Settings/IWoltLabSettings.js";
import { WoltLabSettingKey } from "../../../Settings/WoltLabSettingKey.js";
import { WoltLabGenerator } from "../../../WoltLabGenerator.js";
import { PHPInstructionFileMapping } from "../FileMappings/PHPInstructionFileMapping.js";
import { SelfContainedPHPFileMapping } from "../FileMappings/SelfContainedPHPFileMapping.js";
import { IPHPScriptComponentOptions } from "../Settings/IPHPScriptComponentOptions.js";
import { PackageComponentType } from "../Settings/PackageComponentType.js";

const { ensureFile } = fs;
const { join } = path;

/**
 * Provides a component for uploading or executing php-scripts.
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
export class PHPScriptComponent<TSettings extends IWoltLabSettings, TOptions extends GeneratorOptions, TComponentOptions extends IPHPScriptComponentOptions> extends FileUploadComponentBase<TSettings, TOptions, TComponentOptions>
{
    /**
     * Initializes a new instance of the {@link PHPScriptComponent `PHPScriptComponent<TSettings, TOptions, TComponentOptions>`} class.
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
    public get ID(): string
    {
        return PackageComponentType.PHPScript;
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
     */
    protected get DefaultSourceBaseName(): string
    {
        return "phpScripts";
    }

    /**
     * Gets a question for asking whether the script-file is self-contained.
     */
    protected get ScriptTypeQuestion(): ListQuestion<TComponentOptions>
    {
        return {
            type: "list",
            name: nameof<IPHPScriptComponentOptions>((options) => options.SelfContained),
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
        } as ListQuestion<IPHPScriptComponentOptions>;
    }

    /**
     * @inheritdoc
     */
    protected override get AppQuestion(): IApplicationQuestion<TComponentOptions>
    {
        return {
            ...super.AppQuestion,
            message: (options) =>
            {
                return options.SelfContained ?
                    "What application do you want to upload the php-file to?" :
                    "What application's directory do you want to load the php-script from?";
            }
        };
    }

    /**
     * Gets a question for asking for the existing script's location.
     */
    protected get LocationQuestion(): SetQuestion<TComponentOptions, TSettings>
    {
        return {
            type: PathPrompt.TypeName,
            name: nameof<IPHPScriptComponentOptions>((options) => options.FileName),
            message: (options: TComponentOptions) =>
            {
                if (options.SelfContained)
                {
                    return "Where do you want to upload the php-file to?";
                }
                else
                {
                    return `Where is the script located relative to the \`${options.Application}\` application-directory?`;
                }
            },
            path: posix,
            default: (options: TComponentOptions, answers: TSettings) =>
            {
                if (options.SelfContained)
                {
                    return join("lib", `install_${answers[WoltLabSettingKey.Identifier]}_0.0.0.php`);
                }
                else
                {
                    return undefined;
                }
            }
        } as SetQuestion<TComponentOptions, TSettings>;
    }

    /**
     * @inheritdoc
     */
    protected override get SourceQuestion(): IPathQuestion<TComponentOptions>
    {
        return {
            ...super.SourceQuestion,
            message: "Where do you want to store the php-file?",
            when: async (options: TComponentOptions) =>
            {
                return this.GetSelfContainedPredicate(options, true);
            }
        };
    }

    /**
     * @inheritdoc
     */
    protected override get ComponentOptionQuestionCollection(): Array<Question<TComponentOptions>>
    {
        let result = [
            this.ScriptTypeQuestion,
            this.PathQuestion,
            this.AppQuestion,
            this.SourceQuestion,
            this.LocationQuestion
        ];

        for (let question of super.ComponentOptionQuestionCollection)
        {
            if (!result.includes(question))
            {
                result.push(question);
            }
        }

        return result as any;
    }

    /**
     * @inheritdoc
     */
    protected override get InstructionFileMapping(): IFileMapping<TSettings, TOptions>
    {
        return this.ComponentOptions.SelfContained ?
            new SelfContainedPHPFileMapping(this) :
            new PHPInstructionFileMapping(this);
    }

    /**
     * @inheritdoc
     */
    public override get FileMappings(): Array<IFileMapping<TSettings, TOptions>>
    {
        return [
            ...super.FileMappings,
            ...(
                this.ComponentOptions.SelfContained ?
                    [
                        {
                            Destination: () => this.ComponentOptions.Source,
                            Processor: async (target, generator) =>
                            {
                                generator.fs.write(target.Destination, "");
                            }
                        } as IFileMapping<TSettings, TOptions>
                    ] :
                    [])
        ];
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
        if (options?.SelfContained ?? false)
        {
            return nameof<SelfContainedPHPInstruction>();
        }
        else
        {
            return nameof<PHPInstruction>();
        }
    }

    /**
     * @inheritdoc
     *
     * @param options
     * The options of the component.
     *
     * @returns
     * The default full name of the path to suggest in the {@link PHPScriptComponent.SourceQuestion `SourceQuestion`}.
     */
    protected override GetDefaultSource(options: TComponentOptions): string
    {
        return join(super.GetDefaultSource(options), "install.php");
    }

    /**
     * Gets a predicate for checking whether the php-script is self-contained.
     *
     * @param options
     * The options provided by the user.
     *
     * @param expected
     * A value indicating whether the php-script must be self-contained for passing the predicate.
     *
     * @param base
     * The base of the predicate.
     *
     * @returns
     * A predicate for checking whether the php-script is self-contained.
     */
    protected async GetSelfContainedPredicate(options: TComponentOptions, expected: boolean, base?: AsyncDynamicQuestionProperty<boolean, TComponentOptions>): Promise<boolean>
    {
        let result: boolean;

        if (typeof base === "function")
        {
            result = await base(options);
        }
        else
        {
            result = await base;
        }

        return (result ?? true) &&
            (options.SelfContained === expected);
    }
}
