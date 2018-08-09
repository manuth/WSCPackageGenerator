import ErrorMessageNode from "./ErrorMessageNode";
import ITranslationNodeOptions from "../ITranslationNodeOptions";

/**
 * Provides options for the `IErrorMessageNode` interface.
 */
export default interface IErrorMessageNodeOptions extends ITranslationNodeOptions
{
    Nodes?: ErrorMessageNode[];
}