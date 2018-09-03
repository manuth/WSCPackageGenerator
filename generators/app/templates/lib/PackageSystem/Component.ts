import { ICompilable } from "../Core/Compilation/ICompilable";
import { IComponentOptions } from "./IComponentOptions";
import { Localizable } from "../GLobalization/Localizable";
import { Person } from "./Person";
import { isNullOrUndefined } from "util";

/**
 * Represents a component.
 */
export abstract class Component implements ICompilable
{
    /**
     * The name of the package.
     */
    private name: string;

    /**
     * The human-readabnle name of the component.
     */
    private displayName: Localizable = new Localizable();

    /**
     * The version of the component.
     */
    private version: string;

    /**
     * The author of the component.
     */
    private author: Person = new Person({
        Name: require("../../package.json").author.name,
        URL:  require("../../package.json").author.url 
    });

    /**
     * The creation-date of the component.
     */
    private creationDate: Date = new Date();

    /**
     * The description of the component.
     */
    private description: Localizable = new Localizable();

    /**
     * The license of the component.
     */
    private license: string = require("../../package.json").license;

    /**
     * Initializes a new instance of the `Component` class.
     */
    public constructor(options: IComponentOptions)
    {
        this.Name = options.Name;
        Object.assign(this.DisplayName, options.DisplayName);
        this.Version = options.Version;
        
        if (!isNullOrUndefined(options.Author))
        {
            this.Author = new Person(options.Author);
        }

        if (!isNullOrUndefined(options.CreationDate))
        {
            this.CreationDate = options.CreationDate;
        }

        if (!isNullOrUndefined(options.Description))
        {
            Object.assign(this.Description, options.Description);
        }

        if (!isNullOrUndefined(options.License))
        {
            this.License = options.License;
        }
    }

    /**
     * Gets or sets the name of the package.
     */
    public get Name()
    {
        return this.name;
    }

    public set Name(value)
    {
        this.name = value;
    }

    /**
     * Gets the human-readabnle name of the component.
     */
    public get DisplayName()
    {
        return this.displayName;
    }

    /**
     * Gets or sets the version of the component.
     */
    public get Version()
    {
        return this.version;
    }

    public set Version(value)
    {
        this.version = value;
    }

    /**
     * Gets or sets the author of the component.
     */
    public get Author()
    {
        return this.author;
    }

    public set Author(value)
    {
        this.author = value;
    }

    /**
     * Gets or sets the creation-date of the component.
     */
    public get CreationDate()
    {
        return this.creationDate;
    }

    public set CreationDate(value)
    {
        this.creationDate = value;
    }

    /**
     * Gets the description of the component.
     */
    public get Description()
    {
        return this.description;
    }

    public abstract get DestinationPath(): string;

    /**
     * Gets or sets the license of the component.
     */
    public get License()
    {
        return this.license;
    }

    public set License(value)
    {
        this.license = value;
    }
}