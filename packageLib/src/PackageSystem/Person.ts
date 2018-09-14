import { isNullOrUndefined } from "util";
import { IPersonOptions } from "./IPersonOptions";

/**
 * Represents a person.
 */
export class Person
{
    /**
     * The name of the person.
     */
    private name: string;

    /**
     * The url to the homepage of the person.
     */
    private url: string = null;

    /**
     * Initializes a new instance of the `Person` class.
     */
    public constructor(options: IPersonOptions)
    {
        this.Name = options.Name;

        if (!isNullOrUndefined(options.URL))
        {
            this.URL = options.URL;
        }
    }

    /**
     * Gets or sets the name of the person.
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
     * Gets or sets the url to the homepage of the person.
     */
    public get URL(): string
    {
        return this.url;
    }

    public set URL(value: string)
    {
        this.url = value;
    }
}