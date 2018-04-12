import Component from "./Component";

/**
 * Represents a package-configuration.
 */
export default class PackageConfig extends Component
{
    /**
     * The identifier of the package.
     */
    private identifier: string = '';

    /**
     * The config-file of the file-mappings.
     */
    private files: string = null;

    /**
     * The config-file of the event-listeners.
     */
    private eventListeners: string = null;

    /**
     * The config-file of the options.
     */
    private options: string = null;

    /**
     * The config-file of the translations.
     */
    private translations: string = null;

    /**
     * The config-file of the error-messages.
     */
    private errors: string = null;

    /**
     * The folder that contains the styles.
     */
    private stylesRoot: string = null;

    /**
     * The folder that contains the templates.
     */
    private templatesRoot: string = null;

    /**
     * The folder that contains the acp-templates.
     */
    private acpTemplatesRoot: string = null;

    /**
     * The config-file of the template-listeners.
     */
    private templateListeners: string = null;

    /**
     * The config-file of the emojis.
     */
    private emojis: string = null;

    /**
     * Gets or sets the identifier of the package.
     */
    public get Identifier(): string
    {
        return this.identifier;
    }

    public set Identifier(value: string)
    {
        this.identifier = value;
    }

    /**
     * Gets or sets the config-file of the file-mappings.
     */
    public get Files(): string
    {
        return this.files;
    }

    public set Files(value: string)
    {
        this.files = value;
    }

    /**
     * Gets or sets the config-file of the event-listeners.
     */
    public get EventListeners(): string
    {
        return this.eventListeners;
    }

    public set EventListeners(value: string)
    {
        this.eventListeners = value;
    }

    /**
     * Gets or sets the config-file of the options.
     */
    public get Options(): string
    {
        return this.options;
    }

    public set Options(value: string)
    {
        this.options = value;
    }

    /**
     * Gets or sets the config-file of the translations.
     */
    public get Translations(): string
    {
        return this.translations;
    }

    public set Translations(value: string)
    {
        this.translations = value;
    }

    /**
     * Gets or sets the config-file of the error-messages.
     */
    public get Errors(): string
    {
        return this.errors;
    }

    public set Errors(value: string)
    {
        this.errors = value;
    }

    /**
     * Gets or sets the folder that contains the styles.
     */
    public get StylesRoot(): string
    {
        return this.stylesRoot;
    }

    public set StylesRoot(value: string)
    {
        this.stylesRoot = value;
    }

    /**
     * Gets or sets the folder that contains the templates.
     */
    public get TemplatesRoot(): string
    {
        return this.templatesRoot;
    }

    public set TemplatesRoot(value: string)
    {
        this.templatesRoot = value;
    }

    /**
     * Gets or sets the folder that contains the acp-templates.
     */
    public get ACPTemplatesRoot(): string
    {
        return this.acpTemplatesRoot;
    }

    public set ACPTemplatesRoot(value: string)
    {
        this.acpTemplatesRoot = value;
    }

    /**
     * Gets or sets the config-file of the template-listeners.
     */
    public get TemplateListeners(): string
    {
        return this.templateListeners;
    }

    public set TemplatesListeners(value: string)
    {
        this.templateListeners = value;
    }

    /**
     * Gets or sets the config-file of the emojis.
     */
    public get Emojis(): string
    {
        return this.emojis;
    }

    public set Emojis(value: string)
    {
        this.emojis = value;
    }
}