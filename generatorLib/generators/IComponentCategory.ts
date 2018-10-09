import { IComponent } from "./IComponent";

/**
 * Represents a category which contains components.
 */
export interface IComponentCategory
{
    /**
     * The human readable name of the category.
     */
    DisplayName: string;

    /**
     * The components of the category.
     */
    Components: IComponent[];
}