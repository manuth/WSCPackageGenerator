import { Answers } from "inquirer";
import { IPathQuestionOptions } from "./IPathQuestionOptions";
import { PathPrompt } from "./PathPrompt";

/**
 * Provides options fot the {@link PathPrompt `PathPrompt<T>`}.
 */
export interface IPathQuestion<T extends Answers = Answers> extends IPathQuestionOptions<T>
{
    /**
     * @inheritdoc
     */
    type: typeof PathPrompt.TypeName;
}
