/**
 * Represents an emoji.
 * 
 * Please keep in mind to provide the files using a `FilesInstruction`.
 */
export default interface IEmoji
{
    /**
     * Gets the title of the emoji.
     */
    Title: string;
    
    /**
     * Gets or sets the name of the emoji.
     */
    Name: string;
    
    /**
     * Gets or sets the filename relative to the root of WoltLab Suite Core of the emoji.
     */
    FileName: string;
    
    /**
     * Gets or sets the filename relative to the root of WoltLab Suite Core of the high-resolution emoji.
     */
    HighResFileName?: string;
    
    /**
     * Gets the aliases of the emoji.
     */
    Aliases?: string[];
    
    /**
     * Gets or sets a value indicating at which position the emoji is displayed.
     */
    ShowOrder?: number;
}