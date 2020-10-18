import Path = require("path");
import { AsyncDynamicQuestionProperty, InputQuestion } from "inquirer";
import { AssetQuestion } from "../../AssetQuestion";
import { Generator } from "../../Generator";
import { IWSCThemeSettings } from "./IWSCThemeSettings";
import { WSCThemeSetting } from "./WSCThemeSetting";

/**
 * Represents a question for theme-assets.
 */
export class ThemeAssetQuestion<T extends IWSCThemeSettings> extends AssetQuestion<T>
{
    /**
     * Initializes a new instance of the `ThemeAssetQuestion<T>` class.
     *
     * @param generator
     * The generator.
     *
     * @param options
     * The options for the initialization.
     */
    public constructor(generator: Generator<T>, options: InputQuestion<T>)
    {
        super(generator, options);
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
    public default: AsyncDynamicQuestionProperty<string> = (answers) =>
    {
        let defaultValue = super.default;

        return (
            async (answers) =>
            {
                let fileName: string;

                if (typeof defaultValue === "function")
                {
                    defaultValue = defaultValue(answers);
                }

                if (defaultValue instanceof Promise)
                {
                    fileName = await defaultValue;
                }
                else
                {
                    fileName = defaultValue;
                }

                return Path.join(answers[WSCThemeSetting.Name], fileName);
            })(answers);
    };
}
