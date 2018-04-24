import Node from "../../Nodes/Node";
import NodeContainer from "../../Nodes/NodeContainer";
import Option from "./Option";
import OptionItem from "./OptionItem";

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