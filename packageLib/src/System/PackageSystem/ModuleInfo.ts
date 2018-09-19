import * as FileSystem from "fs-extra";
import * as Path from "path";
import { Person } from "./Person";

/**
 * Provides information about the npm-module.
 */
export class ModuleInfo
{
    /**
     * The name of the module.
     */
    private name: string = null;

    /**
     * The author of the module.
     */
    private author: Person = null;

    /**
     * The license of the module.
     */
    private license: string = null;

    /**
     * The version of the module.
     */
    private version: string = null;

    /**
     * Initializes a new instance of the `ModuleInfo` class.
     */
    public constructor()
    {
        let packagePath: string = Path.join(__dirname, "..", "..", "..", "package.json");

        if (FileSystem.existsSync(packagePath))
        {
            let $package: any = require(packagePath);

            if ($package.name)
            {
                this.name = $package.name;
            }

            if ($package.author)
            {
                if (typeof $package.author === "string")
                {
                    this.author = new Person({
                        Name: $package.author
                    });
                }
                else
                {
                    this.author = new Person({
                        Name: $package.author.name,
                        URL: $package.author.url
                    });
                }
            }

            if ($package.license)
            {
                this.license = $package.license;
            }

            if ($package.version)
            {
                this.version = $package.version;
            }
        }
    }

    /**
     * Gets the name of the module.
     */
    public get Name(): string
    {
        return this.name;
    }

    /**
     * Gets the author of the module.
     */
    public get Author(): Person
    {
        return this.author;
    }

    /**
     * Gets the license of the module.
     */
    public get License(): string
    {
        return this.license;
    }

    /**
     * Gets the version of the module.
     */
    public get Version(): string
    {
        return this.version;
    }
}