import * as FileSystem from "fs-extra";
import * as Path from "path";
import { Theme } from "./Theme";
import { ThemeInstruction } from "./ThemeInstruction";

/**
 * Represents a set of instructions which povide a theme.
 */
export class ThemeInstructionCollection extends Array<ThemeInstruction>
{
    /**
     * Initializes a ner instance of the `ThemeInstructionCollection` class.
     *
     * @param themesRoot
     * The path to the root of the themes.
     */
    public constructor(themesRoot: string)
    {
        super();

        let themeFolders: string[] = FileSystem.readdirSync(Path.join(themesRoot)).map(
            (entry: string) => Path.join(themesRoot, entry)).filter(
                (entry: string) => FileSystem.lstatSync(entry).isDirectory());

        for (let themeFolder of themeFolders)
        {
            let metaFile: string = Path.resolve(Path.join(themeFolder, "Theme"));

            if (FileSystem.pathExistsSync(metaFile + ".js"))
            {
                let currentDir: string = process.cwd();
                process.chdir(themeFolder);
                let theme: Theme = (require(metaFile) as Theme);
                theme.Name = Path.basename(themeFolder);
                this.push(new ThemeInstruction({ SourceRoot: themeFolder, Theme: theme }));
                process.chdir(currentDir);
            }
        }
    }
}