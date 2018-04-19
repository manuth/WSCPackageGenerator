import INodeContainer from "../Nodes/INodeContainer";
import Localizable from "./Localizable";
import ErrorMessageNode from "./ErrorMessageNode";
import ITranslationNode from "./ITranslationNode";

/**
 * Represents a node that contains localized variables.
 */
export default interface IErrorMessageNode extends ITranslationNode
{
    /**
     * Gets or sets the id of the error-message.
     */
    ID?: string;

    Nodes?: ErrorMessageNode[];
}