import { INode } from "../NodeSystem/INode";
import { Category } from "./Category";
import { IEnabableCategoryOptions } from "./IEnabableCategoryOptions";
import { Option } from "./Option";

/**
 * Represents an option-category which can be enabled by other options.
 */
export class EnabableCategory<TOption extends Option, TOptionOptions> extends Category<TOption, TOptionOptions>
{
    /**
     * The options of which at least one needs to be enabled for the category to be shown to the user.
     */
    private enableOptions: string[];

    /**
     * Initializes a new instance of the `DisabableCategory<TOption, TOptionOptions>` class.
     *
     * @param generator
     * A function for generating options.
     */
    public constructor(node: INode, options: IEnabableCategoryOptions<TOptionOptions>, generator: (category: Category<TOption, TOptionOptions>, optionOptions: TOptionOptions) => TOption)
    {
        super(node, options, generator);
    }

    /**
     * Gets or sets the options of which at least one needs to be enabled for the category to be shown to the user.
     */
    public get EnableOptions(): string[]
    {
        return this.enableOptions;
    }

    public set EnableOptions(value: string[])
    {
        this.enableOptions = value;
    }
}