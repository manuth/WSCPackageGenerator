import { Instruction } from "./Instruction";

/**
 * Represents a collection of `Instruction`s.
 */
export class InstructionCollection<T extends Instruction> extends Array<T>
{
}