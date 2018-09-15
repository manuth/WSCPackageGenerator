import { INodeContainerOptions } from "../Nodes/INodeContainerOptions";
import { Localizable } from "./Localizable";
import { TranslationNode } from "./TranslationNode";

/**
 * Provides options for the `ITranslationNode` interface.
 */
export interface ITranslationNodeOptions extends INodeContainerOptions<TranslationNode>
{
    /**
     * Gets or sets the id of the error-message.
     */
    ID?: string;

    /**
     * Gets the nodes contained by this node.
     */
    Nodes?: TranslationNode[];

    /**
     * Gets the translations contained by this node.
     */
    Translations?: Localizable;
}