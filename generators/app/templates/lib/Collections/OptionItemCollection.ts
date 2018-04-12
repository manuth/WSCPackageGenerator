import NodeContainer from "../NodeContainer";
import Node from "../Node";
import OptionItem from "../OptionItem";
import Option from "../Option";

/**
 * Represents a set of option-items.
 */
export default class OptionItemCollection<T extends OptionItem> extends Array<T>
{
    /**
     * The option this collection belongs to.
     */
    private option: Option;

    /**
     * Initializes a new instance of the `OptionItemCollection` class.
     * 
     * @param option
     * The option this collection belongs to.
     */
    public constructor(option: Option)
    {
        super();
        this.option = option;
    }

    public push(...items: T[])
    {
        for (let item of items)
        {
            item.Option = this.option;
        }

        return super.push(...items);
    }
}