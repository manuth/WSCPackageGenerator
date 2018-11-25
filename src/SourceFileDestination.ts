import escapeStringRegexp = require("escape-string-regexp");
import Path = require("path");
import { ComponentDestination } from "./ComponentDestination";
import { Generator } from "./Generator";
import { GeneratorSetting } from "./GeneratorSetting";
import { IComponentDestination } from "./IComponentDestination";
import { IGeneratorSettings } from "./IGeneratorSettings";

/**
 * Represents the destination of a WoltLab Suite Core-component.
 */
export class SourceFileDestination<T extends IGeneratorSettings> extends ComponentDestination<T>
{
    /**
     * The id of the file-mapping.
     */
    private id: string;

    /**
     * Initializes a new instance of the `SourceFileDestination<T>` class.
     *
     * @param options
     * The options for the initialization.
     */
    public constructor(generator: Generator<T>, id: string, options: IComponentDestination<T>)
    {
        super(generator, options);
        this.id = id;
        this.Settings.name = `${GeneratorSetting.ComponentSourceFiles}[${id}]`;
    }

    /**
     * Gets or sets the id of the file-mapping.
     */
    public get ID()
    {
        return this.id;
    }

    public GetResult(answers: T)
    {
        return answers[GeneratorSetting.ComponentSourceFiles][this.ID];
    }

    public Validate(input: string, answers: T)
    {
        if (!new RegExp(`${escapeStringRegexp(`${this.Generator.sourcePath() + Path.sep}`)}.+`).test(input))
        {
            return `The file must be inside the \`${this.Generator.sourcePath()}\`-directory.`;
        }
        else
        {
            return super.Validate(input, answers);
        }
    }

    protected MakeRootPath(...path: string[])
    {
        return super.MakeRootPath(this.Generator.componentPath(), ...path);
    }
}