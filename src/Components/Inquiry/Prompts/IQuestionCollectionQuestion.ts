import { Answers } from "inquirer";
import { IQuestionCollectionQuestionOptions } from "./IQuestionCollectionQuestionOptions";
import { QuestionCollectionPrompt } from "./QuestionCollectionPrompt";

/**
 * Provides options for the {@link QuestionCollectionPrompt `QuestionCollectionPrompt<TAnswers, TQuestion>`}.
 *
 * @template TResult
 * The type of the answer-hash of the inner questions.
 *
 * @template TAnswers
 * The type of the answers.
 */
export interface IQuestionCollectionQuestion<TResult extends Answers = Answers, TAnswers extends Answers = Answers> extends IQuestionCollectionQuestionOptions<TResult, TAnswers>
{
    /**
     * @inheritdoc
     */
    type: typeof QuestionCollectionPrompt.TypeName;
}
