import * as FileSystem from "fs";
import * as Path from "path";
import { Style } from "./Style";
import { StyleInstruction } from "./StyleInstruction";

/**
 * Represents a set of instructions which povide a style.
 */
export class StyleInstructionCollection extends Array<StyleInstruction>
{
    /**
     * Initializes a ner instance of the `StyleInstructionCollection` class.
     *
     * @param stylesRoot
     * The path to the root of the styles.
     */
    public constructor(stylesRoot: string)
    {
        super();

        let styleFolders: string[] = FileSystem.readdirSync(Path.join(stylesRoot)).map(
            (entry: string) => Path.join(stylesRoot, entry)).filter(
                (entry: string) => FileSystem.lstatSync(entry).isDirectory());

        for (let styleFolder of styleFolders)
        {
            let metaFile: string = Path.resolve(Path.join(styleFolder, "Style"));

            if (FileSystem.existsSync(metaFile + ".js"))
            {
                let currentDir: string = process.cwd();
                process.chdir(styleFolder);
                let style: Style = (require(metaFile) as Style);
                style.Name = Path.basename(styleFolder);
                this.push(new StyleInstruction({ SourceRoot: styleFolder, Style: style }));
                process.chdir(currentDir);
            }
        }
    }
}