import { Answers, Question } from "extended-yo-generator";

/**
 * Represents questions for a woltlab-application
 */
export class ApplicationQuestions<T extends Answers> extends Array<Question<T>>
{
    /**
     * Initializes a new instance of the `ApplicationQuestion<T>` class.
     *
     * @param name
     * The key to save the answer to.
     */
    public constructor(name: string, message: string, when?: boolean | ((settings: T) => boolean | Promise<boolean>))
    {
        super();
        let whenFunction = async (settings: T) =>
        {
            if (typeof when === "function")
            {
                return when(settings);
            }
            else
            {
                return when;
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
                        value: null,
                        name: "Custom"
                    }
                ],
                when: async (input) => whenFunction(input)
            },
            {
                name,
                message: "Please specify the identifier of the custom Application.",
                default: "wcf",
                when: async (settings) => (await whenFunction(settings)) && (settings[name] === null),
                validate: (input) => /\w+/.test(input) ? true : "The identifier must not be empty!"
            });
    }
}