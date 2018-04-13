import Style from "../Customization/Style";
import Instruction from "../Instruction";

/**
 * Represents a set of style.
 */
export default class StyleCollection<T extends Style> extends Array<T>
{
    /**
     * The package this collection belongs to.
     */
    private instruction: Instruction;

    /**
     * Initializes a new instance of the `StyleCollection` class.
     * 
     * @param instruction
     * The instruction this collection belongs to.
     */
    public constructor(instruction: Instruction)
    {
        super();
        this.instruction = instruction;
    }

    public push(...items: T[])
    {
        for (let item of items)
        {
            item.Instruction = this.instruction;
        }

        return super.push(...items);
    }
}