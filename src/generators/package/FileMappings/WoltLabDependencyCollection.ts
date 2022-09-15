import { DependencyOverrides, ESModuleDependencyCollection } from "@manuth/generator-ts-project";
import { Package } from "@manuth/package-json-editor";
import { Constants } from "../../../Core/Constants.js";

/**
 * Represents a collection of dependencies for woltlab packages.
 */
export class WoltLabDependencyCollection extends ESModuleDependencyCollection
{
    /**
     * Initializes a new instance of the {@link WoltLabDependencyCollection `WoltLabDependencyCollection`} class.
     *
     * @param esModule
     * A value indicating whether the ESModule dependencies are allowed.
     */
    public constructor(esModule: boolean)
    {
        super(
            {
                devDependencies: [
                    "@manuth/woltlab-compiler",
                    "ts-node"
                ]
            },
            esModule);
    }

    /**
     * @inheritdoc
     */
    protected override get Package(): Package
    {
        return Constants.Package;
    }

    /**
     * @inheritdoc
     */
    protected override get CommonJSOverrides(): DependencyOverrides
    {
        return {
            devDependencies: {
                "@manuth/woltlab-compiler": "^3.0.3"
            }
        };
    }
}
