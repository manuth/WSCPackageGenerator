import { isNullOrUndefined } from "util";
import { Localization } from "../Globalization/Localization";
import { IComponentOptions } from "./IComponentOptions";
import { Person } from "./Person";

/**
 * Represents a component.
 */
export abstract class Component
{
    /**
     * The name of the package.
     */
    private name: string;

    /**
     * The human-readable name of the component.
     */
    private displayName: Localization = new Localization();

    /**
     * The version of the component.
     */
    private version: string;

    /**
     * The author of the component.
     */
    private author: Person = null;

    /**
     * The creation-date of the component.
     */
    private creationDate: Date = new Date();

    /**
     * The description of the component.
     */
    private description: Localization = new Localization();

    /**
     * The license of the component.
     */
    private license: string = null;

    /**
     * Initializes a new instance of the `Component` class.
     */
    public constructor(options: IComponentOptions)
    {
        this.Name = options.Name;
        this.DisplayName.Data = options.DisplayName;
        this.Version = options.Version;

        if (!isNullOrUndefined(options.Author))
        {
            this.author = new Person(options.Author);
        }

        if (!isNullOrUndefined(options.CreationDate))
        {
            this.CreationDate = options.CreationDate;
        }

        if (!isNullOrUndefined(options.Description))
        {
            this.Description.Data = options.Description;
        }

        if (!isNullOrUndefined(options.License))
        {
            this.License = options.License;
        }
    }

    /**
     * Gets or sets the name of the package.
     */
    public get Name(): string
    {
        return this.name;
    }

    public set Name(value: string)
    {
        this.name = value;
    }

    /**
     * Gets the human-readable name of the component.
     */
    public get DisplayName(): Localization
    {
        return this.displayName;
    }

    /**
     * Gets or sets the version of the component.
     */
    public get Version(): string
    {
        return this.version;
    }

    public set Version(value: string)
    {
        this.version = value;
    }

    /**
     * Gets or sets the author of the component.
     */
    public get Author(): Person
    {
        return this.author;
    }

    /**
     * Gets or sets the creation-date of the component.
     */
    public get CreationDate(): Date
    {
        return this.creationDate;
    }

    public set CreationDate(value: Date)
    {
        this.creationDate = value;
    }

    /**
     * Gets the description of the component.
     */
    public get Description(): Localization
    {
        return this.description;
    }

    /**
     * Gets or sets the license of the component.
     */
    public get License(): string
    {
        return this.license;
    }

    public set License(value: string)
    {
        this.license = value;
    }
}