import { Component } from "../../Component";
import { Generator } from "../../Generator";
import { IComponent } from "../../IComponent";
import { IWSCThemeSettings } from "./IWSCThemeSettings";
import { ThemeAssetQuestion } from "./ThemeAssetQuestion";

/**
 * Represents a component which provides theme-assets.
 */
export class ThemeAssetComponent<T extends IWSCThemeSettings> extends Component<T>
{
    /**
     * Initializes a new instance of the `ThemeAssetComponent<T>` class.
     *
     * @param generator
     * The generation the component belongs to.
     *
     * @param options
     * The options for the initialization.
     */
    public constructor(generator: Generator<T>, options: IComponent<T>)
    {
        super(options);
        this.Question = new ThemeAssetQuestion(generator, options.Question);
    }
}