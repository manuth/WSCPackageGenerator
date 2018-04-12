import Localizable from "./GLobalization/Localizable";
import { Person } from "./Person";
import Package from "./Package";

/**
 * Represents a component for WoltLab Suite Core.
 */
export default abstract class Component
{
    /**
     * The name of the component.
     */
    private name: Localizable = new Localizable();

    /**
     * The release-date of the component.
     */
    private date: Date = new Date();

    /**
     * The description of the component.
     */
    private description: Localizable = new Localizable();

    /**
     * The version of the component.
     */
    private version: string = null;

    /**
     * The author of the component.
     */
    private author: Person = new Person();

    /**
     * The license of the component.
     */
    private license: string = null;

    /**
     * Initializes a new instance of the `Component` class.
     */
    protected constructor(options: Partial<Component> = { })
    {
        if (options.Name)
        {
            Object.assign(this.name, options.Name);
        }

        if (options.Description)
        {
            Object.assign(this.description, options.Description);
        }

        if (options.Version)
        {
            this.version = options.Version;
        }

        if (options.Author)
        {
            this.author = options.Author;
        }
    }

    /**
     * Gets the name of the component.
     */
    public get Name(): Localizable
    {
        return this.name;
    }

    /**
     * Gets or sets the release-date of the component.
     */
    public get Date(): Date
    {
        return this.date;
    }

    public set Date(value: Date)
    {
        this.date = value;
    }

    /**
     * Gets the description of the component.
     */
    public get Description(): Localizable
    {
        return this.description;
    }

    /**
     * Gets the version of the component.
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
     * Gets the author of the component.
     */
    public get Author(): Person
    {
        return this.author;
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