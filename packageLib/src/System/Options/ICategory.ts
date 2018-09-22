import { INodeItem } from "../NodeSystem/INodeItem";

/**
 * Represents an option-category.
 */
export interface ICategory extends INodeItem
{
    /**
     * A value for ordering the category.
     */
    ShowOrder: number;
}