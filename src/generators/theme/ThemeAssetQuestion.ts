import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TSProjectSettingKey } from "@manuth/generator-ts-project";
import { AsyncDynamicQuestionProperty, DynamicQuestionProperty } from "inquirer";
import { join } from "upath";
import { AssetQuestion } from "../../Inquiry/AssetQuestion";
import { IWoltLabGeneratorSettings } from "../../IWoltLabGeneratorSettings";
import { WoltLabGenerator } from "../../WoltLabGenerator";

/**
 * Represents a question for asking for paths to theme-assets.
 */
export class ThemeAssetQuestion<TSettings extends IWoltLabGeneratorSettings, TOptions extends GeneratorOptions> extends AssetQuestion<TSettings, TOptions>
{
    /**
     * Initializes a new instance of the `ThemeAssetQuestion` class.
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
     * @param defaultValue
     * The default value.
     */
    public constructor(generator: WoltLabGenerator<TSettings, TOptions>, name: string, message: AsyncDynamicQuestionProperty<string, TSettings>, defaultValue: DynamicQuestionProperty<string, TSettings>)
    {
        super(generator, name, message, defaultValue);
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
    protected RootDir(answers: TSettings): string
    {
        return join(super.RootDir(answers), "themes", answers[TSProjectSettingKey.Name]);
    }
}
