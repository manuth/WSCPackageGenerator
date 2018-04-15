import NodeContainer from './NodeContainer';
import NodeCollection from './Collections/NodeCollection';
import Option from './Option';
import Localizable from './Globalization/Localizable';
import { isUndefined } from 'util';
import TranslationNode from './Globalization/TranslationNode';

/**
 * Represents a node that contains options and categories.
 */
export default class SettingsNode extends NodeContainer
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
    public constructor(options: Partial<SettingsNode> = { })
    {
        super({ Name: options.Name, Parent: options.Parent });

        if (!isUndefined(options.DisplayName))
        {
            Object.assign(this.DisplayName, options.DisplayName);
        }

        if (!isUndefined(options.Description))
        {
            Object.assign(this.Description, options.Description);
        }

        if (!isUndefined(options.Nodes))
        {
            this.settingsNodes.push(...options.Nodes);
        }

        if (!isUndefined(options.Options))
        {
            this.options.push(...options.Options);
        }
    }

    /**
     * Gets the displayname of the node.
     */
    public get DisplayName(): Localizable
    {
        return this.displayName;
    }
    
    /**
     * Gets the description of the node.
     */
    public get Description(): Localizable
    {
        return this.description;
    }
    
    /**
     * Gets the nodes contained by this node.
     */
    public get Nodes(): SettingsNode[]
    {
        return this.settingsNodes;
    }

    /**
     * Gets the options contained by this node.
     */
    public get Options(): Option[]
    {
        return this.options;
    }

    /**
     * Gets the translations of the settings-node.
     */
    public get Translations(): TranslationNode[]
    {
        let result: TranslationNode[] = [];

        if (Object.keys(this.DisplayName).length > 0)
        {
            let displayNameNode = this.GetTranslationNode();
            Object.assign(displayNameNode.Translations, this.DisplayName);
            result.push(displayNameNode);
        }

        if (Object.keys(this.Description).length > 0)
        {
            result.push(
                new TranslationNode({
                    Name: "description",
                    Translations: this.Description,
                    Parent: this.GetTranslationNode() }));
        }

        for (let option of this.Options)
        {
            result.push(...option.Translations);
        }

        for (let node of this.Nodes)
        {
            result.push(...node.Translations);
        }

        return result;
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

    /**
     * Gets the translation-node that belongs to this settings-node.
     */
    public GetTranslationNode(): TranslationNode
    {
        let result: TranslationNode = new TranslationNode({ Name: this.Name });
        let translationNode = result;

        for (let node = (this.Parent as TranslationNode); node !== null; node = (node.Parent as TranslationNode))
        {
            translationNode = new TranslationNode({ Name: node.Name, Nodes: [ translationNode ] });
        }

        translationNode = new TranslationNode({
            Name: "wfc",
            Nodes: [
                new TranslationNode({
                    Name: "acp",
                    Nodes: [
                        new TranslationNode({
                            Name: "option",
                            Nodes: [
                                translationNode
                            ]
                        })
                    ]
                })
            ]
        });

        return result;
    }
}