import { INamedObject } from "../../../INamedObject";
import { ICategory } from "../../../Options/Generic/ICategory";
import { Option } from "../../../Options/Option";
import { ILocalizationInstruction } from "../Globalization/ILocalizationInstruction";
import { INodeSystemInstruction } from "../NodeSystem/INodeSystemInstruction";

/**
 * Represents an instruction which provides options for the control-panel.
 */
export interface IOptionInstruction<T extends ICategory<TOption>, TOption extends Option> extends INodeSystemInstruction<T>, ILocalizationInstruction
{
    /**
     * Gets the category of the translations.
     */
    RootCategory: string;

    /**
     * Gets the category of the translations of the options.
     */
    OptionCategory: string;

    /**
     * Gets the category of the translations of the categories.
     */
    CategoryCategory: string;

    /**
     * Gets the categories to delete.
     */
    CategoriesToDelete: INamedObject[];

    /**
     * Gets the options to delete.
     */
    OptionsToDelete: INamedObject[];
}