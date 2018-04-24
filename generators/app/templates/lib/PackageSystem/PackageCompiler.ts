import * as FileSystem from "fs-extra";
import * as memFs from "mem-fs";
import * as memFsEditor from "mem-fs-editor";
import * as Path from "path";
import Compiler from "../Compiler";
import FilesInstruction from "../FilesInstruction";
import InstructionCollection from "../Automation/InstructionCollection";
import InstructionCollectionCompiler from "./InstructionCollectionCompiler";
import Package from "./Package";
const MemFileSystem = memFsEditor.create(memFs.create());

/**
 * Provides the functionality to compile packages.
 */
export default class PackageCompiler extends Compiler<Package>
{
    /**
     * The path to the directory which contains the source-files.
     */
    private sourcePath: string;

    /**
     * The path to save compiled styles to.
     */
    private stylesPath: string;

    /**
     * The path to save compiled components to.
     */
    private componentsPath: string;

    /**
     * 
     * @param pkg 
     * The package to compile.
     * 
     * @param sourcePath 
     * The path to the directory which contains the source-files.
     * 
     * @param destinationPath
     * The path to save the compiled item to.
     * 
     * @param stylesPath
     * The path to save compiled styles to.
     * 
     * @param componentsPath
     * The path to save compiled components to.
     */
    public constructor(pkg: Package, sourcePath: string = "obj", destinationPath: string = "bin", stylesPath: string = "styles", componentsPath: string = "components")
    {
        super(pkg, destinationPath);
        this.sourcePath = sourcePath;
        this.stylesPath = stylesPath;
        this.componentsPath = componentsPath;
    }

    /**
     * Gets the path to the directory which contains the source-files.
     */
    public get SourcePath(): string
    {
        return this.sourcePath;
    }

    /**
     * Compiles the item.
     */
    protected async Compile()
    {
        await FileSystem.emptyDir(this.DestinationPath);
        await FileSystem.emptyDir(this.sourcePath);

        MemFileSystem.copyTpl(
            this.MakeTemplatePath("package.xml"),
            this.MakeSourcePath("package.xml"),
            { Package: this.Item, StylesPath: this.stylesPath, ComponentsPath: this.componentsPath });
        
        if (this.Item.InstallInstructions.length > 0)
        {
            await new InstructionCollectionCompiler(
                this.Item.InstallInstructions,
                this.SourcePath,
                this.stylesPath,
                this.componentsPath).Execute();
        }

        for (let instructionCollection of this.Item.UpdateInstructions)
        {
            await new InstructionCollectionCompiler(
                instructionCollection,
                this.SourcePath,
                this.stylesPath,
                this.componentsPath).Execute();
        }

        for (let additionalFiles of this.Item.AdditionalFiles)
        {
            if (additionalFiles instanceof FilesInstruction)
            {
                MemFileSystem.copyTpl(additionalFiles.SourceRoot, this.MakeTempPath(additionalFiles.SourceRoot), this.Item);
                this.Compress(this.MakeTempPath(additionalFiles.SourceRoot), this.MakeSourcePath(additionalFiles.FileName));
            }
            else
            {
                MemFileSystem.copyTpl(additionalFiles.SourceRoot, this.MakeSourcePath(additionalFiles.FileName), this.Item);
            }
        }

        await new Promise((resolve) =>
        {
            MemFileSystem.commit([], () =>
            {
                resolve();
            });
        });

        this.Compress(this.MakeSourcePath(), this.MakeDestinationPath(this.Item.Name + ".tar"));
    }

    /**
     * Joins the paths and returns the path contained by the source-folder.
     * 
     * @param path
     * The path that is to be joined.
     */
    protected MakeSourcePath(...path: string[]): string
    {
        return Path.join(this.sourcePath, "package", ...path);
    }
}