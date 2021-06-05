import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { AsyncDynamicQuestionProperty, DynamicQuestionProperty } from "inquirer";
import { IWoltLabGeneratorSettings } from "../IWoltLabGeneratorSettings";
import { WoltLabGenerator } from "../WoltLabGenerator";
import { PathQuestion } from "./PathQuestion";

/**
 * Represents a question for asking for asset-paths.
 */
export class AssetQuestion<TSettings extends IWoltLabGeneratorSettings, TOptions extends GeneratorOptions> extends PathQuestion<TSettings, TOptions>
{
    /**
     * Initializes a new instance of the {@link AssetQuestion `AssetQuestion<TSettings, TOptions>`} class.
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
        return this.Generator.assetPath();
    }
}
