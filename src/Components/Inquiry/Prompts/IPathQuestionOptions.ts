import { Answers, AsyncDynamicQuestionProperty, InputQuestionOptions } from "inquirer";
import { IPathPromptRootDescriptor } from "./IPathPromptRootDescriptor";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PathPrompt } from "./PathPrompt";

/**
 * Provides options for the {@link PathPrompt `PathPrompt`}.
 *
 * @template T
 * The type of the answers.
 */
export interface IPathQuestionOptions<T extends Answers = Answers> extends InputQuestionOptions<T>
{
    /**
     * The directory to use for resolving relative paths for the {@link IPathQuestionOptions.default `default`} value and the answer.
     */
    rootDir?: AsyncDynamicQuestionProperty<IPathPromptRootDescriptor | string, T>;
}
