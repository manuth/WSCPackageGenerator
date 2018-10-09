import * as FileSystem from "fs-extra";
import * as Path from "path";
import { parse } from "sass-variable-parser";

/**
 * Provides the functionality to parse `sass`-variable files.
 */
export class SassVariableParser
{
    /**
     * The filename of the scss-file to parse.
     */
    private fileName: string;

    /**
     * Provides the functionality to parse an scss-file.
     *
     * @param fileName
     * The filename of the scss-file to parse.
     */
    public constructor(fileName: string)
    {
        this.fileName = fileName;
    }

    /**
     * Parses the scss-file.
     *
     * @returns
     * The variables inside the scss-file.
     */
    public Parse(): { [key: string]: string }
    {
        let currentDir: string = process.cwd();

        try
        {
            let variables: { [key: string]: string } = parse(
                FileSystem.readFileSync(this.fileName).toString(),
                {
                    camelCase: false,
                    cwd: Path.dirname(this.fileName)
                }) as { [key: string]: string };

            return variables;
        }
        catch (exception)
        {
            throw exception;
        }
        finally
        {
            process.chdir(currentDir);
        }
    }
}