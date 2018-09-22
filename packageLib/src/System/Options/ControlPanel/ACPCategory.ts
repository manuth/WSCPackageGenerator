import { INode } from "../../NodeSystem/INode";
import { Category } from "../Category";
import { ICategoryOptions } from "../ICategoryOptions";
import { ACPOption } from "./ACPOption";
import { IACPOptionOptions } from "./IACPOptionOptions";

/**
 * Represents an option-category for the control-panel.
 */
export class ACPCategory extends Category<ACPOption, IACPOptionOptions>
{
    /**
     * Initializes a new instance of the `ACPCategory` class.
     */
    public constructor(node: INode, options: ICategoryOptions<IACPOptionOptions>)
    {
        super(
            node,
            options,
            (category: Category<ACPOption, IACPOptionOptions>, opts: IACPOptionOptions): ACPOption =>
            {
                return new ACPOption(category, opts);
            });
    }
}