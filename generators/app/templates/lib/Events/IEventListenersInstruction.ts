import { IEventListenersInstructionOptions } from "./IEventListenersInstructionOptions";
import { IFileInstruction } from "../Automation/IFileInstruction";

export interface IEventListenersInstruction extends IFileInstruction, Required<IEventListenersInstructionOptions>
{
}