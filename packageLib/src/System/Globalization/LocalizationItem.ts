import { isNullOrUndefined } from "util";
import { NodeItem } from "../NodeSystem/NodeItem";
import { ILocalizationItemOptions } from "./ILocalizationItemOptions";
import { Localization } from "./Localization";

/**
 * Represents a node which contains translations.
 */
export class LocalizationItem extends NodeItem
{
    /**
     * The translations of the node.
     */
    private translations: Localization = new Localization();

    /**
     * Initializes a new instance of the `LocalizationNode` class.
     *
     * @param options
     * The options for generating the object.
     *
     * @param generator
     * The generator-function for generating sub-nodes.
     */
    public constructor(options: ILocalizationItemOptions)
    {
        super();

        if (!isNullOrUndefined(options.Translations))
        {
            Object.assign(this.Translations.Data, options.Translations);
        }
    }

    /**
     * Gets the translations of the node.
     */
    public get Translations(): Localization
    {
        return this.translations;
    }
}