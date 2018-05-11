import INodeContainer from "../Nodes/INodeContainer";
import Localizable from "./Localizable";
import TranslationNode from "./TranslationNode";

/**
 * Represents a node that contains localized variables.
 */
export default interface ITranslationNode extends INodeContainer
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