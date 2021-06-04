import { Answers } from "inquirer";
import { ApplicationPrompt } from "./ApplicationPrompt";
import { IApplicationQuestionOptions } from "./IApplicationQuestionOptions";

/**
 * Provides options for the `ApplicationPrompt`.
 */
export interface IApplicationQuestion<T extends Answers = Answers> extends IApplicationQuestionOptions<T>
{
    /**
     * @inheritdoc
     */
    type: typeof ApplicationPrompt.TypeName;
}
