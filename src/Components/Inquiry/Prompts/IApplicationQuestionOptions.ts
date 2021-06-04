import { Answers, InputQuestionOptions } from "inquirer";
import { IWoltLabApplication } from "./IWoltLabApplication";

/**
 * Provides options for the `ApplicationPrompt`.
 */
export interface IApplicationQuestionOptions<T extends Answers = Answers> extends InputQuestionOptions<T>
{
    /**
     * @inheritdoc
     */
    default?: IWoltLabApplication;
}
