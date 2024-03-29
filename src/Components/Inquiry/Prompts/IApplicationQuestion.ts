import { Answers } from "inquirer";
import { ApplicationPrompt } from "./ApplicationPrompt.js";
import { IApplicationQuestionOptions } from "./IApplicationQuestionOptions.js";

/**
 * Provides options for the {@link ApplicationPrompt `ApplicationPrompt<T>`}.
 *
 * @template T
 * The type of the answers.
 */
export interface IApplicationQuestion<T extends Answers = Answers> extends IApplicationQuestionOptions<T>
{
    /**
     * @inheritdoc
     */
    type: typeof ApplicationPrompt.TypeName;
}
