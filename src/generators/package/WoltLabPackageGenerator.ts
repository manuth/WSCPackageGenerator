import { ComponentCollection, FileMapping, FileMappingCollectionEditor, GeneratorOptions, IComponentCollection, IFileMapping, ObjectCollectionEditor } from "@manuth/extended-yo-generator";
import { ITSProjectSettings, JSONCConverter, JSONCCreatorMapping, TSConfigFileMapping, TSProjectCodeWorkspaceFolder, TSProjectGeneralCategory, TSProjectPackageFileMapping, TSProjectSettingKey } from "@manuth/generator-ts-project";
import chalk from "chalk";
// eslint-disable-next-line node/no-unpublished-import
import type { TSConfigJSON } from "types-tsconfig";
import path from "upath";
import yosay from "yosay";
import { InstructionComponent } from "../../Components/InstructionComponent.js";
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

const { join, normalize } = path;

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
     * Gets all {@see InstructionComponent `InstructionComponent<TSettings, TOptions, TComponentOptions>`} provided by this generator.
     */
    public get InstructionComponents(): Array<InstructionComponent<TSettings, TOptions, any>>
    {
        return [
            new FileUploadComponent(this),
            new PHPScriptComponent(this),
            new SQLScriptComponent(this),
            new CronJobComponent(this),
            new TranslationComponent(this),
            new ErrorMessageComponent(this),
            new OptionComponent(this),
            new UserOptionComponent(this),
            new GroupOptionComponent(this),
            new EmojiComponent(this),
            new BBCodeComponent(this),
            new TemplateComponent(this),
            new ACPTemplateComponent(this),
            new ThemeInstructionComponent(this),
            new EventListenerComponent(this),
            new TemplateListenerComponent(this)
        ];
    }

    /**
     * Gets a collection containing all {@see InstructionComponent `InstructionComponent<TSettings, TOptions, TComponentOptions>`} provided by this generator.
     */
    public get InstructionComponentCollection(): ObjectCollectionEditor<InstructionComponent<TSettings, TOptions, any>>
    {
        return new ObjectCollectionEditor(this.InstructionComponents);
    }

    /**
     * @inheritdoc
     */
    public override get Components(): IComponentCollection<TSettings, TOptions>
    {
        let components = this.InstructionComponentCollection;

        return {
            Question: super.Components.Question,
            Categories: [
                ...super.Components.Categories,
                {
                    DisplayName: "Globalization",
                    Components: [
                        components.Get(TranslationComponent),
                        components.Get(ErrorMessageComponent)
                    ]
                },
                {
                    DisplayName: "Options",
                    Components: [
                        components.Get(OptionComponent),
                        components.Get(UserOptionComponent),
                        components.Get(GroupOptionComponent)
                    ]
                },
                {
                    DisplayName: "Customization",
                    Components: [
                        components.Get(EmojiComponent),
                        components.Get(BBCodeComponent),
                        components.Get(TemplateComponent),
                        components.Get(ACPTemplateComponent),
                        components.Get(ThemeInstructionComponent)
                    ]
                },
                {
                    DisplayName: "Events",
                    Components: [
                        components.Get(EventListenerComponent),
                        components.Get(TemplateListenerComponent)
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
        let components = this.InstructionComponentCollection;

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
                        components.Get(FileUploadComponent),
                        components.Get(PHPScriptComponent),
                        components.Get(SQLScriptComponent),
                        components.Get(CronJobComponent)
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

                        tsConfig.references = tsConfig.references.filter(
                            (reference) =>
                            {
                                return !normalize(reference.path).startsWith(join("src", "tests", "."));
                            });

                        return new JSONCCreatorMapping(generator, target.Destination, tsConfig).Processor();
                    }
                };
            });

        result.ReplaceObject(
            (fileMapping: FileMapping<any, any>) => fileMapping.Destination === this.destinationPath(TSConfigFileMapping.GetFileName("app")),
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
        return super.writing();
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
