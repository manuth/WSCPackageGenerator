import Style from "../Customization/Style";
import ComponentCollection from "../Automation/ComponentCollection";
import { isNull } from "util";

/**
 * Represents a set of style.
 */
export default class StyleCollection<T extends Style> extends Array<T>
{
    /**
     * The package this collection belongs to.
     */
    private instruction: ComponentCollection;

    /**
     * Initializes a new instance of the `StyleCollection` class.
     * 
     * @param instruction
     * The instruction this collection belongs to.
     */
    public constructor(instruction: ComponentCollection)
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
                if (isNull(item.Date))
                {
                    item.Date = this.instruction.Package.Date;
                }

                if (isNull(item.Version))
                {
                    item.Version = this.instruction.Package.Version;
                }

                if (isNull(item.Author.Name))
                {
                    item.Author.Name = this.instruction.Package.Author.Name;
                }

                if (isNull(item.Author.URL))
                {
                    item.Author.URL = this.instruction.Package.Author.URL;
                }

                if (isNull(item.License))
                {
                    item.License = this.instruction.Package.License;
                }
            }
        }

        return super.push(...items);
    }
}