import IPerson from "./IPerson";
import { isNullOrUndefined } from "util";

/**
 * Represents a person.
 */
export default class Person implements IPerson
{
    /**
     * The name of the person.
     */
    private name: string = "";

    /**
     * The homepage of the person.
     */
    private url: string = null;

    /**
     * Initializes a new instance of the `Person` class.
     */
    public constructor(options: IPerson)
    {
        this.name = options.Name;

        if (!isNullOrUndefined(options.URL))
        {
            this.url = options.URL;
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

    public get URL(): string
    {
        return this.url;
    }

    public set URL(value: string)
    {
        this.url = value;
    }

    /**
     * Returns a string that represents the current object.
     */
    public toString(): string
    {
        return this.Name;
    }
}