import { Answers, AsyncDynamicQuestionProperty, InputQuestionOptions } from "inquirer";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApplicationPrompt } from "./ApplicationPrompt";
import { ISuggestionOptions } from "./ISuggestionOptions";

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
