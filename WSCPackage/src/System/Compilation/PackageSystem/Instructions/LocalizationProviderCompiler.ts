import { ILocalizationInstruction } from "../../../PackageSystem/Instructions/Globalization/ILocalizationInstruction";
import { InstructionCompiler } from "./InstructionCompiler";
import { LocalizationInstructionCompiler } from "./LocalizationInstructionCompiler";

/**
 * Provides the functionality to compile files which provide localizations.
 */
export class LocalizationProviderCompiler<T extends ILocalizationInstruction> extends InstructionCompiler<T>
{
    /**
     * Initializes a new instance of the `LocalizationProviderCompiler<T>` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: T)
    {
        super(item);
    }

    public Serialize()
    {
        let document = super.Serialize();

        if (Object.keys(this.Item.GetMessages()).length > 0)
        {
            let childNodes = new LocalizationInstructionCompiler(this.Item).Serialize().childNodes;

            for (let i = 0; i < childNodes.length; i++)
            {
                let node = childNodes.item(i);
                document.appendChild(node);
            }
        }

        return document;
    }

    protected async Compile()
    {
        let compiler = new LocalizationInstructionCompiler(this.Item);
        compiler.DestinationPath = this.DestinationPath;
        await compiler.Execute();
    }
}