import { TempFile } from "../../FileSystem/TempFile";
import { ILocalizationInstruction } from "../../PackageSystem/Instructions/Globalization/ILocalizationInstruction";
import { Compiler } from "../Compiler";
import { LocalizationFileCompiler } from "../Globalization/LocalizationFileCompiler";

export class LocalizationInstructionCompiler extends Compiler<ILocalizationInstruction>
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
            await this.CopyTemplate(tempFile.FileName, this.MakeDestinationPath(`${locale}.xml`));
            tempFile.Dispose();
        }
    }
}