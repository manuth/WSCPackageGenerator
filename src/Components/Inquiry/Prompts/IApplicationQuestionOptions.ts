import { Answers, AsyncDynamicQuestionProperty, InputQuestionOptions } from "inquirer";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { ApplicationPrompt } from "./ApplicationPrompt.js";
import { ISuggestionOptions } from "./ISuggestionOptions.js";

/**
 * Provides options for the {@link ApplicationPrompt `ApplicationPrompt<T>`}.
 *
 * @template T
 * The type of the answers.
 */
export interface IApplicationQuestionOptions<T extends Answers = Answers> extends InputQuestionOptions<T>
{
    /**
     * @inheritdoc
     */
    default?: AsyncDynamicQuestionProperty<string, T>;

    /**
     * The suggested applications to display.
     */
    suggestions?: AsyncDynamicQuestionProperty<ISuggestionOptions, T>;
}
