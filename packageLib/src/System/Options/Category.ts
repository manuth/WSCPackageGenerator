import { isNullOrUndefined } from "util";
import { Localization } from "../Globalization/Localization";
import { INode } from "../NodeSystem/INode";
import { NodeItem } from "../NodeSystem/NodeItem";
import { ICategory } from "./ICategory";
import { ICategoryOptions } from "./ICategoryOptions";
import { Option } from "./Option";

/**
 * Represents an option-category.
 */
export class Category<TOption extends Option, TOptionOptions> extends NodeItem implements ICategory
{
    /**
     * The human-readable name of the category.
     */
    private displayName: Localization = new Localization();

    /**
     * The description of the category.
     */
    private description: Localization = new Localization();

    /**
     * A value for ordering the category.
     */
    private showOrder: number = null;

    /**
     * The options of the category.
     */
    private options: TOption[] = [];

    /**
     * Initializes a new instance of the `Category` class.
     *
     * @param generator
     * A function for generating options.
     */
    public constructor(node: INode, options: ICategoryOptions<TOptionOptions>, generator: (category: Category<TOption, TOptionOptions>, optionOptions: TOptionOptions) => TOption)
    {
        super(node);

        if (!isNullOrUndefined(options.DisplayName))
        {
            Object.assign(this.DisplayName.Data, options.DisplayName);
        }

        if (!isNullOrUndefined(options.Description))
        {
            Object.assign(this.Description.Data, options.Description);
        }

        if (!isNullOrUndefined(options.ShowOrder))
        {
            this.ShowOrder = options.ShowOrder;
        }

        for (let option of options.Options)
        {
            this.options.push(generator(this, option));
        }
    }

    /**
     * Gets the human-readable name of the category.
     */
    public get DisplayName(): Localization
    {
        return this.displayName;
    }

    /**
     * Gets the description of the category.
     */
    public get Description(): Localization
    {
        return this.description;
    }

    /**
     * Gets or sets a value for ordering the category.
     */
    public get ShowOrder(): number
    {
        return this.showOrder;
    }

    public set ShowOrder(value: number)
    {
        this.showOrder = value;
    }

    /**
     * Gets the options of the category.
     */
    public get Options(): ReadonlyArray<TOption>
    {
        return this.options;
    }
}