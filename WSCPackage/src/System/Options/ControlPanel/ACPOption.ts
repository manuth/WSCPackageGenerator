import { isNullOrUndefined } from "util";
import { ICategory } from "../ICategory";
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
    private visible = true;

    /**
     * A value indicating whether the option is localizable.
     */
    private localizable = false;

    /**
     * A value indicating whether to force localization.
     */
    private forceLocalization = false;

    /**
     * Initializes a new instance of the `ACPOption` class.
     */
    public constructor(category: ICategory, options: IACPOptionOptions)
    {
        super(category, options);

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
    public get Visible()
    {
        return this.visible;
    }

    public set Visible(value)
    {
        this.visible = value;
    }

    /**
     * Gets or sets a value indicating whether the option is localizable.
     */
    public get Localizable()
    {
        return this.localizable;
    }

    public set Localizable(value)
    {
        this.localizable = value;
    }

    /**
     * Gets or sets a value indicating whether to force localization.
     */
    public get ForceLocalization()
    {
        return this.forceLocalization;
    }

    public set ForceLocalization(value)
    {
        this.forceLocalization = value;
    }
}