import { Answers, Question } from "@manuth/extended-yo-generator";

/**
 * Represents questions for a woltlab-application
 */
export class ApplicationQuestions<T extends Answers> extends Array<Question<T>>
{
    /**
     * Initializes a new instance of the {@link ApplicationQuestions `ApplicationQuestion<T>`} class.
     *
     * @param name
     * The key to save the answer to.
     *
     * @param message
     * The message to display.
     *
     * @param when
     * The condition under which the question should be asked.
     */
    public constructor(name: string, message: string, when?: boolean | ((settings: T) => boolean | Promise<boolean>))
    {
        super();

        let whenFunction = async (settings: T): Promise<boolean> =>
        {
            if (when)
            {
                if (typeof when === "function")
                {
                    return when(settings);
                }
                else
                {
                    return when;
                }
            }
            else
            {
                return true;
            }
        };

        this.push(
            {
                type: "list",
                name,
                message,
                default: "wcf",
                choices: [
                    {
                        value: "wcf",
                        name: "WoltLab Suite Core"
                    },
                    {
                        value: "wbb",
                        name: "WoltLab Burning Board"
                    },
                    {
                        value: "gallery",
                        name: "WoltLab Gallery"
                    },
                    {
                        value: "filebase",
                        name: "WoltLab FileBase"
                    },
                    {
                        value: undefined,
                        name: "Custom"
                    }
                ],
                when: async (input) => whenFunction(input)
            },
            {
                name,
                message: "Please specify the identifier of the custom Application.",
                default: "wcf",
                when: async (settings) => (await whenFunction(settings)) && (settings[name] === undefined),
                validate: (input) => /\w+/.test(input) ? true : "The identifier must not be empty!"
            });
    }
}
