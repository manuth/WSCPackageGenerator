import { ICategory as ICategoryBase } from "../ICategory";

/**
 * Represents a category.
 */
export interface ICategory<T> extends ICategoryBase
{
    /**
     * Gets the options of the category.
     */
    Options: ReadonlyArray<T>;
}