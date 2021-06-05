import { Answers, AsyncDynamicQuestionProperty, InputQuestionOptions } from "inquirer";
import { PathPromptRootDescriptor } from "./PathPromptRootDescriptor";

/**
 * Provides options for the `PathPrompt`.
 */
export interface IPathQuestionOptions<T extends Answers = Answers> extends InputQuestionOptions<T>
{
    /**
     * The directory to use for resolving relative paths for the {@link IPathQuestionOptions.default `default`} value and the answer.
     */
    rootDir?: AsyncDynamicQuestionProperty<PathPromptRootDescriptor, T>;
}
