import { isNullOrUndefined } from "util";
import { Node } from "../../NodeSystem/Node";
import { Option } from "../Option";
import { IACPOptionOptions } from "./IACPOptionOptions";

/**
 * Represents an option for the control-panel.
 */
export class ACPOption extends Option
{
    /**
     * A value indicating whether the option is visible.
     */
    private visible: boolean = true;

    /**
     * A value indicating whether the option is localizable.
     */
    private localizable: boolean = false;

    /**
     * A value indicating whether to force localization.
     */
    private forceLocalization: boolean = false;

    /**
     * Initializes a new instance of the `ACPOption` class.
     */
    public constructor(options: IACPOptionOptions, parent: Node)
    {
        super(options, parent);

        if (!isNullOrUndefined(options.Visible))
        {
            this.Visible = options.Visible;
        }

        if (!isNullOrUndefined(options.Localizable))
        {
            this.Localizable = options.Localizable;
        }

        if (!isNullOrUndefined(options.ForceLocalization))
        {
            this.ForceLocalization = options.ForceLocalization;
        }
    }

    /**
     * Gets or sets a value indicating whether the option is visible.
     */
    public get Visible(): boolean
    {
        return this.visible;
    }

    public set Visible(value: boolean)
    {
        this.visible = value;
    }

    /**
     * Gets or sets a value indicating whether the option is localizable.
     */
    public get Localizable(): boolean
    {
        return this.localizable;
    }

    public set Localizable(value: boolean)
    {
        this.localizable = value;
    }

    /**
     * Gets or sets a value indicating whether to force localization.
     */
    public get ForceLocalization(): boolean
    {
        return this.forceLocalization;
    }

    public set ForceLocalization(value: boolean)
    {
        this.forceLocalization = value;
    }
}