import ITranslationNodeOptions from "./ITranslationNodeOptions";
import INodeContainer from "../Nodes/INodeContainer";
import TranslationNode from "./TranslationNode";

/**
 * Represents a node that contains localized variables.
 */
export default interface ITranslationNode extends INodeContainer<TranslationNode>, Required<ITranslationNodeOptions>
{
}