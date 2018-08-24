import { INodeContainer } from "../Nodes/INodeContainer";
import { ITranslationNodeOptions } from "./ITranslationNodeOptions";
import { TranslationNode } from "./TranslationNode";

/**
 * Represents a node that contains localized variables.
 */
export interface ITranslationNode extends INodeContainer<TranslationNode>, Required<ITranslationNodeOptions>
{
}