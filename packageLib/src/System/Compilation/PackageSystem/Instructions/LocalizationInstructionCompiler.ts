import escapeStringRegexp = require("escape-string-regexp");
import * as Path from "path";
import { TempFile } from "../../../FileSystem/TempFile";
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

    protected async Compile(): Promise<void>
    {
        let messages: { [locale: string]: { [category: string]: { [key: string]: string } } } = this.Item.GetMessages();

        for (let locale in messages)
        {
            let tempFile: TempFile = new TempFile();
            let compiler: LocalizationFileCompiler = new LocalizationFileCompiler([locale, messages[locale]]);
            compiler.DestinationPath = tempFile.FileName;
            await compiler.Execute();
            await this.CopyTemplate(tempFile.FileName, this.MakePackagePath(this.Item.DestinationRoot, this.Item.TranslationDirectory, `${locale}.xml`));
            tempFile.Dispose();
        }
    }

    public Serialize(): Document
    {
        let document: Document = super.Serialize();
        document.documentElement.textContent = this.MakePackagePath(
            this.Item.DestinationRoot,
            this.Item.TranslationDirectory,
            "*").replace(new RegExp(escapeStringRegexp(Path.sep), "g"), "/");
        return document;
    }
}