import { Answers, AsyncDynamicQuestionProperty, DistinctQuestion, Question } from "inquirer";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
export interface IQuestionCollectionQuestionOptions<TResult extends Answers = Answers, TAnswers extends Answers = Answers> extends Question<TAnswers>
{
    /**
     * The questions to ask.
     */
    questions: AsyncDynamicQuestionProperty<Array<DistinctQuestion<TResult>>>;
}
