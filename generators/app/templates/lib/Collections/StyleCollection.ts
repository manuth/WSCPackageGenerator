import Style from "../Customization/Style";
import Instruction from "../Instruction";
import { isNullOrUndefined } from "util";

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

            if (this.instruction.Package)
            {
                if (isNullOrUndefined(item.Date))
                {
                    item.Date = this.instruction.Package.Date;
                }

                if (isNullOrUndefined(item.Version))
                {
                    item.Version = this.instruction.Package.Version;
                }

                if (isNullOrUndefined(item.Author.Name))
                {
                    item.Author.Name = this.instruction.Package.Author.Name;
                }

                if (isNullOrUndefined(item.Author.URL))
                {
                    item.Author.URL = this.instruction.Package.Author.URL;
                }

                if (isNullOrUndefined(item.License))
                {
                    item.License = this.instruction.Package.License;
                }
            }
        }

        return super.push(...items);
    }
}