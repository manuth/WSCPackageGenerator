import { GeneratorOptions, IGenerator } from "@manuth/extended-yo-generator";
import { TSProjectPackageFileMapping } from "@manuth/generator-ts-project";
import { Package } from "@manuth/package-json-editor";
import { Constants } from "./Core/Constants";
import { IWoltLabGeneratorSettings } from "./IWoltLabGeneratorSettings";
import { WoltLabSettingKey } from "./WoltLabSettingKey";

/**
 * Provides the functionality to create a `package.json`-file for woltlab-components.
 */
export class WoltLabPackageFileMapping<TSettings extends IWoltLabGeneratorSettings, TOptions extends GeneratorOptions> extends TSProjectPackageFileMapping<TSettings, TOptions>
{
    /**
     * Initializes a new instance of the `WoltLabPackageFileMapping` class.
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
        result.Author.Name ??= this.Generator.Settings[WoltLabSettingKey.Author];
        result.Author.URL ??= this.Generator.Settings[WoltLabSettingKey.HomePage];

        if (result.Dependencies.Has(woltLabDependency))
        {
            result.Dependencies.Remove(woltLabDependency);
        }

        result.Dependencies.Add(woltLabDependency, Constants.Dependencies.Get(woltLabDependency));
        return result;
    }
}
