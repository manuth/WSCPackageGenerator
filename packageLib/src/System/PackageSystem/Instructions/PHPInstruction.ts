/**
 * Represents an instruction which executes `php`-code.
 */
export class PHPInstruction
{
    /**
     * The applicatino to load the php-file from.
     */
    private application: string;

    /**
     * Gets or sets the applicatino to load the php-file from.
     */
    public get Application(): string
    {
        return this.application;
    }

    public set Appliaction(value: string)
    {
        this.application = value;
    }
}