import { isNullOrUndefined } from "util";
import { Node } from "../../NodeSystem/Node";
import { EnabableCategory } from "../../Options/EnabableCategory";
import { IOptionOptions } from "../../Options/IOptionOptions";
import { Option } from "../../Options/Option";
import { XMLEditor } from "../../Serialization/XMLEditor";
import { OptionFileCompiler } from "./OptionFileCompiler";

/**
 * Provides the functionality to compile option-files.
 */
export abstract class EnabableOptionFileCompiler<TCategory extends EnabableCategory<TOption, TOptionOptions>, TCategoryOptions, TOption extends Option, TOptionOptions extends IOptionOptions> extends OptionFileCompiler<TCategory, TCategoryOptions, TOption, TOptionOptions>
{
    protected CreateCategory(category: Node<TCategory, TCategoryOptions>): Element
    {
        let editor: XMLEditor = new XMLEditor(super.CreateCategory(category));

        if (
            !isNullOrUndefined(category.Item) &&
            category.Item.EnableOptions.length > 0)
        {
            editor.AddTextElement("options", category.Item.EnableOptions.join(","));
        }

        return editor.Element;
    }
}