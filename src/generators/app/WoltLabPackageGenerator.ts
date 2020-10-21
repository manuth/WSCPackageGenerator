import { GeneratorOptions, GeneratorSettingKey, IComponentCollection, IFileMapping } from "@manuth/extended-yo-generator";
import { TSProjectPackageFileMapping, TSProjectSettingKey } from "@manuth/generator-ts-project";
import chalk = require("chalk");
import { relative } from "upath";
import yosay = require("yosay");
import { IWoltLabGeneratorSettings } from "../../IWoltLabGeneratorSettings";
import { ACPTenplateUnit } from "../../Units/ACPTemplateUnit";
import { BBCodeUnit } from "../../Units/BBCodeUnit";
import { EmojiUnit } from "../../Units/EmojiUnit";
import { ErrorMessageUnit } from "../../Units/ErrorMessageUnit";
import { EventListenerUnit } from "../../Units/EventListenerUnit";
import { FileUploadUnit } from "../../Units/FileUploadUnit";
import { GroupOptionsUnit } from "../../Units/GroupOptionsUnit";
import { OptionsUnit } from "../../Units/OptionsUnit";
import { PHPScriptUnit } from "../../Units/PHPScriptUnit";
import { SQLScriptUnit } from "../../Units/SQLScriptUnit";
import { TemplateListenerUnit } from "../../Units/TemplateListenerUnit";
import { TemplateUnit } from "../../Units/TemplateUnit";
import { ThemeUnit } from "../../Units/ThemeUnit";
import { TranslationUnit } from "../../Units/TranslationUnit";
import { UserOptionsUnit } from "../../Units/UserOptionsUnit";
import { WoltLabGenerator } from "../../WoltLabGenerator";
import { WoltLabPackageFileMapping } from "../../WoltLabPackageFileMapping";
import { WoltLabSettingKey } from "../../WoltLabSettingKey";
import { WoltLabUnitName } from "../../WoltLabUnitName";
import { PackageContext } from "./PackageContext";

/**
 * Provides the functionality to generate WoltLab-packages.
 */
export class WoltLabPackageGenerator extends WoltLabGenerator<IWoltLabGeneratorSettings, GeneratorOptions>
{
    /**
     * @inheritdoc
     */
    public get TemplateRoot(): string
    {
        return "app";
    }

    /**
     * @inheritdoc
     */
    public get Components(): IComponentCollection<IWoltLabGeneratorSettings, GeneratorOptions>
    {
        return {
            Question: super.Components.Question,
            Categories: [
                {
                    DisplayName: "General",
                    Components: [
                        new FileUploadUnit(this),
                        new PHPScriptUnit(this),
                        new SQLScriptUnit(this)
                    ]
                },
                {
                    DisplayName: "Globalization",
                    Components: [
                        new TranslationUnit(this),
                        new ErrorMessageUnit(this)
                    ]
                },
                {
                    DisplayName: "Options",
                    Components: [
                        new OptionsUnit(this),
                        new UserOptionsUnit(this),
                        new GroupOptionsUnit(this)
                    ]
                },
                {
                    DisplayName: "Customization",
                    Components: [
                        new ThemeUnit(this),
                        new EmojiUnit(this),
                        new BBCodeUnit(this),
                        new TemplateUnit(this),
                        new ACPTenplateUnit(this)
                    ]
                },
                {
                    DisplayName: "Events",
                    Components: [
                        new EventListenerUnit(this),
                        new TemplateListenerUnit(this)
                    ]
                }
            ]
        };
    }

    /**
     * @inheritdoc
     */
    public get BaseFileMappings(): Array<IFileMapping<IWoltLabGeneratorSettings, GeneratorOptions>>
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
    public get FileMappings(): Array<IFileMapping<IWoltLabGeneratorSettings, GeneratorOptions>>
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
                Destination: this.destinationPath(this.metaPath("Package.ts"))
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
    public prompting(): Promise<void>
    {
        this.log(yosay(`Welcome to the ${chalk.whiteBright("WoltLab Suite Core Package")} generator!`));
        return super.prompting();
    }

    /**
     * @inheritdoc
     */
    public async writing(): Promise<void>
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
    public async install(): Promise<void>
    {
        return super.install();
    }

    /**
     * @inheritdoc
     */
    public async cleanup(): Promise<void>
    {
        return super.cleanup();
    }

    /**
     * @inheritdoc
     */
    public async end(): Promise<void>
    {
        await super.end();

        if (this.Settings[GeneratorSettingKey.Components].includes(WoltLabUnitName.Themes))
        {
            this.config.set(WoltLabUnitName.Themes, relative(this.destinationPath(this.sourcePath()), this.destinationPath(this.sourcePath(this.Settings[WoltLabSettingKey.UnitPaths][WoltLabUnitName.Themes]))));
        }

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
