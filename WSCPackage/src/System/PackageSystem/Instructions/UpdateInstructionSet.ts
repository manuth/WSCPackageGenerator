import { XMLEditor } from "../../Serialization/XMLEditor";
import { Package } from "../Package";
import { InstructionSet } from "./InstructionSet";

/**
 * Represents a collection of instructions for updating a package.
 */
export class UpdateInstructionSet extends InstructionSet
{
    /**
     * The version to update the package from.
     */
    private fromVersion: string;

    /**
     * Initializes a new instance of the `UpdateInstructionSet` class.
     */
    public constructor($package: Package, fromVersion: string)
    {
        super($package);
        this.FromVersion = fromVersion;
    }

    /**
     * Gets or sets the version to update the package from.
     */
    public get FromVersion(): string
    {
        return this.fromVersion;
    }

    public set FromVersion(value: string)
    {
        this.fromVersion = value;
    }
    public Serialize(): Element
    {
        let editor: XMLEditor = new XMLEditor(super.Serialize());
        editor.SetAttribute("type", "update");
        editor.SetAttribute("fromversion", this.FromVersion);
        return editor.Element;
    }
}