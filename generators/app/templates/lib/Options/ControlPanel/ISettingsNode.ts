import INodeContainer from "../../Nodes/INodeContainer";
import Localizable from "../../GLobalization/Localizable";
import Node from "../../Nodes/Node";
import Option from "./Option";
import SettingsNode from "./SettingsNode";

/**
 * Represents a node that contains options and categories.
 */
export default interface ISettingsNode extends INodeContainer
{
    /**
     * Gets the displayname of the node.
     */
    DisplayName?: Localizable;
    
    /**
     * Gets the description of the node.
     */
    Description?: Localizable;
    
    /**
     * Gets the nodes contained by this node.
     */
    Nodes?: SettingsNode[];
    
    /**
     * Gets the options contained by this node.
     */
    Options?: Option[];

    /**
     * The parent of the settings-node.
     */
    Parent?: Node;
}