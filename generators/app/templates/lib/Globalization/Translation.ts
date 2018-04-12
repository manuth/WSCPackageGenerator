import Node from "../Node";
import Localizable from "./Localizable";

/**
 * Represents a translation.
 */
export default class Translation extends Node
{
    /**
     * The localizations of the node.
     */
    private localizations: Localizable = new Localizable();

    /**
     * Initializes a new instance of the `Translation` class.
     */
    public constructor(options: Partial<Translation> = { })
    {
        super(options);

        if (options)
        {
            if (options.Localizations)
            {
                Object.assign(this.localizations, options.Localizations);
            }
        }
    }

    /**
     * Gets the localizations of the node.
     */
    public get Localizations(): Localizable
    {
        return this.localizations;
    }
}