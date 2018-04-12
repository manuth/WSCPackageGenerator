import * as FileSystem from 'fs';
import * as Path from 'path';
import Component from "./Component";
import SettingsNode from "./SettingsNode";
import Option from "./Option";
import TranslationNode from "./Globalization/TranslationNode";
import Translation from "./Globalization/Translation";
import ErrorMessageNode from "./Globalization/ErrorMessageNode";
import ErrorMessage from "./Globalization/ErrorMessage";
import Style from "./Customization/Style";
import StyleCollection from "./Collections/StyleCollection";
import FileMapping from "./FileMapping";
import TemplateListener from "./Customization/TemplateListener";
import Emoji from "./Customization/Emoji";
import PackageConfig from "./PackageConfig";

/**
 * Represents a package for WoltLab Suite Core.
 */
export default class Package extends Component
{
    /**
     * The identifier of the package.
     */
    private identifier: string = '';

    /**
     * The file-mappings of the files provided by this package.
     */
    private fileMappings: FileMapping[] = [];

    /**
     * The event-listeners provided by this package.
     */
    private eventListeners: EventListener[] = [];

    /**
     * The node that contains the settings provided by this package.
     */
    private settingsNode: SettingsNode = new SettingsNode();

    /**
     * The node that contains the translations provided by this package.
     */
    private translationNode: TranslationNode = new TranslationNode();

    /**
     * The node that contains error-messages provided by this package.
     */
    private errorMessageNode: ErrorMessageNode = new ErrorMessageNode();

    /**
     * The styles provided by this package.
     */
    private styles: Style[] = new StyleCollection(this);

    /**
     * The root of the template-files provided by this package.
     */
    private templateRoot: string = null;

    /**
     * The root of the template-files for the acp provided by this package.
     */
    private acpTemplateRoot: string = null;

    /**
     * The template-listeners provided by this package.
     */
    private templateListeners: TemplateListener[] = [];

    /**
     * The emojis provided by this package.
     */
    private emojis: Emoji[] = [];

    /**
     * Initializes a new instance of the `Package` class.
     */
    public constructor(options: Partial<PackageConfig> = { })
    {
        super(options);

        if (options.Identifier)
        {
            this.identifier = options.Identifier;
        }

        if (options.Files)
        {
            this.fileMappings.push(...require(options.Files));
        }

        if (options.EventListeners)
        {
            this.eventListeners.push(...require(options.EventListeners));
        }

        if (options.Options)
        {
            this.settingsNode = require(options.Options);
        }

        if (options.Translations)
        {
            this.translationNode = require(options.Translations);
        }

        if (options.Errors)
        {
            this.errorMessageNode = require(options.Errors);
        }

        if (options.StylesRoot)
        {
            let styleFolders = FileSystem.readdirSync(Path.join(__dirname, options.StylesRoot)).map(
                entry => Path.join(__dirname, options.StylesRoot, entry)).filter(
                    entry => FileSystem.lstatSync(entry).isDirectory());
            
            for (let styleFolder of styleFolders)
            {
                let metaFile = Path.join(styleFolder, 'style');

                if (FileSystem.existsSync(metaFile + '.js'))
                {
                    this.styles.push(require(metaFile));
                }
            }
        }

        if (options.TemplatesRoot)
        {
            this.templateRoot = options.TemplatesRoot;
        }

        if (options.ACPTemplatesRoot)
        {
            this.acpTemplateRoot = options.ACPTemplatesRoot;
        }

        if (options.TemplateListeners)
        {
            this.templateListeners.push(...require(options.TemplateListeners));
        }

        if (options.Emojis)
        {
            this.emojis.push(...require(options.Emojis));
        }
    }

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
     * Gets the file-mappings of the files provided by this package.
     */
    public get FileMappings(): FileMapping[]
    {
        return this.fileMappings;
    }

    /**
     * Gets the event-listeners provided by this package.
     */
    public get EventListeners(): EventListener[]
    {
        return this.eventListeners;
    }

    /**
     * Gets the node that contains the settings provided by this package.
     */
    public get SettingsNode(): SettingsNode
    {
        return this.settingsNode;
    }

    public set SettingsNode(value: SettingsNode)
    {
        this.settingsNode = value;
    }

    /**
     * Gets the options provided by this package.
     */
    public get Options(): Option[]
    {
        return [];
    }

    /**
     * Gets the categories provided by this package.
     */
    public get Categories(): SettingsNode[]
    {
        return [];
    }

    /**
     * Gets the node that contains the translations provided by this package.
     */
    public get TranslationNode(): TranslationNode
    {
        return this.translationNode;
    }

    public set TranslationNode(value: TranslationNode)
    {
        this.translationNode = value;
    }

    /**
     * Gets the translations provided by this packages.
     */
    public get Translations(): Translation[]
    {
        return [];
    }

    /**
     * Gets the node that contains error-messages provided by this package.
     */
    public get ErrorMessageNode(): ErrorMessageNode
    {
        return this.errorMessageNode;
    }

    /**
     * Gets the error-messages provided by this package.
     */
    public get ErrorMessages(): ErrorMessage[]
    {
        return [];
    }

    /**
     * Gets the styles provided by this package.
     */
    public get Styles(): Style[]
    {
        return this.styles;
    }

    /**
     * Gets or sets the root of the template-files provided by this package.
     */
    public get TemplateRoot(): string
    {
        return this.templateRoot;
    }

    public set TemplateRoot(value: string)
    {
        this.templateRoot = value;
    }

    /**
     * Gets or sets the root of the template-files for the acp provided by this package.
     */
    public get ACPTemplateRoot(): string
    {
        return this.acpTemplateRoot;
    }

    public set ACPTemplateRoot(value: string)
    {
        this.acpTemplateRoot = value;
    }

    /**
     * Gets or sets the template-listeners provided by this package.
     */
    public get TemplateListeners(): TemplateListener[]
    {
        return this.templateListeners;
    }

    /**
     * Gets the emojis provided by this package.
     */
    public get Emojis(): Emoji[]
    {
        return this.emojis;
    }
}