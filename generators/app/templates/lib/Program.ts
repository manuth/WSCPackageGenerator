import * as ChildProcess from "child_process";
import * as FileSystem from "fs-extra";
import * as memFs from "mem-fs";
import * as memFsEditor from "mem-fs-editor";
import * as Path from "path";
import * as WSCPackage from "../Package";
import EmojisInstruction from "./Customization/EmojisInstruction";
import EventListenersInstruction from "./Events/EventListenersInstruction";
import FilesInstruction from "./FilesInstruction";
import InstructionCollection from "./Automation/InstructionCollection";
import InstructionCollectionCompiler from "./PackageSystem/InstructionCollectionCompiler";
import OptionsInstruction from "./ControlPanel/OptionsInstruction";
import PackageCompiler from "./PackageSystem/PackageCompiler";
import StyleInstruction from "./Customization/StyleInstruction";
import TemplateListenersInstruction from "./Customization/TemplateListenersInstruction";
import TemplatesInstruction from "./Customization/TemplatesInstruction";
import TranslationsInstruction from "./Globalization/TranslationsInstruction";
const MemFileSystem = memFsEditor.create(memFs.create());


/**
 * Represents the main entry-point of the script.
 */
class Program
{
    /**
     * The destination-path.
     */
    private static destinationPath: string = "bin";

    /**
     * The temp-path.
     */
    private static tempPath: string = "obj";

    /**
     * The style-path.
     */
    private static stylesPath: string = "styles";

    /**
     * The components-path.
     */
    private static componentsPath: string = "components";
    
    /**
     * The main entry-point of the script.
     * 
     * @param args The arguments passed to the script.
     */
    public static async Main(args: string[])
    {
        await new PackageCompiler(WSCPackage, this.tempPath, this.destinationPath, this.stylesPath, this.componentsPath).Execute();
    }
}

Program.Main(process.argv);