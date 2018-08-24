import { ErrorMessageNode } from "./ErrorMessageNode";
import { ITranslationNodeOptions } from "../ITranslationNodeOptions";

/**
 * Provides options for the `IErrorMessageNode` interface.
 */
export interface IErrorMessageNodeOptions extends ITranslationNodeOptions
{
    Nodes?: ErrorMessageNode[];
}