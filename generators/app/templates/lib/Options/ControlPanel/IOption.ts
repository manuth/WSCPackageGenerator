import IOptionOptions from "./IOptionOptions";
import INode from "../../Nodes/INode";

/**
 * Represents an option that can be shown in the ACP.
 */
export default interface IOption extends INode, Required<IOptionOptions>
{
}