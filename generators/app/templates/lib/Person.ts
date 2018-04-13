/**
 * Represents a person.
 */
export class Person
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
    public constructor(options: Partial<Person> = { })
    {
        if (options.Name)
        {
            this.name = options.Name;
        }

        if (options.URL)
        {
            this.url = options.URL;
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


    /**
     * Returns a string that represents the current object.
     */
    public toString(): string
    {
        return this.Name;
    }
}