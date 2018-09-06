/**
 * Provides the functionality to compile a component.
 */
export interface ICompiler
{
    /**
     * Gets the path to save the compiled item to.
     */
    DestinationPath: string;
    
    /**
     * Gets the path to save temporary files to.
     */
    TempPath: string;

    /**
     * Compiles the item.
     */
    Execute();
}