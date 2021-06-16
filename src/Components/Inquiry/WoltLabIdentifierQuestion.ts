import { URL } from "url";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { QuestionBase, TSProjectSettingKey } from "@manuth/generator-ts-project";
import { InputQuestion } from "inquirer";
import { IWoltLabSettings } from "../../Settings/IWoltLabSettings";
import { WoltLabSettingKey } from "../../Settings/WoltLabSettingKey";

/**
 * Represents a question for asking for the package-identifier.
 *
 * @template TSettings
 * The type of the generator-settings.
 *
 * @template TOptions
 * The type of the generator-options.
 */
export class WoltLabIdentifierQuestion<TSettings extends IWoltLabSettings, TOptions extends GeneratorOptions> extends QuestionBase<TSettings, TOptions>
{
    /**
     * @inheritdoc
     */
    public get type(): InputQuestion["type"]
    {
        return "input";
    }

    /**
     * @inheritdoc
     */
    public get name(): string
    {
        return WoltLabSettingKey.Identifier;
    }

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
        let reversedUri: string;

        try
        {
            reversedUri = new URL(answers[WoltLabSettingKey.HomePage] ?? "").hostname?.split(".").reverse().join(".") ?? "";
        }
        catch
        {
            reversedUri = "";
        }

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
