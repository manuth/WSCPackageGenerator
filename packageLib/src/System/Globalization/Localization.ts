import { ILocalization } from "./ILocalization";

/**
 * Represents a localizable string.
 */
export class Localization
{
    /**
     * Strings translated to the specified `locale`.
     */
    public Data: ILocalization = {};

    /**
     * Gets the locales of the translations.
     */
    public GetLocales(): string[]
    {
        return Object.keys(this.Data);
    }
}