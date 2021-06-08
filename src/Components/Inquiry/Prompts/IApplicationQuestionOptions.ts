import { Answers, AsyncDynamicQuestionProperty, InputQuestionOptions } from "inquirer";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApplicationPrompt } from "./ApplicationPrompt";
import { IWoltLabApplication } from "./IWoltLabApplication";

/**
 * Provides options for the {@link ApplicationPrompt `ApplicationPrompt<T>`}.
 */
export interface IApplicationQuestionOptions<T extends Answers = Answers> extends InputQuestionOptions<T>
{
    /**
     * @inheritdoc
     */
    default?: AsyncDynamicQuestionProperty<IWoltLabApplication, T>;
}
