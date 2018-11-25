import Path = require("path");
import { Generator } from "../../Generator";
import { GeneratorSetting } from "../../GeneratorSetting";
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
     * @param settings
     * The settings of the generator.
     */
    public constructor(generator: Generator<IWSCPackageSettings>)
    {
        this.generator = generator;
    }

    /**
     * Gets the generator.
     */
    protected get Generator()
    {
        return this.generator;
    }

    /**
     * Gets the settings of the generator.
     */
    protected get Settings()
    {
        return this.Generator.Settings;
    }

    /**
     * Gets the identifier.
     */
    public get Identifier()
    {
        return this.Settings[WSCPackageSetting.Identifier];
    }

    /**
     * Gets the name.
     */
    public get Name()
    {
        return this.Settings[WSCPackageSetting.Name];
    }

    /**
     * Gets the human-readable name.
     */
    public get DisplayName()
    {
        return this.Settings[WSCPackageSetting.DisplayName];
    }

    /**
     * Gets the author.
     */
    public get Author()
    {
        return this.Settings[WSCPackageSetting.Author];
    }

    /**
     * Gets the home-page of the author.
     */
    public get HomePage()
    {
        return this.Settings[WSCPackageSetting.HomePage];
    }

    /**
     * Gets the creation-date.
     */
    public get CreationDate()
    {
        let date = new Date();
        return `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(2, "0")}-${`${date.getDate()}`.padStart(2, "0")}`;
    }

    /**
     * Gets the description.
     */
    public get Description()
    {
        return this.Settings[WSCPackageSetting.Description];
    }

    /**
     * Gets the instructions.
     */
    public get Instructions()
    {
        let result: string[] = [];

        let pathFormatter = (value: string) =>
        {
            value = Path.relative(this.Generator.destinationPath(this.Generator.metaPath()), value);
            value = value.split(Path.sep).join(Path.posix.sep);
            return value;
        };

        let requireFormatter = (value: string) =>
        {
            value = pathFormatter(value);
            value = Path.posix.join(Path.posix.dirname(value), Path.posix.parse(value).name);

            if (!value.startsWith("."))
            {
                value = `./${value}`;
            }

            return `require("${value}")`;
        };

        let commentedFormatter = (value: string) =>
        {
            return `// ${requireFormatter(value)}`;
        };

        let themeFormatter = (value: string) =>
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

        for (let component in this.Settings[GeneratorSetting.ComponentSourceFiles])
        {
            let formatter: typeof pathFormatter;
            let path = this.Settings[GeneratorSetting.ComponentSourceFiles][component];

            switch (component)
            {
                case WSCPackageComponent.Themes:
                    formatter = themeFormatter;
                    break;
                case WSCPackageComponent.Files:
                case WSCPackageComponent.PHPScript:
                case WSCPackageComponent.SQLScript:
                case WSCPackageComponent.Templates:
                case WSCPackageComponent.ACPTemplates:
                    formatter = commentedFormatter;
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