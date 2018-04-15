import * as FileSystem from 'fs';
import * as Path from 'path';
import Package from "./Package";
import FileMapping from "./FileMapping";
import SettingsNode from "./SettingsNode";
import TranslationNode from "./Globalization/TranslationNode";
import Style from "./Customization/Style";
import StyleCollection from "./Collections/StyleCollection";
import TemplateListener from "./Customization/TemplateListener";
import Emoji from "./Customization/Emoji";
import Option from "./Option";
import InstructionConfig from './InstructionConfig';
import { isNullOrUndefined } from 'util';

export default class Instruction
{
    /**
     * The package this instruction belongs to.
     */
    private package: Package = null;

    /**
     * The file-mappings of the files provided by this instruction.
     */
    private fileMappings: FileMapping[] = [];

    /**
     * The event-listeners provided by this instruction.
     */
    private eventListeners: EventListener[] = [];

    /**
     * The node that contains the settings provided by this instruction.
     */
    private settingsNode: SettingsNode = null;

    /**
     * The nodes that contains the translations provided by this instruction.
     */
    private translationNodes: TranslationNode[] = [];

    /**
     * The styles provided by this instruction.
     */
    private styles: Style[] = new StyleCollection(this);

    /**
     * The file-mappings of the templates provided by this instruction.
     */
    private templateMappings: FileMapping[] = [];

    /**
     * The file-mappings of the acp-templates provided by this instruction.
     */
    private acpTemplateMappings: FileMapping[] = [];

    /**
     * The template-listeners provided by this instruction.
     */
    private templateListeners: TemplateListener[] = [];

    /**
     * The emojis provided by this instruction.
     */
    private emojis: Emoji[] = [];

    /**
     * Initializes a new instance of the `Instruction` class.
     */
    public constructor(options: Partial<InstructionConfig> = { })
    {
        if (!isNullOrUndefined(options.Package))
        {
            this.package = options.Package;
        }

        if (!isNullOrUndefined(options.Files))
        {
            this.fileMappings.push(...require(options.Files));
        }

        if (!isNullOrUndefined(options.EventListeners))
        {
            this.eventListeners.push(...require(options.EventListeners));
        }

        if (!isNullOrUndefined(options.Options))
        {
            this.settingsNode = require(options.Options);
        }

        if (!isNullOrUndefined(options.Translations))
        {
            this.translationNodes.push(...require(options.Translations));
        }

        if (!isNullOrUndefined(options.StylesRoot))
        {
            if (FileSystem.existsSync(options.StylesRoot))
            {
                let styleFolders = FileSystem.readdirSync(Path.join(options.StylesRoot)).map(
                    entry => Path.join(options.StylesRoot, entry)).filter(
                        entry => FileSystem.lstatSync(entry).isDirectory());
                
                for (let styleFolder of styleFolders)
                {
                    let metaFile = Path.join(styleFolder, 'Style');

                    if (FileSystem.existsSync(metaFile + '.js'))
                    {
                        let currentDir = process.cwd();
                        process.chdir(styleFolder);
                        let style = (require(metaFile) as Style);
                        style.Name = Path.basename(styleFolder);
                        this.styles.push(style);
                        process.chdir(currentDir);
                    }
                }
            }
        }

        if (!isNullOrUndefined(options.TemplateMappings))
        {
            this.templateMappings.push(...require(options.TemplateMappings));
        }

        if (!isNullOrUndefined(options.ACPTemplateMappings))
        {
            this.acpTemplateMappings.push(...require(options.ACPTemplateMappings));
        }

        if (!isNullOrUndefined(options.TemplateListeners))
        {
            this.templateListeners.push(...require(options.TemplateListeners));
        }

        if (!isNullOrUndefined(options.Emojis))
        {
            this.emojis.push(...require(options.Emojis));
        }
    }

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
    public get Options(): { [id: string]: Option }
    {
        if (this.settingsNode)
        {
            return this.settingsNode.GetOptions();
        }
        else
        {
            return { };
        }
    }

    /**
     * Gets the categories provided by this package.
     */
    public get Categories(): SettingsNode[]
    {
        if (this.settingsNode)
        {
            return this.settingsNode.GetCategories();
        }
        else
        {
            return [];
        }
    }

    /**
     * Gets the nodes that contains the translations provided by this package.
     */
    public get TranslationNodes(): TranslationNode[]
    {
        return this.translationNodes;
    }

    /**
     * Gets the translations provided by this packages.
     */
    public get Translations(): TranslationNode[]
    {
        let result: TranslationNode[] = [];
        result.push(...this.TranslationNodes);

        if (this.SettingsNode)
        {
            for (let settingsTranslationNode of this.SettingsNode.TranslationNodes)
            {
                let sameNodes = result.filter((value: TranslationNode) =>
                {
                    return value.Name === settingsTranslationNode.Name
                });

                if (sameNodes.length > 0)
                {
                    sameNodes[0].Nodes.push(...settingsTranslationNode.Nodes);
                }
                else
                {
                    result.push(settingsTranslationNode);
                }
            }
        }

        return result;
    }

    /**
     * Gets the styles provided by this package.
     */
    public get Styles(): Style[]
    {
        return this.styles;
    }

    /**
     * Gets the file-mappings of the templates provided by this instruction.
     */
    public get TemplateMappings(): FileMapping[]
    {
        return this.templateMappings;
    }

    /**
     * Gets the file-mappings of the acp-templates provided by this instruction.
     */
    public get ACPTemplateMappings(): FileMapping[]
    {
        return this.acpTemplateMappings;
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