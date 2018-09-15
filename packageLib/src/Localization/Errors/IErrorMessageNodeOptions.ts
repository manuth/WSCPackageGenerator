import { ITranslationNodeOptions } from "../ITranslationNodeOptions";
import { ErrorMessageNode } from "./ErrorMessageNode";

/**
 * Provides options for the `IErrorMessageNode` interface.
 */
export interface IErrorMessageNodeOptions extends ITranslationNodeOptions
{
    Nodes?: ErrorMessageNode[];
}