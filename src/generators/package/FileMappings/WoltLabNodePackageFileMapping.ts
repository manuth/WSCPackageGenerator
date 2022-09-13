import { GeneratorOptions, IGenerator } from "@manuth/extended-yo-generator";
import { IScriptMapping, ScriptMapping, TSProjectPackageFileMapping, TSProjectSettingKey } from "@manuth/generator-ts-project";
import { Package } from "@manuth/package-json-editor";
import { IWoltLabSettings } from "../../../Settings/IWoltLabSettings.js";
import { WoltLabSettingKey } from "../../../Settings/WoltLabSettingKey.js";
import { WoltLabDependencyCollection } from "./WoltLabDependencyCollection.js";

/**
 * Provides the functionality to create a `package.json`-file for woltlab-components.
 *
 * @template TSettings
 * The type of the generator-settings.
 *
 * @template TOptions
 * The type of the generator-options.
 */
export class WoltLabNodePackageFileMapping<TSettings extends IWoltLabSettings, TOptions extends GeneratorOptions> extends TSProjectPackageFileMapping<TSettings, TOptions>
{
    /**
     * Initializes a new instance of the {@link WoltLabNodePackageFileMapping `WoltLabNodePackageFileMapping<TSettings, TOptions>`} class.
     *
     * @param generator
     * The generator of the file-mapping.
     */
    public constructor(generator: IGenerator<TSettings, TOptions>)
    {
        super(generator);
    }

    /**
     * @inheritdoc
     *
     * @returns
     * The loaded package.
     */
    public override async LoadPackage(): Promise<Package>
    {
        let result = await super.LoadPackage();
        result.Main = undefined;
        result.Types = undefined;
        result.Author.Name ??= this.Generator.Settings[WoltLabSettingKey.Author];
        result.Author.URL ??= this.Generator.Settings[WoltLabSettingKey.HomePage];
        result.PublishConfig = {};
        result.Files = [];
        result.Register(new WoltLabDependencyCollection(this.Generator.Settings[TSProjectSettingKey.ESModule]), true);
        result.DevelopmentDependencies.Remove("mocha");
        result.DevelopmentDependencies.Remove("@types/mocha");
        result.DevelopmentDependencies.Remove("source-map-support");
        return result;
    }

    /**
     * @inheritdoc
     */
    public override get TypeScriptScripts(): Array<string | IScriptMapping<TSettings, TOptions>>
    {
        return super.TypeScriptScripts.filter(
            (script) =>
            {
                return ![
                    "rebuild",
                    "build",
                    "watch",
                    "clean"
                ].includes(new ScriptMapping(this.Generator, this.ScriptSource, script).Destination);
            });
    }

    /**
     * @inheritdoc
     */
    public override get MiscScripts(): Array<IScriptMapping<TSettings, TOptions>>
    {
        let baseScripts = super.MiscScripts.filter(
            (script) =>
            {
                return ![
                    "prepare",
                    "test"
                ].includes(new ScriptMapping(this.Generator, this.ScriptSource, script).Destination);
            });

        return [
            ...baseScripts,
            {
                Destination: "package",
                Processor: () =>
                {
                    let executableName = "ts-node";

                    if (this.Generator.Settings[TSProjectSettingKey.ESModule])
                    {
                        executableName += "-esm";
                    }

                    return `${executableName} ./src/index.ts`;
                }
            }
        ] as Array<IScriptMapping<TSettings, TOptions>>;
    }
}
