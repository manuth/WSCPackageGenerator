import { TempFile } from "temp-filesystem";
import UPath = require("upath");
import { ILocalizationInstruction } from "../../../PackageSystem/Instructions/Globalization/ILocalizationInstruction";
import { LocalizationFileCompiler } from "../../Globalization/LocalizationFileCompiler";
import { InstructionCompiler } from "./InstructionCompiler";

/**
 * Provides the functionality to compile `ILocalizationInstruction`s.
 */
export class LocalizationInstructionCompiler extends InstructionCompiler<ILocalizationInstruction>
{
    /**
     * Initializes a new instance of the `LocalizationInstructionCompiler` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: ILocalizationInstruction)
    {
        super(item);
    }

    public Serialize(): Document
    {
        let document: Document = super.Serialize();

        if (Object.keys(this.Item.GetMessages()).length > 0)
        {
            document.documentElement.textContent = UPath.normalize(
                this.MakePackagePath(
                    this.Item.DestinationRoot,
                    this.Item.TranslationDirectory,
                    "*"));
            return document;
        }
        else
        {
            return document.implementation.createDocument(null, null, null);
        }
    }

    protected async Compile(): Promise<void>
    {
        let messages: { [locale: string]: { [category: string]: { [key: string]: string } } } = this.Item.GetMessages();

        for (let locale in messages)
        {
            let tempFile: TempFile = new TempFile();
            let compiler: LocalizationFileCompiler = new LocalizationFileCompiler([locale, messages[locale]]);
            compiler.DestinationPath = tempFile.FullName;
            await compiler.Execute();
            await this.CopyTemplate(tempFile.FullName, this.MakePackagePath(this.Item.DestinationRoot, this.Item.TranslationDirectory, `${locale}.xml`));
            tempFile.Dispose();
        }
    }
}