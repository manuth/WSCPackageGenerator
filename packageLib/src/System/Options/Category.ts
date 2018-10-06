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
     * The options of which at least one needs to be enabled for the category to be shown to the user.
     */
    private enableOptions: string[] = [];

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

        if (!isNullOrUndefined(options.Options))
        {
            for (let option of options.Options)
            {
                this.options.push(generator(this, option));
            }
        }

        if (!isNullOrUndefined(options.EnableOptions))
        {
            this.EnableOptions.push(...options.EnableOptions);
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

    /**
     * Gets the options of the category.
     */
    public get Options(): ReadonlyArray<TOption>
    {
        return this.options;
    }

    public GetObjects(): { [id: string]: any }
    {
        let result: { [id: string]: any } = {};

        for (let option of this.Options)
        {
            if (!isNullOrUndefined(option.ID))
            {
                result[option.ID] = option;
            }
        }

        return result;
    }
}