import INodeContainer from "../../Nodes/INodeContainer";
import ISettingsNodeOptions from "./ISettingsNodeOptions";
import SettingsNode from "./SettingsNode";

export default interface ISettingsNode extends INodeContainer<SettingsNode>, Required<ISettingsNodeOptions>
{
}