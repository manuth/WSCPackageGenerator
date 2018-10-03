import { isNullOrUndefined } from "util";
import { BBCode } from "../../Customization/BBCodes/BBCode";
import { BBCodeAttribute } from "../../Customization/BBCodes/BBCodeAttribute";
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
        let $import: Element = document.createElement("import");
        {

            for (let bbCode of this.Item)
            {
                let bbCodeElement: Element = document.createElement("bbcode");
                {
                    bbCodeElement.setAttribute("name", bbCode.Name);

                    if (bbCode.DisplayName.GetLocales().length > 0)
                    {
                        let label: Element = document.createElement("buttonLabel");
                        label.appendChild(document.createTextNode(`wcf.editor.button.${bbCode.Name}`));
                        bbCodeElement.appendChild(label);
                    }

                    if (!isNullOrUndefined(bbCode.Icon))
                    {
                        let icon: Element = document.createElement("wysiwygicon");
                        icon.appendChild(document.createTextNode(bbCode.Icon));
                        bbCodeElement.appendChild(icon);
                    }

                    if (!isNullOrUndefined(bbCode.ClassName))
                    {
                        let $class: Element = document.createElement("classname");
                        $class.appendChild(document.createTextNode(bbCode.ClassName));
                        bbCodeElement.appendChild($class);
                    }

                    if (!isNullOrUndefined(bbCode.TagName))
                    {
                        let openTag: Element = document.createElement("htmlopen");
                        openTag.appendChild(document.createTextNode(bbCode.TagName));
                        bbCodeElement.appendChild(openTag);

                        if (!bbCode.IsSelfClosing)
                        {
                            let closeTag: Element = document.createElement("htmlClose");
                            closeTag.appendChild(document.createTextNode(bbCode.TagName));
                            bbCodeElement.appendChild(closeTag);
                        }
                    }

                    let isBlockElement: Element = document.createElement("isBlockElement");
                    isBlockElement.appendChild(document.createTextNode(bbCode.IsBlockElement ? "1" : "0"));
                    bbCodeElement.appendChild(isBlockElement);

                    let parseContent: Element = document.createElement("sourcecode");
                    parseContent.appendChild(document.createTextNode(bbCode.ParseContent ? "0" : "1"));
                    bbCodeElement.appendChild(parseContent);

                    if (bbCode.Attributes.length > 0)
                    {
                        let attributesElement: Element = document.createElement("attributes");
                        {
                            for (let i: number = 0; i < bbCode.Attributes.length; i++)
                            {
                                let attributeElement: Element = document.createElement("attribute");
                                {
                                    let attribute: BBCodeAttribute = bbCode.Attributes[i];
                                    attributeElement.setAttribute("name", i.toString());

                                    let required: Element = document.createElement("required");
                                    required.appendChild(document.createTextNode(attribute.Required ? "1" : "0"));
                                    attributeElement.appendChild(required);

                                    let valueByContent: Element = document.createElement("useText");
                                    valueByContent.appendChild(document.createTextNode(attribute.ValueByContent ? "1" : "0"));
                                    attributeElement.appendChild(valueByContent);

                                    if (!isNullOrUndefined(attribute.Code))
                                    {
                                        let code: Element = document.createElement("html");
                                        code.appendChild(document.createTextNode(attribute.Code));
                                        attributeElement.appendChild(code);
                                    }

                                    if (!isNullOrUndefined(attribute.ValidationPattern))
                                    {
                                        let validationPattern: Element = document.createElement("validationpattern");
                                        validationPattern.appendChild(document.createTextNode(attribute.ValidationPattern.source));
                                        attributeElement.appendChild(validationPattern);
                                    }
                                }
                                attributesElement.appendChild(attributeElement);
                            }
                        }
                        bbCodeElement.appendChild(attributesElement);
                    }
                }
                $import.appendChild(bbCodeElement);
            }
        }
        document.documentElement.appendChild($import);
        return document;
    }
}