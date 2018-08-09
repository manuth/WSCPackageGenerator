import ErrorMessageNode from "./ErrorMessageNode";
import INodeContainerOptions from "../../Nodes/INodeContainerOptions";
import ITranslationNodeOptions from "../ITranslationNodeOptions";
import Localizable from "../Localizable";

/**
 * Provides options for the `IErrorMessageNode` interface.
 */
export default interface IErrorMessageNodeOptions extends ITranslationNodeOptions
{
    Nodes?: ErrorMessageNode[];
}