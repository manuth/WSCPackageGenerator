import { ReadLine } from "readline";
import { ReadStream } from "tty";
import { PromptCallback } from "@manuth/generator-ts-project";
import { Answers, ChoiceCollection, prompt } from "inquirer";
import Prompt = require("inquirer/lib/prompts/base");
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
 */
export class ApplicationPrompt<T extends Answers> extends Prompt<IApplicationQuestionOptions<T>>
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
    public constructor(question: IApplicationQuestion<T>, readLine: ReadLine, answers: T)
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
     * @param callback
     * A callback for resolving the result.
     */
    public override _run(callback: PromptCallback): void
    {
        (
            async () =>
            {
                this.rl.pause();
                this.screen.render("", undefined);
                let defaultApp: IWoltLabApplication;
                let suggestedApps: IWoltLabApplication[];
                let choices: ChoiceCollection;

                if (this.opt.default)
                {
                    defaultApp = this.opt.default;

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

                let answers = await prompt<IApplicationAnswerHash>(
                    [
                        {
                            type: "list",
                            name: "application",
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
                            name: "customApplication",
                            message: "Please specify the identifier of the custom Application.",
                            when: (answers) => answers.application === null
                        }
                    ]);

                this.rl.resume();
                ((this.rl as any).input as ReadStream)?.setRawMode?.(true);
                callback(answers.application ?? answers.customApplication);
            })();
    }
}
