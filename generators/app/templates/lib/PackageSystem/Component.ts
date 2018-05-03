import IComponent from "./IComponent";
import Localizable from "../GLobalization/Localizable";
import Package from "./Package";
import Person from "./Person";
import { isNullOrUndefined } from "util";

/**
 * Represents a component for WoltLab Suite Core.
 */
export default abstract class Component implements IComponent
{
    /**
     * The name of the component.
     */
    private name: string = null;

    /**
     * The human-readable name of the component.
     */
    private displayName: Localizable = new Localizable();

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
    private version: string = require("../../package.json").version;

    /**
     * The author of the component.
     */
    private author: Person = new Person({
        Name: require("../../package.json").author.name,
        URL:  require("../../package.json").author.url 
    });

    /**
     * The license of the component.
     */
    private license: string = require("../../package.json").license;

    /**
     * Initializes a new instance of the `Component` class.
     */
    protected constructor(options: IComponent)
    {
        this.name = options.Name;

        if (!isNullOrUndefined(options.DisplayName))
        {
            Object.assign(this.DisplayName, options.DisplayName);
        }

        if (!isNullOrUndefined(options.Description))
        {
            Object.assign(this.description, options.Description);
        }

        if (!isNullOrUndefined(options.Version))
        {
            this.version = options.Version;
        }

        if (!isNullOrUndefined(options.Author))
        {
            this.Author.Name = options.Author.Name;

            if (!isNullOrUndefined(options.Author.URL))
            {
                this.Author.URL = options.Author.URL;
            }
        }
    }

    public get Name(): string
    {
        return this.name;
    }

    public set Name(value: string)
    {
        this.name = value;
    }

    public get DisplayName(): Localizable
    {
        return this.displayName;
    }

    public get Date(): Date
    {
        return this.date;
    }

    public set Date(value: Date)
    {
        this.date = value;
    }

    public get Description(): Localizable
    {
        return this.description;
    }

    public get Version(): string
    {
        return this.version;
    }

    public set Version(value: string)
    {
        this.version = value;
    }

    public get Author(): Person
    {
        return this.author;
    }

    public get License(): string
    {
        return this.license;
    }

    public set License(value: string)
    {
        this.license = value;
    }
}