import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TSProjectSettingKey } from "@manuth/generator-ts-project";
import { dirname, join, normalize, parse, relative, sep } from "upath";
import { IWoltLabGeneratorSettings } from "../../IWoltLabGeneratorSettings";
import { WoltLabGenerator } from "../../WoltLabGenerator";
import { WoltLabSettingKey } from "../../WoltLabSettingKey";
import { WoltLabUnitName } from "../../WoltLabUnitName";

/**
 * Provides a context for copying the package-file.
 */
export class PackageContext
{
    /**
     * The generator.
     */
    private generator: WoltLabGenerator<IWoltLabGeneratorSettings, GeneratorOptions>;

    /**
     * Initializes a new instance of the `PackageContext` class.
     *
     * @param generator
     * The generator of the context.
     */
    public constructor(generator: WoltLabGenerator<IWoltLabGeneratorSettings, GeneratorOptions>)
    {
        this.generator = generator;
    }

    /**
     * Gets the generator.
     */
    protected get Generator(): WoltLabGenerator<IWoltLabGeneratorSettings, GeneratorOptions>
    {
        return this.generator;
    }

    /**
     * Gets the settings of the generator.
     */
    protected get Settings(): IWoltLabGeneratorSettings
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
            value = relative(this.Generator.destinationPath(this.Generator.metaPath()), value);
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

        let themeFormatter = (value: string): string =>
        {
            value = pathFormatter(value);
            let result = "...new ThemeInstructionCollection(join(__dirname";

            for (let segment of value.split(sep))
            {
                result += `, "${segment}"`;
            }

            result += "))";
            return result;
        };

        for (let component in this.Settings[WoltLabSettingKey.UnitPaths])
        {
            let formatter: typeof pathFormatter;
            let path = this.Settings[WoltLabSettingKey.UnitPaths][component as WoltLabUnitName];

            switch (component)
            {
                case WoltLabUnitName.Themes:
                    formatter = themeFormatter;
                    break;
                default:
                    formatter = requireFormatter;
                    break;
            }

            result.push(formatter(path));
        }

        return result;
    }
}
