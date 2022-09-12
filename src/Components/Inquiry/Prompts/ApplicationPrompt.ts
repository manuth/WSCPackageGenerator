import { ReadLine } from "readline";
import { NestedPrompt } from "@manuth/generator-ts-project";
import inquirer, { Answers, ChoiceCollection, DistinctQuestion } from "inquirer";
import { IApplicationAnswerHash } from "./IApplicationAnswerHash.js";
import { IApplicationQuestion } from "./IApplicationQuestion.js";
import { IApplicationQuestionOptions } from "./IApplicationQuestionOptions.js";
import { ISuggestionOptions } from "./ISuggestionOptions.js";
import { IWoltLabApplication } from "./IWoltLabApplication.js";

declare module "inquirer"
{
    /**
     * @inheritdoc
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface QuestionMap<T>
    {
        /**
         * Represents the application-prompt.
         */
        [ApplicationPrompt.TypeName]: IApplicationQuestion<T>;
    }
}

/**
 * Provides a prompt for asking for a WoltLab-application.
 *
 * @template T
 * The type of the prompt-options.
 */
export class ApplicationPrompt<T extends IApplicationQuestionOptions> extends NestedPrompt<T>
{
    /**
     * Gets the name of this prompt-type.
     */
    public static readonly TypeName = "wcf-application";

    /**
     * Initializes a new instance of the {@link ApplicationPrompt `ApplicationPrompt<T>`} class.
     *
     * @param question
     * The options for the prompt.
     *
     * @param readLine
     * An object for reading from and writing to the console.
     *
     * @param answers
     * The answer-object.
     */
    public constructor(question: T, readLine: ReadLine, answers: Answers)
    {
        super(
            {
                validate: () => true,
                filter: (value: any) => value,
                when: () => true,
                ...question
            },
            readLine,
            answers);
    }

    /**
     * Gets the applications which are listed as suggestions.
     */
    protected get SuggestedApplications(): IWoltLabApplication[]
    {
        return [
            {
                ID: "wbb",
                DisplayName: "WoltLab Burning Board"
            },
            {
                ID: "gallery",
                DisplayName: "WoltLab Gallery"
            },
            {
                ID: "filebase",
                DisplayName: "WoltLab FileBase"
            }
        ];
    }

    /**
     * Gets the default application.
     */
    protected get DefaultApplication(): IWoltLabApplication
    {
        return {
            ID: "wcf",
            DisplayName: "WoltLab Suite Core"
        };
    }

    /**
     * @inheritdoc
     *
     * @returns
     * The value to save to the answer-hash.
     */
    protected override async Prompt(): Promise<any>
    {
        let suggestions: ISuggestionOptions = null;
        let apps: IWoltLabApplication[] = [];
        let choices: ChoiceCollection;
        let questions: Array<DistinctQuestion<IApplicationAnswerHash>> = [];

        if (this.opt.suggestions)
        {
            if (typeof this.opt.suggestions === "function")
            {
                suggestions = await this.opt.suggestions(this.answers);
            }
            else
            {
                suggestions = await this.opt.suggestions;
            }
        }

        if (suggestions?.showBuiltinSuggestions ?? true)
        {
            apps.push(
                this.DefaultApplication,
                ...this.SuggestedApplications);
        }

        apps.push(...suggestions?.apps ?? []);

        choices = apps.map(
            (app) =>
            {
                return {
                    name: app.DisplayName,
                    value: app.ID
                };
            });

        if (choices.length > 0)
        {
            questions.push(
                {
                    type: "list",
                    name: nameof<IApplicationAnswerHash>((hash) => hash.application),
                    message: this.opt.message,
                    default: this.opt.default ??
                        suggestions?.showBuiltinSuggestions ?
                        this.DefaultApplication.ID :
                        undefined,
                    choices: [
                        ...choices,
                        {
                            name: "Custom",
                            value: null
                        }
                    ]
                });
        }

        questions.push(
            {
                name: nameof<IApplicationAnswerHash>((hash) => hash.customApplication),
                message: "Please specify the identifier of the custom application.",
                default: this.opt.default,
                when: (answers) => answers.application === null || answers.application === undefined
            });

        let result = await inquirer.prompt<IApplicationAnswerHash>(questions);
        return result.application ?? result.customApplication;
    }
}
