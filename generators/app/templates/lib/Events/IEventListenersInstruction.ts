import IEventListenersInstructionOptions from "./IEventListenersInstructionOptions";
import IFileInstruction from "../Automation/IFileInstruction";

export default interface IEventListenersInstruction extends IFileInstruction, Required<IEventListenersInstructionOptions>
{
}