import { TempFile } from "../../FileSystem/TempFile";
import { ILocalizationInstruction } from "../../PackageSystem/Instructions/Globalization/ILocalizationInstruction";
import { LocalizationFileCompiler } from "../Globalization/LocalizationFileCompiler";
import { InstructionCompiler } from "./InstructionCompiler";

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
}