import { IFileInstruction } from "../Automation/IFileInstruction";
import { IEventListenersInstructionOptions } from "./IEventListenersInstructionOptions";

export interface IEventListenersInstruction extends IFileInstruction, Required<IEventListenersInstructionOptions>
{
}