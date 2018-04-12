/**
 * Represents a localizable string.
 */
export default class Localizable
{
    /**
     * A string translated to the specified `locale`.
     */
    [locale: string]: string;
}