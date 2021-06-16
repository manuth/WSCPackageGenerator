import { GeneratorOptions, IComponentCollection, IFileMapping } from "@manuth/extended-yo-generator";
import { TSProjectPackageFileMapping, TSProjectSettingKey } from "@manuth/generator-ts-project";
import chalk = require("chalk");
import yosay = require("yosay");
import { WoltLabPackageFileMapping } from "../../FileMappings/WoltLabPackageFileMapping";
import { IWoltLabSettings } from "../../Settings/IWoltLabSettings";
import { WoltLabGenerator } from "../../WoltLabGenerator";
import { ACPTemplateComponent } from "../package/Components/ACPTemplateComponent";
import { BBCodeComponent } from "../package/Components/BBCodeComponent";
import { CronJobComponent } from "../package/Components/CronJobComponent";
import { EmojiComponent } from "../package/Components/EmojiComponent";
import { ErrorMessageComponent } from "../package/Components/ErrorMessageComponent";
import { EventListenerComponent } from "../package/Components/EventListenerComponent";
import { FileUploadComponent } from "../package/Components/FileUploadComponent";
import { GroupOptionComponent } from "../package/Components/GroupOptionComponent";
import { OptionComponent } from "../package/Components/OptionComponent";
import { PHPScriptComponent } from "../package/Components/PHPScriptComponent";
import { SQLScriptComponent } from "../package/Components/SQLScriptComponent";
import { TemplateComponent } from "../package/Components/TemplateComponent";
import { TemplateListenerComponent } from "../package/Components/TemplateListenerComponent";
import { TranslationComponent } from "../package/Components/TranslationComponent";
import { UserOptionComponent } from "../package/Components/UserOptionComponent";
import { PackageContext } from "./PackageContext";

/**
 * Provides the functionality to generate WoltLab-packages.
 */
export class WoltLabPackageGenerator extends WoltLabGenerator<IWoltLabSettings, GeneratorOptions>
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
    public override get Components(): IComponentCollection<IWoltLabSettings, GeneratorOptions>
    {
        return {
            Question: super.Components.Question,
            Categories: [
                {
                    DisplayName: "General",
                    Components: [
                        new FileUploadComponent(this),
                        new PHPScriptComponent(this),
                        new SQLScriptComponent(this),
                        new CronJobComponent(this)
                    ]
                },
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
                        new ACPTemplateComponent(this)
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
    public override get BaseFileMappings(): Array<IFileMapping<IWoltLabSettings, GeneratorOptions>>
    {
        let result: Array<IFileMapping<IWoltLabSettings, GeneratorOptions>> = [];

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
    public override get FileMappings(): Array<IFileMapping<IWoltLabSettings, GeneratorOptions>>
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
