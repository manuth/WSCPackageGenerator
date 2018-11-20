import { isNullOrUndefined } from "util";
import { BBCodeAttribute } from "../../Customization/BBCodes/BBCodeAttribute";
import { BBCodeInstruction } from "../../PackageSystem/Instructions/Customization/BBCodeInstruction";
import { XMLEditor } from "../../Serialization/XMLEditor";
import { NamedObjectDeletionFileCompiler } from "../NamedObjectDeletionFileCompiler";

/**
 * Provides the functionality to compile bb-codes.
 */
export class BBCodeFileCompiler extends NamedObjectDeletionFileCompiler<BBCodeInstruction>
{
    /**
     * Initializes a new instance of the `BBCodeFileCompiler` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: BBCodeInstruction)
    {
        super(item);
    }

    protected get SchemaLocation()
    {
        return "https://www.woltlab.com/XSD/vortex/bbcode.xsd";
    }

    protected get ObjectTagName()
    {
        return "bbcode";
    }

    protected CreateImport()
    {
        let editor = new XMLEditor(super.CreateImport());
        for (let bbCode of this.Item.BBCodes)
        {
            editor.AddElement(
                this.ObjectTagName,
                (bbCodeEditor) =>
                {
                    bbCodeEditor.SetAttribute("name", bbCode.Name);

                    if (bbCode.DisplayName.GetLocales().length > 0)
                    {
                        bbCodeEditor.AddTextElement("buttonLabel", `wcf.editor.button.${bbCode.Name}`);
                    }

                    if (!isNullOrUndefined(bbCode.Icon))
                    {
                        bbCodeEditor.AddTextElement("wysiwygicon", bbCode.Icon);
                    }

                    if (!isNullOrUndefined(bbCode.ClassName))
                    {
                        bbCodeEditor.AddTextElement("classname", bbCode.ClassName);
                    }

                    if (!isNullOrUndefined(bbCode.TagName))
                    {
                        bbCodeEditor.AddTextElement("htmlopen", bbCode.TagName);

                        if (!bbCode.IsSelfClosing)
                        {
                            bbCodeEditor.AddTextElement("htmlclose", bbCode.TagName);
                        }
                    }

                    bbCodeEditor.AddTextElement("isBlockElement", bbCode.IsBlockElement ? "1" : "0");
                    bbCodeEditor.AddTextElement("sourcecode", bbCode.ParseContent ? "0" : "1");

                    if (bbCode.Attributes.length > 0)
                    {
                        bbCodeEditor.AddElement(
                            "attributes",
                            (attributes) =>
                            {
                                for (let i = 0; i < bbCode.Attributes.length; i++)
                                {
                                    let attribute = bbCode.Attributes[i];

                                    attributes.AddElement(
                                        "attribute",
                                        (attributeEditor) =>
                                        {
                                            attributeEditor.SetAttribute("name", i.toString());

                                            attributeEditor.AddTextElement("required", attribute.Required ? "1" : "0");
                                            attributeEditor.AddTextElement("useText", attribute.ValueByContent ? "1" : "0");

                                            if (!isNullOrUndefined(attribute.Code))
                                            {
                                                attributeEditor.AddTextElement("html", attribute.Code);
                                            }

                                            if (!isNullOrUndefined(attribute.ValidationPattern))
                                            {
                                                attributeEditor.AddTextElement("validationpattern", attribute.ValidationPattern.source);
                                            }
                                        });
                                }
                            });
                    }
                });
        }

        return editor.Element;
    }
}