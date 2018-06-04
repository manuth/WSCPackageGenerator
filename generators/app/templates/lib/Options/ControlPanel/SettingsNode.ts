import ISettingsNode from "./ISettingsNode";
import Localizable from "../../Globalization/Localizable";
import NodeCollection from "../../Nodes/NodeCollection";
import NodeContainer from "../../Nodes/NodeContainer";
import Option from "./Option";
import TranslationNode from "../../Globalization/TranslationNode";
import { isNullOrUndefined } from "util";

/**
 * Represents a node that contains options and categories.
 */
export default class SettingsNode extends NodeContainer implements ISettingsNode
{
    /**
     * The displayname of the node.
     */
    private displayName: Localizable = new Localizable();

    /**
     * The description of the node.
     */
    private description: Localizable = new Localizable();

    /**
     * The nodes contained by this node.
     */
    private settingsNodes: SettingsNode[] = new NodeCollection(this);

    /**
     * The options contained by this node.
     */
    private options: Option[] = new NodeCollection(this);

    /**
     * Initializes a new instance of the `SettingsNode` class.
     */
    public constructor(options: ISettingsNode)
    {
        super(options);

        if (!isNullOrUndefined(options.DisplayName))
        {
            Object.assign(this.DisplayName, options.DisplayName);
        }

        if (!isNullOrUndefined(options.Description))
        {
            Object.assign(this.Description, options.Description);
        }

        if (!isNullOrUndefined(options.Nodes))
        {
            this.settingsNodes.push(...options.Nodes);
        }

        if (!isNullOrUndefined(options.Options))
        {
            this.options.push(...options.Options);
        }

        if (!isNullOrUndefined(options.Parent))
        {
            this.Parent = options.Parent;
        }
    }

    public get DisplayName(): Localizable
    {
        return this.displayName;
    }
    
    public get Description(): Localizable
    {
        return this.description;
    }
    
    public get Nodes(): SettingsNode[]
    {
        return this.settingsNodes;
    }

    public get Options(): Option[]
    {
        return this.options;
    }

    /**
     * Gets the translation-nodes of the settings-node.
     */
    public get TranslationNodes(): TranslationNode[]
    {
        let rootNodes: TranslationNode[] = [];
        let childNodes: TranslationNode[] = [];
        let translationNode = new TranslationNode({ Name: "wcf.acp.option" });
    
        if (Object.keys(this.DisplayName).length > 0)
        {
            translationNode.Nodes.push(new TranslationNode({
                Name: "category." + this.FullName,
                Translations: this.DisplayName
            }));
        }

        if (Object.keys(this.Description).length > 0)
        {
            translationNode.Nodes.push(new TranslationNode({
                Name: "category." + this.FullName,
                Nodes: [
                    new TranslationNode({
                        Name: "description",
                        Translations: this.Description
                    })
                ]
            }));
        }

        for (let settingsNode of this.Nodes)
        {
            childNodes.push(...settingsNode.TranslationNodes);
        }

        for (let option of this.Options)
        {
            childNodes.push(...option.TranslationNodes);
        }

        for (let childNode of childNodes)
        {
            if (childNode.Name === translationNode.Name)
            {
                translationNode.Nodes.push(...childNode.Nodes);
            }
            else if (childNode.GetTranslations().length > 0)
            {
                rootNodes.push(childNode);
            }
        }

        if (translationNode.GetTranslations().length > 0)
        {
            rootNodes.splice(0, 0, translationNode);
        }

        return rootNodes;
    }

    /**
     * Gets all options in this node and all its sub-nodes.
     */
    public GetOptions(): { [id: string]: Option }
    {
        let result: { [id: string]: Option } = { };
        
        for (let option of this.Options)
        {
            result[option.ID] = option;
        }

        for (let node of this.Nodes)
        {
            Object.assign(result, node.GetOptions());
        }

        return result;
    }

    /**
     * Gets all categories in this node and all its sub-nodes.
     */
    public GetCategories(): SettingsNode[]
    {
        let result: SettingsNode[] = [];
        result.push(this);

        for (let node of this.Nodes)
        {
            result.push(...node.GetCategories());
        }

        return result;
    }
}