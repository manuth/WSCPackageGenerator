import { Interface } from "readline";
import { Answers, DistinctQuestion, prompt } from "inquirer";
import { IQuestionCollectionQuestion } from "./IQuestionCollectionQuestion";
import { IQuestionCollectionQuestionOptions } from "./IQuestionCollectionQuestionOptions";
import { NestedPrompt } from "./NestedPrompt";

/**
 * Represents an answer-hash.
 */
type AnswerHash = Answers;

declare module "inquirer"
{
    /**
     * @inheritdoc
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface QuestionMap<T>
    {
        /**
         * Represents the question-collection prompt.
         */
        [QuestionCollectionPrompt.TypeName]: IQuestionCollectionQuestion<AnswerHash, T>;
    }
}

/**
 * Provides the functionality to ask a set of questions in a nested context.
 *
 * @template TAnswers
 * The type of the answer-hash of the inner questions.
 *
 * @template TQuestion
 * The type of the prompt-options.
 */
export class QuestionCollectionPrompt<TAnswers extends Answers = Answers, TQuestion extends IQuestionCollectionQuestionOptions<TAnswers> = IQuestionCollectionQuestionOptions<TAnswers>> extends NestedPrompt<TQuestion>
{
    /**
     * The name of the prompt-type.
     */
    public static readonly TypeName = "questions";

    /**
     * Initializes a new instance of the {@link QuestionCollectionPrompt `QuestionCollectionPrompt<TAnswers, TQuestion>`} class.
     *
     * @param question
     * The question to prompt the user to answer.
     *
     * @param readLine
     * An object for reading from and writing to the console.
     *
     * @param answers
     * The answer-hash.
     */
    public constructor(question: TQuestion, readLine: Interface, answers: Answers)
    {
        super(question, readLine, answers);
    }

    /**
     * @inheritdoc
     *
     * @returns
     * The value to save to the answer-hash.
     */
    protected async Prompt(): Promise<unknown>
    {
        let questions: Array<DistinctQuestion<TAnswers>>;

        if (typeof this.opt.questions === "function")
        {
            questions = await this.opt.questions(this.answers);
        }
        else
        {
            questions = await this.opt.questions;
        }

        return prompt(questions);
    }
}
