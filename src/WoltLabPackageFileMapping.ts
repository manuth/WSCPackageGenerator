import { GeneratorOptions, IGenerator } from "@manuth/extended-yo-generator";
import { TSProjectPackageFileMapping } from "@manuth/generator-ts-project";
import { Package } from "@manuth/package-json-editor";
import { join } from "upath";
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
    public async LoadPackage(): Promise<Package>
    {
        let woltLabDependency = "@manuth/woltlab-compiler";
        let result = await super.LoadPackage();
        result.Author.Name ??= this.Generator.Settings[WoltLabSettingKey.Author];
        result.Author.URL ??= this.Generator.Settings[WoltLabSettingKey.HomePage];

        if (result.Dependencies.Has(woltLabDependency))
        {
            result.Dependencies.Remove(woltLabDependency);
        }

        result.Dependencies.Add(
            woltLabDependency,
            new Package(join(__dirname, "..", "package.json")).AllDependencies.Get(woltLabDependency));

        return result;
    }
}
