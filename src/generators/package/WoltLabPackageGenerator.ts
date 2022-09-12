import { ComponentCollection, FileMapping, FileMappingCollectionEditor, GeneratorOptions, IComponentCollection, IFileMapping } from "@manuth/extended-yo-generator";
import { ITSProjectSettings, JSONCConverter, JSONCCreatorMapping, TSConfigFileMapping, TSProjectCodeWorkspaceFolder, TSProjectGeneralCategory, TSProjectPackageFileMapping, TSProjectSettingKey } from "@manuth/generator-ts-project";
import chalk from "chalk";
// eslint-disable-next-line node/no-unpublished-import
import type { TSConfigJSON } from "types-tsconfig";
import yosay from "yosay";
import { WoltLabCodeWorkspaceFolder } from "../../Components/WoltLabCodeWorkspaceFolder.js";
import { IWoltLabSettings } from "../../Settings/IWoltLabSettings.js";
import { WoltLabGenerator } from "../../WoltLabGenerator.js";
import { ACPTemplateComponent } from "./Components/ACPTemplateComponent.js";
import { BBCodeComponent } from "./Components/BBCodeComponent.js";
import { CronJobComponent } from "./Components/CronJobComponent.js";
import { EmojiComponent } from "./Components/EmojiComponent.js";
import { ErrorMessageComponent } from "./Components/ErrorMessageComponent.js";
import { EventListenerComponent } from "./Components/EventListenerComponent.js";
import { FileUploadComponent } from "./Components/FileUploadComponent.js";
import { GroupOptionComponent } from "./Components/GroupOptionComponent.js";
import { OptionComponent } from "./Components/OptionComponent.js";
import { PHPScriptComponent } from "./Components/PHPScriptComponent.js";
import { SQLScriptComponent } from "./Components/SQLScriptComponent.js";
import { TemplateComponent } from "./Components/TemplateComponent.js";
import { TemplateListenerComponent } from "./Components/TemplateListenerComponent.js";
import { ThemeInstructionComponent } from "./Components/ThemeInstructionComponent.js";
import { TranslationComponent } from "./Components/TranslationComponent.js";
import { UserOptionComponent } from "./Components/UserOptionComponent.js";
import { EntryPointFileMapping } from "./FileMappings/EntryPointFileMapping.js";
import { WoltLabNodePackageFileMapping } from "./FileMappings/WoltLabNodePackageFileMapping.js";
import { WoltLabPackageFileMapping } from "./FileMappings/WoltLabPackageFileMapping.js";

/**
 * Provides the functionality to generate WoltLab-packages.
 *
 * @template TSettings
 * The type of the generator-settings.
 *
 * @template TOptions
 * The type of the generator-options.
 */
export class WoltLabPackageGenerator<TSettings extends IWoltLabSettings = IWoltLabSettings, TOptions extends GeneratorOptions = GeneratorOptions> extends WoltLabGenerator<TSettings, TOptions>
{
    /**
     * @inheritdoc
     */
    public override get TemplateRoot(): string
    {
        return "package";
    }

    /**
     * @inheritdoc
     */
    public override get Components(): IComponentCollection<TSettings, TOptions>
    {
        return {
            Question: super.Components.Question,
            Categories: [
                ...super.Components.Categories,
                {
                    DisplayName: "Globalization",
                    Components: [
                        new TranslationComponent(this),
                        new ErrorMessageComponent(this)
                    ]
                },
                {
                    DisplayName: "Options",
                    Components: [
                        new OptionComponent(this),
                        new UserOptionComponent(this),
                        new GroupOptionComponent(this)
                    ]
                },
                {
                    DisplayName: "Customization",
                    Components: [
                        new EmojiComponent(this),
                        new BBCodeComponent(this),
                        new TemplateComponent(this),
                        new ACPTemplateComponent(this),
                        new ThemeInstructionComponent(this)
                    ]
                },
                {
                    DisplayName: "Events",
                    Components: [
                        new EventListenerComponent(this),
                        new TemplateListenerComponent(this)
                    ]
                }
            ]
        };
    }

