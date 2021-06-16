import { GeneratorOptions, IComponentCollection, IFileMapping } from "@manuth/extended-yo-generator";
import { TSProjectPackageFileMapping, TSProjectSettingKey } from "@manuth/generator-ts-project";
import chalk = require("chalk");
import yosay = require("yosay");
import { IWoltLabGeneratorSettings } from "../../IWoltLabGeneratorSettings";
import { OptionsUnit } from "../../Units/OptionsUnit";
import { PHPScriptUnit } from "../../Units/PHPScriptUnit";
import { SQLScriptUnit } from "../../Units/SQLScriptUnit";
import { TemplateListenerUnit } from "../../Units/TemplateListenerUnit";
import { UserOptionsUnit } from "../../Units/UserOptionsUnit";
import { WoltLabGenerator } from "../../WoltLabGenerator";
import { WoltLabPackageFileMapping } from "../../WoltLabPackageFileMapping";
import { ACPTemplateComponent } from "../package/Components/ACPTemplateComponent";
import { BBCodeComponent } from "../package/Components/BBCodeComponent";
import { CronJobComponent } from "../package/Components/CronJobComponent";
import { EmojiComponent } from "../package/Components/EmojiComponent";
import { ErrorMessageComponent } from "../package/Components/ErrorMessageComponent";
import { EventListenerComponent } from "../package/Components/EventListenerComponent";
import { FileUploadComponent } from "../package/Components/FileUploadComponent";
import { GroupOptionComponent } from "../package/Components/GroupOptionComponent";
import { TemplateComponent } from "../package/Components/TemplateComponent";
import { TranslationComponent } from "../package/Components/TranslationComponent";
import { PackageContext } from "./PackageContext";

/**
 * Provides the functionality to generate WoltLab-packages.
 */
export class WoltLabPackageGenerator extends WoltLabGenerator<IWoltLabGeneratorSettings, GeneratorOptions>
{
    /**
     * @inheritdoc
     */
    public override get TemplateRoot(): string
    {
        return "app";
    }

    /**
     * @inheritdoc
     */
    public override get Components(): IComponentCollection<IWoltLabGeneratorSettings, GeneratorOptions>
    {
        return {
            Question: super.Components.Question,
            Categories: [
                {
                    DisplayName: "General",
                    Components: [
                        new FileUploadComponent(this) as any,
                        new PHPScriptUnit(this),
                        new SQLScriptUnit(this),
                        new CronJobComponent(this) as any
                    ]
                },
                {
                    DisplayName: "Globalization",
                    Components: [
                        new TranslationComponent(this) as any,
                        new ErrorMessageComponent(this) as any
                    ]
                },
                {
                    DisplayName: "Options",
                    Components: [
                        new OptionsUnit(this),
                        new UserOptionsUnit(this),
                        new GroupOptionComponent(this) as any
                    ]
                },
                {
                    DisplayName: "Customization",
                    Components: [
                        new EmojiComponent(this) as any,
                        new BBCodeComponent(this) as any,
                        new TemplateComponent(this) as any,
                        new ACPTemplateComponent(this) as any
                    ]
                },
                {
                    DisplayName: "Events",
                    Components: [
                        new EventListenerComponent(this) as any,
                        new TemplateListenerUnit(this)
                    ]
                }
            ]
        };
    }

    /**
     * @inheritdoc
     */
    public override get BaseFileMappings(): Array<IFileMapping<IWoltLabGeneratorSettings, GeneratorOptions>>
    {
        let result: Array<IFileMapping<IWoltLabGeneratorSettings, GeneratorOptions>> = [];

        for (let fileMapping of super.BaseFileMappings)
        {
            if (fileMapping instanceof TSProjectPackageFileMapping)
            {
                result.push(new WoltLabPackageFileMapping(this));
            }
            else
            {
                result.push(fileMapping);
            }
        }

        return result;
    }

    /**
     * @inheritdoc
     */
    public override get FileMappings(): Array<IFileMapping<IWoltLabGeneratorSettings, GeneratorOptions>>
    {
        return [
            ...super.FileMappings,
            {
                Source: this.templatePath("Package.ts.ejs"),
                Context: () =>
                {
                    let context = new PackageContext(this);

                    return {
                        Identifier: context.Identifier,
                        Name: context.Name,
                        DisplayName: context.DisplayName,
                        Author: context.Author,
                        HomePage: context.HomePage,
                        CreationDate: context.CreationDate,
                        Description: context.Description ?? "",
                        Instructions: context.Instructions ?? []
                    };
                },
                Destination: this.destinationPath(this.sourcePath("Package.ts"))
            },
            {
                Source: "README.md",
                Context: () => (
                    {
                        Name: this.Settings[TSProjectSettingKey.Name],
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
        let tsConfigFile = this.destinationPath("tsconfig.base.json");
        let tsConfig = this.fs.readJSON(tsConfigFile) as any;
        tsConfig.compilerOptions.lib ??= [];
        tsConfig.compilerOptions.lib.push("DOM");
        this.fs.writeJSON(tsConfigFile, tsConfig);
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
        this.config.save();
        this.log();
        this.log("Your package \"" + this.Settings[TSProjectSettingKey.DisplayName] + "\" has been created!");
        this.log();
        this.log("To start editing with Visual Studio Code, use following commands:");
        this.log();
        this.log("    cd \"" + this.Settings[TSProjectSettingKey.Destination] + "\"");
        this.log("    code .");
        this.log();
        this.log("Open wsc-package-quickstart.md inside the new package for further instructions on how to build it.");
    }
}
