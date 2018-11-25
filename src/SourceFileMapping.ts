import escapeStringRegexp = require("escape-string-regexp");
import Path = require("path");
import { isNullOrUndefined } from "util";
import { Generator } from "./Generator";
import { WSCPackageSetting } from "./generators/app/WSCPackageSetting";
import { IComponentDestination } from "./IComponentDestination";
import { IGeneratorSettings } from "./IGeneratorSettings";
import { IInteractiveFileMapping } from "./IInteractiveFileMapping";
import { SourceFileDestination } from "./SourceFileDestination";
import { TypeScriptFileMapping } from "./TypeScriptFileMapping";

/**
 * Represents a file-mapping for a WoltLab Suite Core-component.
 */
export class SourceFileMapping<T extends IGeneratorSettings> extends TypeScriptFileMapping<T> implements IInteractiveFileMapping<T>
{
    /**
     * The destination of the file-mapping.
     */
    private interactiveDestination: IComponentDestination<T>;

    /**
     * Initializes a new instance of the `SourceFileMapping<T>` class.
     *
     * @param options
     * The options for the initialization.
     */
    public constructor(generator: Generator<T>, id: string, options: IInteractiveFileMapping<T>)
    {
        super(generator, options);
        this.Destination = new SourceFileDestination(generator, id, options.Destination);
    }

    public get Destination()
    {
        return this.interactiveDestination;
    }

    public set Destination(value)
    {
        this.Destination = value;
    }
}