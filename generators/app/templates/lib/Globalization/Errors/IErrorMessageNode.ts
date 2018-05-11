import ErrorMessageNode from "./ErrorMessageNode";
import INodeContainer from "../../Nodes/INodeContainer";
import ITranslationNode from "../ITranslationNode";
import Localizable from "../Localizable";

/**
 * Represents a node that contains localized variables.
 */
export default interface IErrorMessageNode extends ITranslationNode
{
    Nodes?: ErrorMessageNode[];
}