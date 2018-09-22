/**
 * Provides options for the `Category` class.
 */
export interface ICategoryOptions<T>
{
    /**
     * A value for ordering the category.
     */
    ShowOrder?: number;

    /**
     * The options of the category.
     */
    Options: T[];
}