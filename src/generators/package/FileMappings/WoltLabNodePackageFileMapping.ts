import { GeneratorOptions, IGenerator } from "@manuth/extended-yo-generator";
import { IScriptMapping, TSProjectPackageFileMapping } from "@manuth/generator-ts-project";
import { Package } from "@manuth/package-json-editor";
import { Constants } from "../../../Core/Constants";
import { IWoltLabSettings } from "../../../Settings/IWoltLabSettings";
import { WoltLabSettingKey } from "../../../Settings/WoltLabSettingKey";

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
        let woltLabDependency = "@manuth/woltlab-compiler";
        let result = await super.LoadPackage();
        result.Main = "./lib/index.js";
        result.Types = "./lib/index.d.ts";
        result.Author.Name ??= this.Generator.Settings[WoltLabSettingKey.Author];
        result.Author.URL ??= this.Generator.Settings[WoltLabSettingKey.HomePage];

        if (result.Dependencies.Has(woltLabDependency))
        {
            result.Dependencies.Remove(woltLabDependency);
        }

        result.Dependencies.Add(woltLabDependency, Constants.Dependencies.Get(woltLabDependency));
        return result;
    }

    /**
     * @inheritdoc
     */
    protected override get MiscScripts(): Promise<Array<IScriptMapping<TSettings, TOptions>>>
    {
        let scripts = super.MiscScripts;

        return (
            async () =>
            {
                return [
                    ...await scripts,
                    {
                        Source: "build",
                        Destination: "package",
                        Processor: () =>
                        {
                            return "node .";
                        }
                    }
                ] as Array<IScriptMapping<TSettings, TOptions>>;
            })();
    }
}
