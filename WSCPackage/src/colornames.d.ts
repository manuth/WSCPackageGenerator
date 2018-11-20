declare module "colornames"
{
    /**
     * Represents a color.
     */
    interface IColor
    {
        /**
         * Gets the value of the color.
         */
        value: string;

        /**
         * Gets a value indicating whether the color is a valid `CSS`-color.
         */
        css?: boolean;

        /**
         * Gets a value indicating whether the color is a valid `VGA`-color.
         */
        vga?: boolean;

        /**
         * Gets the name of the color.
         */
        name: string;
    }

    /**
     * Provides the functionality to resolve colors by name.
     */
    let colorNames: {
        /**
         * Gets the color with the specified name.
         */
        (name: string): IColor;

        /**
         * Provides the functionality to query colors.
         */
        get: {
            /**
             * Gets the color with the specified name.
             *
             * @param name
             * The name of the color to get.
             */
            (name: string): IColor;

            /**
             * Gets all available colors.
             */
            all(): IColor[];

            /**
             * Gets the `CSS`-color with the specified name.
             */
            css(name: string): IColor;

            /**
             * Gets all `CSS`-colors.
             */
            css(): IColor[];

            /**
             * Gets the `VGA`-color with the specified name.
             *
             * @param name
             * The name of the color to get.
             */
            vga(name: string): IColor;

            /**
             * Gets all `VGA`-colors.
             */
            vga(): IColor[];
        }

        /**
         * Gets all available colors.
         */
        all(): IColor[];
    };

    export = colorNames;
}