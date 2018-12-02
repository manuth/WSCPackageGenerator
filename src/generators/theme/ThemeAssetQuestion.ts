import { Question } from "extended-yo-generator";
import Path = require("path");
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
     * @param id
     * The id of the component.
     *
     * @param options
     * The options for the initialization.
     */
    public constructor(generator: Generator<T>, id: string, options: Question<T>)
    {
        super(generator, id, options);
    }

    public get default(): string | Promise<string> | ((answers: T) => string | Promise<string>)
    {
        let defaultValue: string | Promise<string> | ((answers: T) => string | Promise<string>) = super.default;

        return async (answers) =>
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
        };
    }

    public set default(value)
    {
        super.default = value;
    }
}