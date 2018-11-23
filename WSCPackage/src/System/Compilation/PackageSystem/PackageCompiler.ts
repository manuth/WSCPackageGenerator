import * as FileSystem from "fs-extra";
import { TempDirectory } from "temp-filesystem";
import { Package } from "../../PackageSystem/Package";
import { Compiler } from "../Compiler";
import { InstructionSetCompiler } from "./InstructionSetCompiler";
import { PackageFileCompiler } from "./PackageFileCompiler";

/**
 * Provides the functionality to compile packages.
 */
export class PackageCompiler extends Compiler<Package>
{
    /**
     * Initializes a new instance of the `PackageCompiler` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: Package)
    {
        super(item);
    }

    protected async Compile(): Promise<void>
    {
        let tempDir: TempDirectory = new TempDirectory();
        {
            for (let additionalFile of this.Item.AdditionalFiles)
            {
                FileSystem.copy(additionalFile.Source, additionalFile.FileName);
            }

            let compiler: PackageFileCompiler = new PackageFileCompiler(this.Item);
            compiler.DestinationPath = tempDir.MakePath("package.xml");
            await compiler.Execute();
            let installSetCompiler: InstructionSetCompiler = new InstructionSetCompiler(this.Item.InstallSet);
            installSetCompiler.DestinationPath = tempDir.FullName;
            await installSetCompiler.Execute();

            for (let updateSet of this.Item.UpdateSets)
            {
                let updateSetCompiler: InstructionSetCompiler = new InstructionSetCompiler(updateSet);
                updateSetCompiler.DestinationPath = tempDir.FullName;
                await installSetCompiler.Execute();
            }

            await this.Compress(tempDir.FullName, this.DestinationPath);
        }
        tempDir.Dispose();
    }
}