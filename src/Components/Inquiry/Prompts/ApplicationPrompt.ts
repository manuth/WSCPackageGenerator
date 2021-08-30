import { ReadLine } from "readline";
import { NestedPrompt } from "@manuth/generator-ts-project";
import { Answers, ChoiceCollection, prompt } from "inquirer";
import { IApplicationAnswerHash } from "./IApplicationAnswerHash";
import { IApplicationQuestion } from "./IApplicationQuestion";
import { IApplicationQuestionOptions } from "./IApplicationQuestionOptions";
import { IWoltLabApplication } from "./IWoltLabApplication";

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
        let defaultApp: IWoltLabApplication;
        let suggestedApps: IWoltLabApplication[];
        let choices: ChoiceCollection;

        if (this.opt.default)
        {
            if (typeof this.opt.default === "function")
            {
                defaultApp = await this.opt.default(this.answers);
            }
            else
            {
                defaultApp = await this.opt.default;
            }

            suggestedApps = [
                this.DefaultApplication,
                ...this.SuggestedApplications
            ];
        }
        else
        {
            defaultApp = this.DefaultApplication;
            suggestedApps = this.SuggestedApplications;
        }

        choices = [
            defaultApp,
            ...suggestedApps
        ].map(
            (app) =>
            {
                return {
                    name: app.DisplayName,
                    value: app.ID
                };
            });

        let result = await prompt<IApplicationAnswerHash>(
            [
                {
                    type: "list",
                    name: nameof<IApplicationAnswerHash>((hash) => hash.application),
                    message: this.opt.message,
                    default: defaultApp.ID,
                    choices: [
                        ...choices,
                        {
                            name: "Custom",
                            value: null
                        }
                    ]
                },
                {
                    name: nameof<IApplicationAnswerHash>((hash) => hash.customApplication),
                    message: "Please specify the identifier of the custom Application.",
                    when: (answers) => answers.application === null
                }
            ]);

        return result.application ?? result.customApplication;
    }
}
