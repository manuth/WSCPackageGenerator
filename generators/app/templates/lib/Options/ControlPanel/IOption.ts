import INode from "../../Nodes/INode";
import IOptionOptions from "./IOptionOptions";

/**
 * Represents an option that can be shown in the ACP.
 */
export default interface IOption extends INode, Required<IOptionOptions>
{
}