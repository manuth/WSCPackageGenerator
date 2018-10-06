import { INode } from "../../NodeSystem/INode";
import { EnabableCategory } from "../EnabableCategory";
import { IEnabableCategoryOptions } from "../IEnabableCategoryOptions";
import { ACPOption } from "./ACPOption";
import { IACPOptionOptions } from "./IACPOptionOptions";

/**
 * Represents an option-category for the control-panel.
 */
export class ACPCategory extends EnabableCategory<ACPOption, IACPOptionOptions>
{
    /**
     * Initializes a new instance of the `ACPCategory` class.
     */
    public constructor(node: INode, options: IEnabableCategoryOptions<IACPOptionOptions>)
    {
        super(
            node,
            options,
            (category: EnabableCategory<ACPOption, IACPOptionOptions>, opts: IACPOptionOptions): ACPOption =>
            {
                return new ACPOption(category, opts);
            });
    }
}