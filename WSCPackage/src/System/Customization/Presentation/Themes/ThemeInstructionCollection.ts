import * as FileSystem from "fs-extra";
import * as Path from "path";
import { ThemeInstruction } from "../../../PackageSystem/Instructions/Customization/Presentation/ThemeInstruction";
import { IThemeOptions } from "./IThemeOptions";

/**
 * Represents a set of theme-instructions.
 */
export class ThemeInstructionCollection extends Array<ThemeInstruction>
{
    /**
     * Initializes a new instance of the `ThemeInstructionCollection` class.
     *
     * @param path
     * The path to look for themes.
     */
    public constructor(path: string)
    {
        super();

        let themeFolders: string[] = FileSystem.pathExistsSync(path) ? FileSystem.readdirSync(path).map(
            (entry: string) => Path.join(path, entry)).filter(
                (entry: string) => FileSystem.lstatSync(entry).isDirectory()) : [];

        for (let themeFolder of themeFolders)
        {
            let metaFile: string = Path.resolve(Path.join(themeFolder, "Theme"));

            if (FileSystem.pathExistsSync(metaFile + ".ts"))
            {
                let currentDir: string = process.cwd();
                process.chdir(themeFolder);
                {
                    let theme: IThemeOptions = require(metaFile) as IThemeOptions;
                    this.push(new ThemeInstruction({ Theme: theme }));
                }
                process.chdir(currentDir);
            }
        }
    }
}