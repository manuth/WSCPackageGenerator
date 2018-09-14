import * as FileSystem from "fs-extra";
import * as Path from "path";
import { parse } from "sass-variable-parser";


/**
 * Provides the functionality to parse `sass`-variable files.
 */
export class SassVariableParser
{
    /**
     * The parsed variables.
     */
    private variables: { [key: string]: string } = {};

    public constructor(fileName: string)
    {
        let currentDir: string = process.cwd();
        {
            let variables: { [key: string]: string } = parse(
                FileSystem.readFileSync(fileName).toString(),
                {
                    camelCase: false,
                    cwd: Path.dirname(fileName)
                });

            for (let name in variables)
            {
                this.variables[name] = variables[name];
            }
        }
        process.chdir(currentDir);
    }

    /**
     * Gets the parsed variables.
     */
    public get Variables(): Readonly<{ [key: string]: string }>
    {
        return this.variables;
    }
}