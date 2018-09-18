import { IIdentifiableNodeOptions } from "../NodeSystem/IIdentifiableNodeOptions";
import { ILocalizable } from "./ILocalizable";

/**
 * Provides options for the `LocalizationNode` class.
 */
export interface ILocalizationNodeOptions extends IIdentifiableNodeOptions
{
    /**
     * The translations of the node.
     */
    Translations?: ILocalizable;
}