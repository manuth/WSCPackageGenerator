import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { AsyncDynamicQuestionProperty, DynamicQuestionProperty, KeyUnion } from "inquirer";
import { IWoltLabSettings } from "../Settings/IWoltLabSettings";
import { WoltLabGenerator } from "../WoltLabGenerator";
import { PathQuestionBase } from "./PathQuestionBase";

/**
 * Provides a basic implementation of the {@link PathQuestionBase `PathQuestionBase<TSettings, TOptions>`} class.
 *
 * @template TSettings
 * The type of the generator-settings.
 *
 * @template TOptions
 * The type of the generator-options.
 */
export abstract class PathQuestion<TSettings extends IWoltLabSettings, TOptions extends GeneratorOptions> extends PathQuestionBase<TSettings, TOptions>
{
    /**
     * @inheritdoc
     */
    public type = "input" as const;

    /**
     * The key to save the answer to.
     */
    private key: KeyUnion<TSettings>;

    /**
     * The question to show to the user.
     */
    private question: AsyncDynamicQuestionProperty<string, TSettings>;

    /**
     * The default base-name.
     */
    private defaultBaseName: DynamicQuestionProperty<string, TSettings>;

    /**
     * Initializes a new instance of the {@link PathQuestionBase `PathQuestionBase<TSettings, TOptions>`} class.
     *
     * @param generator
     * The generator of the question.
     *
     * @param name
     * The key to store the answer to.
     *
     * @param message
     * The message to show to the user.
     *
     * @param defaultBaseName
     * The default base-name.
     */
    public constructor(generator: WoltLabGenerator<TSettings, TOptions>, name: string, message: AsyncDynamicQuestionProperty<string, TSettings>, defaultBaseName: DynamicQuestionProperty<string, TSettings>)
    {
        super(generator);
        this.key = name;
        this.question = message;
        this.defaultBaseName = defaultBaseName;
    }

    /**
     * @inheritdoc
     */
    protected get Name(): KeyUnion<TSettings>
    {
        return this.key;
    }

    /**
     * @inheritdoc
     *
     * @param answers
     * The answers provided by the user.
     *
     * @returns
     * The message to display.
     */
    protected async Message(answers: TSettings): Promise<string>
    {
        let result: string | Promise<string>;

        if (typeof this.question === "function")
        {
            result = this.question(answers);
        }
        else
        {
            result = this.question;
        }

        return result;
    }

    /**
     * @inheritdoc
     *
     * @param answers
     * The answers provided by the users.
     *
     * @returns
     * The directory the path should be relative to.
     */
    protected DefaultBaseName(answers: TSettings): string
    {
        let result: string;

        if (typeof this.defaultBaseName === "function")
        {
            result = this.defaultBaseName(answers);
        }
        else
        {
            result = this.defaultBaseName;
        }

        return result;
    }
}
