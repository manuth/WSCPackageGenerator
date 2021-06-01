/**
 * Represents a woltlab-unit.
 */
export enum WoltLabUnitName
{
    /**
     * Indicates a file-upload.
     */
    FileUpload = "woltLabFiles",

    /**
     * Indicates the creation of cron-jobs.
     */
    CronJob = "woltLabCron",

    /**
     * Indicates the execution of php-scripts.
     */
    PHPScript = "woltLabPHPScript",

    /**
     * Indicates the execution of sql-scripts.
     */
    SQLScript = "woltLabSqlScript",

    /**
     * Indicates translations.
     */
    Translations = "woltLabTranslations",

    /**
     * Indicates error-messages.
     */
    ErrorMessages = "woltLabErrorMessages",

    /**
     * Indicates acp-options.
     */
    ACPOptions = "woltLabACPOptions",

    /**
     * Indicates user-options.
     */
    UserOptions = "woltLabUserOptions",

    /**
     * Indicates group-options.
     */
    GroupOptions = "woltLabGroupOptions",

    /**
     * Indicates emojis.
     */
    Emojis = "woltLabEmojis",

    /**
     * Indicates bb-codes.
     */
    BBCodes = "woltLabBBCodes",

    /**
     * Indicates templates.
     */
    Templates = "woltLabTemplates",

    /**
     * Indicates admin-templates.
     */
    ACPTemplates = "woltLabACPTemplates",

    /**
     * Indicates event-listeners.
     */
    EventListeners = "woltLabEventListeners",

    /**
     * Indicates template-listeners.
     */
    TemplateListeners = "woltLabTemplateListeners"
}
