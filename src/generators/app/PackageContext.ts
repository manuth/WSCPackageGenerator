import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TSProjectSettingKey } from "@manuth/generator-ts-project";
import { dirname, join, normalize, parse, relative } from "upath";
import { IWoltLabSettings } from "../../Settings/IWoltLabSettings";
import { WoltLabComponentKey } from "../../Settings/WoltLabComponentKey";
import { WoltLabSettingKey } from "../../Settings/WoltLabSettingKey";
import { WoltLabGenerator } from "../../WoltLabGenerator";
import { WoltLabUnitName } from "../../WoltLabUnitName";

/**
 * Provides a context for copying the package-file.
 */
export class PackageContext
{
    /**
     * The generator.
     */
    private generator: WoltLabGenerator<IWoltLabSettings, GeneratorOptions>;

    /**
     * Initializes a new instance of the {@link PackageContext `PackageContext`} class.
     *
     * @param generator
     * The generator of the context.
     */
    public constructor(generator: WoltLabGenerator<IWoltLabSettings, GeneratorOptions>)
    {
        this.generator = generator;
    }

    /**
     * Gets the generator.
     */
    protected get Generator(): WoltLabGenerator<IWoltLabSettings, GeneratorOptions>
    {
        return this.generator;
    }

    /**
     * Gets the settings of the generator.
     */
    protected get Settings(): IWoltLabSettings
    {
        return this.Generator.Settings;
    }

    /**
     * Gets the identifier.
     */
    public get Identifier(): string
    {
        return this.Settings[WoltLabSettingKey.Identifier];
    }

    /**
     * Gets the name.
     */
    public get Name(): string
    {
        return this.Settings[TSProjectSettingKey.Name];
    }

    /**
     * Gets the human-readable name.
     */
    public get DisplayName(): string
    {
        return this.Settings[TSProjectSettingKey.DisplayName];
    }

    /**
     * Gets the author.
     */
    public get Author(): string
    {
        return this.Settings[WoltLabSettingKey.Author];
    }

    /**
     * Gets the home-page of the author.
     */
    public get HomePage(): string
    {
        return this.Settings[WoltLabSettingKey.HomePage];
    }

    /**
     * Gets the creation-date.
     */
    public get CreationDate(): string
    {
        let date = new Date();
        return `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(2, "0")}-${`${date.getDate()}`.padStart(2, "0")}`;
    }

    /**
     * Gets the description.
     */
    public get Description(): string
    {
        return this.Settings[TSProjectSettingKey.Description];
    }

    /**
     * Gets the instructions.
     */
    public get Instructions(): string[]
    {
        let result: string[] = [];

        let pathFormatter = (value: string): string =>
        {
            value = relative(this.Generator.destinationPath(this.Generator.sourcePath()), value);
            value = normalize(value);
            return value;
        };

        let requireFormatter = (value: string): string =>
        {
            value = pathFormatter(value);
            value = join(dirname(value), parse(value).name);

            if (!value.startsWith("."))
            {
                value = `./${value}`;
            }

            return `require("${value}")`;
        };

        for (let component in this.Settings[WoltLabSettingKey.ComponentOptions])
        {
            let formatter: typeof pathFormatter;
            let path = this.Settings[WoltLabSettingKey.ComponentOptions][component as WoltLabUnitName][WoltLabComponentKey.Path];

            switch (component)
            {
                default:
                    formatter = requireFormatter;
                    break;
            }

            result.push(formatter(path));
        }

        return result;
    }
}
