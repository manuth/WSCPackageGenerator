import ISettingsNodeOptions from "./ISettingsNodeOptions";
import INodeContainer from "../../Nodes/INodeContainer";
import SettingsNode from "./SettingsNode";

export default interface ISettingsNode extends INodeContainer<SettingsNode>, Required<ISettingsNodeOptions>
{
}