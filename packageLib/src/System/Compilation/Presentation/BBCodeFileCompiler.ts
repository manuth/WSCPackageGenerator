import { isNullOrUndefined } from "util";
import { BBCode } from "../../Customization/BBCodes/BBCode";
import { BBCodeAttribute } from "../../Customization/BBCodes/BBCodeAttribute";
import { XMLEditor } from "../../Serialization/XMLEditor";
import { WoltLabXMLCompiler } from "../WoltLabXMLCompiler";

/**
 * Provides the functionality to compile bb-codes.
 */
export class BBCodeFileCompiler extends WoltLabXMLCompiler<BBCode[]>
{
    /**
     * Initializes a new instance of the `BBCodeFileCompiler` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: BBCode[])
    {
        super(item);
    }

    protected get SchemaLocation(): string
    {
        return "https://www.woltlab.com/XSD/vortex/bbcode.xsd";
    }

    protected CreateDocument(): Document
    {
        let document: Document = super.CreateDocument();
        let editor: XMLEditor = new XMLEditor(document.documentElement);

        editor.AddElement(
            "import",
            ($import: XMLEditor) =>
            {
                for (let bbCode of this.Item)
                {
                    $import.AddElement(
                        "bbcode",
                        (bbCodeEditor: XMLEditor) =>
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
                                    (attributes: XMLEditor) =>
                                    {
                                        for (let i: number = 0; i < bbCode.Attributes.length; i++)
                                        {
                                            let attribute: BBCodeAttribute = bbCode.Attributes[i];

                                            attributes.AddElement(
                                                "attribute",
                                                (attributeEditor: XMLEditor) =>
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
            });

        return document;
    }
}