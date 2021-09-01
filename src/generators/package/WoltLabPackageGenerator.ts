import { ComponentCollection, FileMapping, FileMappingCollectionEditor, GeneratorOptions, IComponentCollection, IFileMapping } from "@manuth/extended-yo-generator";
import { JSONCConverter, JSONCCreatorMapping, TSConfigFileMapping, TSProjectCodeWorkspaceFolder, TSProjectGeneralCategory, TSProjectPackageFileMapping, TSProjectSettingKey } from "@manuth/generator-ts-project";
import chalk = require("chalk");
// eslint-disable-next-line node/no-unpublished-import
import { TSConfigJSON } from "types-tsconfig";
import yosay = require("yosay");
import { WoltLabCodeWorkspaceFolder } from "../../Components/WoltLabCodeWorkspaceFolder";
import { IWoltLabSettings } from "../../Settings/IWoltLabSettings";
import { WoltLabGenerator } from "../../WoltLabGenerator";
import { ACPTemplateComponent } from "./Components/ACPTemplateComponent";
import { BBCodeComponent } from "./Components/BBCodeComponent";
import { CronJobComponent } from "./Components/CronJobComponent";
import { EmojiComponent } from "./Components/EmojiComponent";
import { ErrorMessageComponent } from "./Components/ErrorMessageComponent";
import { EventListenerComponent } from "./Components/EventListenerComponent";
import { FileUploadComponent } from "./Components/FileUploadComponent";
import { GroupOptionComponent } from "./Components/GroupOptionComponent";
import { OptionComponent } from "./Components/OptionComponent";
import { PHPScriptComponent } from "./Components/PHPScriptComponent";
import { SQLScriptComponent } from "./Components/SQLScriptComponent";
import { TemplateComponent } from "./Components/TemplateComponent";
import { TemplateListenerComponent } from "./Components/TemplateListenerComponent";
import { ThemeInstructionComponent } from "./Components/ThemeInstructionComponent";
import { TranslationComponent } from "./Components/TranslationComponent";
import { UserOptionComponent } from "./Components/UserOptionComponent";
import { EntryPointFileMapping } from "./FileMappings/EntryPointFileMapping";
import { WoltLabNodePackageFileMapping } from "./FileMappings/WoltLabNodePackageFileMapping";
import { WoltLabPackageFileMapping } from "./FileMappings/WoltLabPackageFileMapping";

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
    protected override get BaseComponents(): ComponentCollection<TSettings, TOptions>
    {
        let result = super.BaseComponents as ComponentCollection<TSettings, TOptions>;

        result.Categories.Replace(
            TSProjectGeneralCategory,
            (category) =>
            {
                category.Components.ReplaceObject(
                    TSProjectCodeWorkspaceFolder,
                    (component) =>
                    {
                        return new WoltLabCodeWorkspaceFolder(this, component.Object as TSProjectCodeWorkspaceFolder<TSettings, TOptions>);
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
     * Gets the file-mapping for the entrypoint file.
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
        return super.cleanup();
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
