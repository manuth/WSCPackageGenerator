import Path = require("path");
import { AssetDestination } from "../../AssetDestination";
import { Generator } from "../../Generator";
import { IComponentDestination } from "../../IComponentDestination";
import { IGeneratorSettings } from "../../IGeneratorSettings";
import { WSCThemeSetting } from "./WSCThemeSetting";

/**
 * Represents the destination of a WoltLab Suite Core-theme.
 */
export class ThemeAssetDestination<T extends IGeneratorSettings> extends AssetDestination<T>
{
    /**
     * Initializes a new instance of the `ThemeDestination<T>` class.
     *
     * @param options
     * The options for the initialization.
     */
    public constructor(generator: Generator<T>, options: IComponentDestination<T>)
    {
        super(generator, options);
    }

    public get Default(): string | ((answers: T) => string | Promise<string>)
    {
        let defaultValue = super.Default;

        return async (answers) =>
        {
            let fileName: string;

            if (typeof defaultValue === "string")
            {
                fileName = defaultValue;
            }
            else
            {
                let result = defaultValue(answers);

                if (result instanceof Promise)
                {
                    fileName = await result;
                }
                else
                {
                    fileName = result;
                }
            }

            return Path.join(answers[WSCThemeSetting.Name], fileName);
        };
    }

    public set Default(value)
    {
        super.Default = value;
    }
}