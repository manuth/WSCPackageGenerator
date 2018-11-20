/**
 * Provides options for the `Emoji` class.
 */
export interface IEmojiOptions
{
    /**
     * The name of the emoji.
     */
    Name: string;

    /**
     * The human-readable name of the emoji.
     */
    DisplayName: string;

    /**
     * The aliases of the emoji.
     */
    Aliases?: string[];

    /**
     * A value indicating at which position the emoji is displayed.
     */
    ShowOrder?: number;

    /**
     * The filename relative to the root of WoltLab Suite Core of the emoji.
     */
    FileName: string;

    /**
     * The filename relative to the root of WoltLab Suite Core of the high-resolution emoji.
     */
    HighResFileName?: string;
}