import { Answers, AsyncDynamicQuestionProperty, InputQuestionOptions } from "inquirer";
import { IPathPromptRootDescriptor } from "./IPathPromptRootDescriptor";

/**
 * Provides options for the `PathPrompt`.
 */
export interface IPathQuestionOptions<T extends Answers = Answers> extends InputQuestionOptions<T>
{
    /**
     * The directory to use for resolving relative paths for the {@link IPathQuestionOptions.default `default`} value and the answer.
     */
    rootDir?: AsyncDynamicQuestionProperty<IPathPromptRootDescriptor | string, T>;
}