    /**
     * @inheritdoc
     */
    protected override get BaseComponents(): ComponentCollection<ITSProjectSettings, GeneratorOptions>
    {
        let result = super.BaseComponents;

        result.Categories.Replace(
            TSProjectGeneralCategory,
            (category) =>
            {
                category.Components.ReplaceObject(
                    TSProjectCodeWorkspaceFolder,
                    (component) =>
                    {
                        return new WoltLabCodeWorkspaceFolder(this, component.Object as TSProjectCodeWorkspaceFolder<ITSProjectSettings, GeneratorOptions>);
                    });

                category.Components.AddRange(
                    [
                        new FileUploadComponent(this),
                        new PHPScriptComponent(this),
                        new SQLScriptComponent(this),
                        new CronJobComponent(this)
                    ]);

                return category;
            });

        return result;
    }

    /**
     * @inheritdoc
     */
    protected override get BaseFileMappings(): FileMappingCollectionEditor
    {
        let result = super.BaseFileMappings;
        result.Remove((fileMapping: FileMapping<any, any>) => fileMapping.Destination === this.destinationPath(this.SourceRoot, "tests", TSConfigFileMapping.FileName));
        result.Remove((fileMapping: FileMapping<any, any>) => fileMapping.Destination === this.destinationPath(".mocharc.jsonc"));
        result.Replace(TSProjectPackageFileMapping, new WoltLabNodePackageFileMapping(this));

        result.ReplaceObject(
            (fileMapping: FileMapping<any, any>) => fileMapping.Destination === this.destinationPath(TSConfigFileMapping.GetFileName("build")),
            (fileMapping) =>
            {
                return {
                    Source: fileMapping.Source,
                    Destination: fileMapping.Destination,
                    Processor: async (target, generator) =>
                    {
                        await fileMapping.Processor();
                        let tsConfig: TSConfigJSON = new JSONCConverter().Parse(generator.fs.read(target.Destination));

                        tsConfig.references = [
                            {
                                path: "."
                            }
                        ];

                        return new JSONCCreatorMapping(generator, target.Destination, tsConfig).Processor();
                    }
                };
            });

        result.ReplaceObject(
            (fileMapping: FileMapping<any, any>) => fileMapping.Destination === this.destinationPath(TSConfigFileMapping.FileName),
            (fileMapping) =>
            {
                return {
                    Source: fileMapping.Source,
                    Destination: fileMapping.Destination,
                    Processor: async (target, generator) =>
                    {
                        await fileMapping.Processor();
                        let tsConfig: TSConfigJSON = new JSONCConverter().Parse(generator.fs.read(target.Destination));
                        delete tsConfig.compilerOptions.outDir;
                        delete tsConfig.exclude;
                        tsConfig.compilerOptions.noEmit = true;
                        return new JSONCCreatorMapping(generator, target.Destination, tsConfig).Processor();
                    }
                };
            });

        return result;
    }

    /**
     * Gets the file-mapping for the woltlab-package.
     */
    public get WoltLabPackageFileMapping(): WoltLabPackageFileMapping<TSettings, TOptions>
    {
        return new WoltLabPackageFileMapping<TSettings, TOptions>(this);
    }

    /**
     * Gets the file-mapping for the entry-point file.
     */
    public get EntryPointFileMapping(): EntryPointFileMapping<TSettings, TOptions>
    {
        return new EntryPointFileMapping(this);
    }

    /**
     * @inheritdoc
     */
    public override get FileMappings(): Array<IFileMapping<TSettings, TOptions>>
    {
        return [
            ...super.FileMappings,
            this.WoltLabPackageFileMapping,
            this.EntryPointFileMapping,
            {
                Source: "README.md",
                Context: () => (
                    {
                        Name: this.Settings[TSProjectSettingKey.DisplayName],
                        Description: this.Settings[TSProjectSettingKey.Description]
                    }),
                Destination: "README.md"
            },
            {
                Source: "wsc-package-quickstart.md",
                Destination: "wsc-package-quickstart.md"
            }
        ];
    }

    /**
     * @inheritdoc
     */
    public override prompting(): Promise<void>
    {
        this.log(yosay(`Welcome to the ${chalk.whiteBright("WoltLab Suite Core Package")} generator!`));
        return super.prompting();
    }

    /**
     * @inheritdoc
     */
    public override async writing(): Promise<void>
    {
        await super.writing();
    }

    /**
     * @inheritdoc
     */
    public override async install(): Promise<void>
    {
        return super.install();
    }

    /**
     * @inheritdoc
     */
    public override async cleanup(): Promise<void>
    {
        return this.Base.cleanup();
    }

    /**
     * @inheritdoc
     */
    public override async end(): Promise<void>
    {
        await super.end();
        this.log();
        this.log("Open `wsc-package-quickstart.md` inside the new package for further instructions on how to build it.");
    }
}
