import { INodeOptions } from "../NodeSystem/INodeOptions";
import { Node } from "../NodeSystem/Node";
import { ILocalizationItemOptions } from "./ILocalizationItemOptions";
import { LocalizationItem } from "./LocalizationItem";

/**
 * Represents a node which provides localizations.
 */
export class LocalizationNode extends Node<LocalizationItem, ILocalizationItemOptions>
{
    /**
     * Initializes a new instance of the `LocalizationNode` class.
     */
    public constructor(options: INodeOptions<ILocalizationItemOptions>)
    {
        super(options, (opts: ILocalizationItemOptions): LocalizationItem => new LocalizationItem(opts));
    }
}