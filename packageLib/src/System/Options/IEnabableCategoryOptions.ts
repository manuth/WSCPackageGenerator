import { ICategoryOptions } from "./ICategoryOptions";

/**
 * Provides options for the `EnabableCategory` class.
 */
export interface IEnabableCategoryOptions<T> extends ICategoryOptions<T>
{
    /**
     * The options of which at least one needs to be enabled for the category to be shown to the user.
     */
    EnableOptions?: string[];
}