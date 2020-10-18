import Path = require("path");
import UPath = require("upath");
import { Generator } from "../../Generator";
import { WoltLabGeneratorSetting } from "../../GeneratorSetting";
import { IWSCPackageSettings } from "./IWSCPackageSettings";
import { WSCPackageComponent } from "./WSCPackageComponent";
import { WSCPackageSetting } from "./WSCPackageSetting";

/**
 * Provides a context for copying the package-file.
 */
export class PackageContext
{
    /**
     * The generator.
     */
    private generator: Generator<IWSCPackageSettings>;

    /**
     * Initializes a new instance of the `PackageContext` class.
     *
     * @param generator
     * The generator of the context.
     */
    public constructor(generator: Generator<IWSCPackageSettings>)
    {
        this.generator = generator;
    }

    /**
     * Gets the generator.
     */
    protected get Generator(): Generator<IWSCPackageSettings>
    {
        return this.generator;
    }

    /**
     * Gets the settings of the generator.
     */
    protected get Settings(): IWSCPackageSettings
    {
        return this.Generator.Settings;
    }

    /**
     * Gets the identifier.
     */
    public get Identifier(): string
    {
        return this.Settings[WSCPackageSetting.Identifier];
    }

    /**
     * Gets the name.
     */
    public get Name(): string
    {
        return this.Settings[WSCPackageSetting.Name];
    }

    /**
     * Gets the human-readable name.
     */
    public get DisplayName(): string
    {
        return this.Settings[WSCPackageSetting.DisplayName];
    }

    /**
     * Gets the author.
     */
    public get Author(): string
    {
        return this.Settings[WSCPackageSetting.Author];
    }

    /**
     * Gets the home-page of the author.
     */
    public get HomePage(): string
    {
        return this.Settings[WSCPackageSetting.HomePage];
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
        return this.Settings[WSCPackageSetting.Description];
    }

    /**
     * Gets the instructions.
     */
    public get Instructions(): string[]
    {
        let result: string[] = [];

        let pathFormatter = (value: string): string =>
        {
            value = Path.relative(this.Generator.destinationPath(this.Generator.metaPath()), value);
            value = UPath.normalize(value);
            return value;
        };

        let requireFormatter = (value: string): string =>
        {
            value = pathFormatter(value);
            value = UPath.join(UPath.dirname(value), UPath.parse(value).name);

            if (!value.startsWith("."))
            {
                value = `./${value}`;
            }

            return `require("${value}")`;
        };

        let themeFormatter = (value: string): string =>
        {
            value = pathFormatter(value);
            let result = "...new ThemeInstructionCollection(Path.join(__dirname";

            for (let segment of value.split(Path.posix.sep))
            {
                result += `, "${segment}"`;
            }

            result += "))";
            return result;
        };

        for (let component in this.Settings[WoltLabGeneratorSetting.ComponentPaths])
        {
            let formatter: typeof pathFormatter;
            let path = this.Settings[WoltLabGeneratorSetting.ComponentPaths][component];

            switch (component)
            {
                case WSCPackageComponent.Themes:
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
