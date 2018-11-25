import escapeStringRegexp = require("escape-string-regexp");
import Path = require("path");
import { isNullOrUndefined } from "util";
import { ComponentSourceFileDestination } from "./ComponentSourceFileDestination";
import { Generator } from "./Generator";
import { IWSCPackageSettings } from "./generators/app/IWSCPackageSettings";
import { WSCPackageSetting } from "./generators/app/WSCPackageSetting";
import { IComponentDestination } from "./IComponentDestination";
import { IInteractiveFileMapping } from "./IInteractiveFileMapping";
import { SourceFileMapping } from "./SourceFileMapping";

/**
 * Represents a file-mapping for a WoltLab Suite Core-component.
 */
export class ComponentSourceFileMapping<T extends IWSCPackageSettings> extends SourceFileMapping<T>
{

    /**
     * Initializes a new instance of the `WSCFileMapping<T>` class.
     *
     * @param options
     * The options for the initialization.
     */
    public constructor(generator: Generator<T>, options: IInteractiveFileMapping<T>)
    {
        super(generator, options);
        this.Destination = new ComponentSourceFileDestination(generator, options.Destination);
    }
}