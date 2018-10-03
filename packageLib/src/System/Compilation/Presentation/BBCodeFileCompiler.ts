import { isNullOrUndefined } from "util";
import { BBCode } from "../../Customization/BBCodes/BBCode";
import { BBCodeAttribute } from "../../Customization/BBCodes/BBCodeAttribute";
import { XML } from "../../Serialization/XML";
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

        XML.AddElement(
            document.documentElement,
            "import",
            ($import: Element) =>
            {
                for (let bbCode of this.Item)
                {
                    XML.AddElement(
                        $import,
                        "bbcode",
                        (bbCodeElement: Element) =>
                        {
                            bbCodeElement.setAttribute("name", bbCode.Name);

                            if (bbCode.DisplayName.GetLocales().length > 0)
                            {
                                XML.AddTextElement(bbCodeElement, "buttonLabel", `wcf.editor.button.${bbCode.Name}`);
                            }

                            if (!isNullOrUndefined(bbCode.Icon))
                            {
                                XML.AddTextElement(bbCodeElement, "wysiwygicon", bbCode.Icon);
                            }

                            if (!isNullOrUndefined(bbCode.ClassName))
                            {
                                XML.AddTextElement(bbCodeElement, "classname", bbCode.ClassName);
                            }

                            if (!isNullOrUndefined(bbCode.TagName))
                            {
                                XML.AddTextElement(bbCodeElement, "htmlopen", bbCode.TagName);

                                if (!bbCode.IsSelfClosing)
                                {
                                    XML.AddTextElement(bbCodeElement, "htmlclose", bbCode.TagName);
                                }
                            }

                            XML.AddTextElement(bbCodeElement, "isBlockElement", bbCode.IsBlockElement ? "1" : "0");
                            XML.AddTextElement(bbCodeElement, "sourcecode", bbCode.ParseContent ? "0" : "1");

                            if (bbCode.Attributes.length > 0)
                            {
                                XML.AddElement(
                                    bbCodeElement,
                                    "attributes",
                                    (attributes: Element) =>
                                    {
                                        for (let i: number = 0; i < bbCode.Attributes.length; i++)
                                        {
                                            let attribute: BBCodeAttribute = bbCode.Attributes[i];

                                            XML.AddElement(
                                                attributes,
                                                "attribute",
                                                (attributeElement: Element) =>
                                                {
                                                    attributeElement.setAttribute("name", i.toString());
                                                    XML.AddTextElement(attributeElement, "required", attribute.Required ? "1" : "0");
                                                    XML.AddTextElement(attributeElement, "useText", attribute.ValueByContent ? "1" : "0");

                                                    if (!isNullOrUndefined(attribute.Code))
                                                    {
                                                        XML.AddTextElement(attributeElement, "html", attribute.Code);
                                                    }

                                                    if (!isNullOrUndefined(attribute.ValidationPattern))
                                                    {
                                                        XML.AddTextElement(attributeElement, "validationpattern", attribute.ValidationPattern.source);
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