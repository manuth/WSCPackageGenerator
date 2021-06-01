import { parse } from "url";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { QuestionBase, TSProjectSettingKey } from "@manuth/generator-ts-project";
import { IWoltLabGeneratorSettings } from "../IWoltLabGeneratorSettings";
import { WoltLabSettingKey } from "../WoltLabSettingKey";

/**
 * Represents a question for asking for the package-identifier.
 */
export class WoltLabIdentifierQuestion<TSettings extends IWoltLabGeneratorSettings, TOptions extends GeneratorOptions> extends QuestionBase<TSettings, TOptions>
{
    /**
     * @inheritdoc
     */
    public type = "input" as const;

    /**
     * @inheritdoc
     */
    public name = WoltLabSettingKey.Identifier;

    /**
     * @inheritdoc
     *
     * @param answers
     * The answers provided by the user.
     *
     * @returns
     * The message to show to the user.
     */
    protected async Message(answers: TSettings): Promise<string>
    {
        return "Please enter an identifier for your package:";
    }

    /**
     * @inheritdoc
     *
     * @param answers
     * The answers provided by the user.
     *
     * @returns
     * The default value.
     */
    protected override async Default(answers: TSettings): Promise<string>
    {
        let reversedUri = parse(answers[WoltLabSettingKey.HomePage]).hostname?.split(".").reverse().join(".") ?? "";

        if (reversedUri.length === 0)
        {
            reversedUri = "com.example";
        }

        return `${reversedUri}.${answers[TSProjectSettingKey.Name]}`;
    }

    /**
     * @inheritdoc
     *
     * @param input
     * The answer provided by the user.
     *
     * @param answers
     * The answers provided by the user.
     *
     * @returns
     * The choices the user can choose from.
     */
    protected override async Validate(input: any, answers: TSettings): Promise<string | boolean>
    {
        return (`${input}`.trim().length > 0) ? super.Validate(input, answers) : "The identifier must not be empty!";
    }
}
