import WSCNode from "./NodeContainer";
import NodeCollection from "./Collections/NodeCollection";
import Option from "./Option";
import Localizable from "./Globalization/Localizable";

/**
 * Represents a node that contains options and categories.
 */
export default class SettingsNode extends WSCNode
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

        if (options.DisplayName)
        {
            Object.assign(this.DisplayName, options.DisplayName);
        }

        if (options.Description)
        {
            Object.assign(this.Description, options.Description);
        }

        if (options.Nodes)
        {
            this.settingsNodes.push(...options.Nodes);
        }

        if (options.Options)
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
}