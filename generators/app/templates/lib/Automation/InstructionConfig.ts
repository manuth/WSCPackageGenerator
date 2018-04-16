import Component from "../Component";
import Package from "../Package";
import FileMapping from "../FileMapping";

/**
 * Represents a package-configuration.
 */
export default class InstructionConfig
{
    /**
     * The package this instruction belongs to.
     */
    private package: Package = null;

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
     * The config-file of the template-mappings.
     */
    private templateMappings: string = null;

    /**
     * The config-file of the acp template-mappings.
     */
    private acpTemplateMappings: string = null;

    /**
     * The config-file of the template-listeners.
     */
    private templateListeners: string = null;

    /**
     * The config-file of the emojis.
     */
    private emojis: string = null;

    /**
     * Gets or sets the package this instruction belongs to.
     */
    public get Package(): Package
    {
        return this.package;
    }

    public set Package(value: Package)
    {
        this.package = value;
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
     * Gets or sets the config-file of the template-mappings.
     */
    public get TemplateMappings(): string
    {
        return this.templateMappings;
    }

    public set TemplateMappings(value: string)
    {
        this.templateMappings = value;
    }

    /**
     * Gets or sets the config-file of the acp template-mappings.
     */
    public get ACPTemplateMappings(): string
    {
        return this.acpTemplateMappings;
    }

    public set ACPTemplateMappings(value: string)
    {
        this.acpTemplateMappings = value;
    }

    /**
     * Gets or sets the config-file of the template-listeners.
     */
    public get TemplateListeners(): string
    {
        return this.templateListeners;
    }

    public set TemplateListeners(value: string)
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