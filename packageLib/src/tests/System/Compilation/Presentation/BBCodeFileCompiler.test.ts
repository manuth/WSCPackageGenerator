import * as assert from "assert";
import * as FileSystem from "fs-extra";
import { isNullOrUndefined } from "util";
import { DOMParser } from "xmldom";
import { BBCodeFileCompiler } from "../../../../System/Compilation/Presentation/BBCodeFileCompiler";
import { BBCode } from "../../../../System/Customization/BBCodes/BBCode";
import { IBBCodeAttributeOptions } from "../../../../System/Customization/BBCodes/IBBCodeAttributeOptions";
import { TempFile } from "../../../../System/FileSystem/TempFile";
import { ILocalization } from "../../../../System/Globalization/ILocalization";

suite(
    "BBCodeFileCompiler",
    () =>
    {
        let tempFile: TempFile;
        let compiler: BBCodeFileCompiler;

        let commonBBCodeName: string;
        let label: ILocalization;
        let icon: string;
        let isBlockElement: boolean;
        let parseContent: boolean;
        let attribute: IBBCodeAttributeOptions;

        let classBBCodeName: string;
        let className: string;

        let htmlBBCodeName: string;
        let htmlTag: string;
        let isSelfClosing: boolean;

        suiteSetup(
            () =>
            {
                tempFile = new TempFile();

                commonBBCodeName = "foo";
                label = {
                    en: "Hello World"
                };
                icon = "fa-bath";
                isBlockElement = false;
                parseContent = true;
                attribute = {
                    Code: "style=\"%s\"",
                    Required: true,
                    ValueByContent: true,
                    ValidationPattern: /^.*$/g
                };

                classBBCodeName = "bar";
                className = "wcf\\system\\bbcode\\MyBBCode";

                htmlBBCodeName = "baz";
                htmlTag = "span";
                isSelfClosing = true;

                compiler = new BBCodeFileCompiler([
                    new BBCode({
                        Name: commonBBCodeName,
                        DisplayName: label,
                        Icon: icon,
                        IsBlockElement: isBlockElement,
                        ParseContent: parseContent,
                        Attributes: [attribute, attribute]
                    }),
                    new BBCode({
                        Name: classBBCodeName,
                        ClassName: className
                    }),
                    new BBCode({
                        Name: htmlBBCodeName,
                        TagName: htmlTag,
                        IsSelfClosing: isSelfClosing
                    })
                ]);

                compiler.DestinationPath = tempFile.FileName;
            });

        suiteTeardown(
            () =>
            {
                tempFile.Dispose();
            });

        suite(
            "Compile()",
            () =>
            {
                suite(
                    "General",
                    () =>
                    {
                        test(
                            "Checking whether the item can be compiled...",
                            async () =>
                            {
                                await compiler.Execute();
                            });

                        test(
                            "Checking whether the compiled file exists...",
                            async () =>
                            {
                                assert.strictEqual(await FileSystem.pathExists(tempFile.FileName), true);
                            });
                    });

                suite(
                    "Testing the integrity of the created file...",
                    () =>
                    {
                        let document: Document;
                        let rootTag: string;
                        let rootElement: Element;

                        suiteSetup(
                            async () =>
                            {
                                document = new DOMParser().parseFromString((await FileSystem.readFile(tempFile.FileName)).toString());
                                rootTag = "data";
                                rootElement = document.documentElement;
                            });

                        suite(
                            "General",
                            () =>
                            {
                                test(
                                    "Checking whether the name of the root-tag is correct...",
                                    () =>
                                    {
                                        assert.strictEqual(rootElement.tagName, rootTag);
                                    });
                            });

                        suite(
                            "Checking the integrity of imported bb-codes...",
                            () =>
                            {
                                let importTag: string;
                                let importElement: Element;

                                suiteSetup(
                                    () =>
                                    {
                                        importTag = "import";
                                    });

                                suite(
                                    "General",
                                    () =>
                                    {
                                        test(
                                            "Checking whether the import-tag exists exactly one time...",
                                            () =>
                                            {
                                                assert.strictEqual(document.getElementsByTagName(importTag).length, 1);
                                                importElement = document.getElementsByTagName(importTag)[0];
                                            });

                                        test(
                                            "Checking whether the import-tag is at the correct position...",
                                            () =>
                                            {
                                                assert.strictEqual(importElement.parentNode === rootElement, true);
                                            });
                                    });

                                suite(
                                    "Checking the integrity of the bb-codes...",
                                    () =>
                                    {
                                        let bbCodeTag: string;
                                        let bbCodeElements: Element[];
                                        let nameAttribute: string;
                                        let validateTag: (parent: Element, tag: string, value?: string) => void;

                                        suiteSetup(
                                            () =>
                                            {
                                                bbCodeTag = "bbcode";
                                                bbCodeElements = [];
                                                nameAttribute = "name";
                                                validateTag = (parent: Element, tag: string, value?: string): void =>
                                                {
                                                    let element: Element;
                                                    let elements: NodeListOf<Element> = parent.getElementsByTagName(tag);
                                                    assert.strictEqual(elements.length, 1);
                                                    element = elements[0];
                                                    assert.strictEqual(element.parentNode, parent);

                                                    if (!isNullOrUndefined(value))
                                                    {
                                                        assert.strictEqual(element.textContent, value);
                                                    }
                                                };

                                                let bbCodeNodes: NodeListOf<Element> = document.getElementsByTagName(bbCodeTag);

                                                for (let i: number = 0; i < bbCodeNodes.length; i++)
                                                {
                                                    bbCodeElements.push(bbCodeNodes.item(i));
                                                }
                                            });

                                        suite(
                                            "General",
                                            () =>
                                            {
                                                test(
                                                    "Checking whether all bb-codes are at the correct position...",
                                                    () =>
                                                    {
                                                        assert.strictEqual(bbCodeElements.every((element: Element) => element.parentNode === importElement), true);
                                                    });
                                            });

                                        suite(
                                            "Checking the integrity of common bb-codes...",
                                            () =>
                                            {
                                                let bbCodeElement: Element;
                                                let labelTag: string;
                                                let iconTag: string;
                                                let isBlockElementTag: string;
                                                let parseContentTag: string;
                                                let attributesTag: string;

                                                suiteSetup(
                                                    () =>
                                                    {
                                                        labelTag = "buttonLabel";
                                                        iconTag = "wysiwygicon";
                                                        isBlockElementTag = "isBlockElement";
                                                        parseContentTag = "sourcecode";
                                                        attributesTag = "attributes";
                                                    });

                                                suite(
                                                    "General",
                                                    () =>
                                                    {
                                                        test(
                                                            "Checking whether the common bb-code is present...",
                                                            () =>
                                                            {
                                                                let matches: Element[] = bbCodeElements.filter(
                                                                    (element: Element) =>
                                                                    {
                                                                        return element.getAttribute(nameAttribute) === commonBBCodeName;
                                                                    });

                                                                assert.strictEqual(matches.length, 1);
                                                                bbCodeElement = matches[0];
                                                            });
                                                    });

                                                suite(
                                                    "Checking the integrity of the meta-data...",
                                                    () =>
                                                    {
                                                        test(
                                                            "Checking the integrity of the label-property",
                                                            () =>
                                                            {
                                                                validateTag(bbCodeElement, labelTag, `wcf.editor.button.${commonBBCodeName}`);
                                                            });

                                                        test(
                                                            "Checking the integrity of the icon-property...",
                                                            () =>
                                                            {
                                                                validateTag(bbCodeElement, iconTag, icon);
                                                            });

                                                        test(
                                                            "Checking the integrity of the isBlockElement-property...",
                                                            () =>
                                                            {
                                                                validateTag(bbCodeElement, isBlockElementTag, isBlockElement ? "1" : "0");
                                                            });

                                                        test(
                                                            "Checking the integrity of the parseContent-property...",
                                                            () =>
                                                            {
                                                                validateTag(bbCodeElement, parseContentTag, parseContent ? "0" : "1");
                                                            });
                                                    });

                                                suite(
                                                    "Checking the integrity of the attributes...",
                                                    () =>
                                                    {
                                                        let attributeElement: Element;
                                                        let attributesElement: Element;
                                                        let attributeTag: string;
                                                        let attributeElements: Element[];

                                                        suiteSetup(
                                                            () =>
                                                            {
                                                                attributeTag = "attribute";

                                                                let attributeNodes: NodeListOf<Element> = document.getElementsByTagName(attributeTag);
                                                                attributeElements = [];

                                                                for (let i: number = 0; i < attributeNodes.length; i++)
                                                                {
                                                                    attributeElements.push(attributeNodes.item(i));
                                                                }

                                                                attributeElement = attributeElements[Math.floor(Math.random() * (attributeElements.length - 1))];
                                                            });

                                                        suite(
                                                            "General",
                                                            () =>
                                                            {

                                                                test(
                                                                    "Checking the integrity of the attributes-property...",
                                                                    () =>
                                                                    {
                                                                        validateTag(bbCodeElement, attributesTag);
                                                                        attributesElement = bbCodeElement.getElementsByTagName(attributesTag)[0];
                                                                    });

                                                                test(
                                                                    "Checking whether the attributes are at the correct position...",
                                                                    () =>
                                                                    {
                                                                        assert.strictEqual(
                                                                            attributeElements.every(
                                                                                (element: Element) =>
                                                                                {
                                                                                    return element.parentNode === attributesElement;
                                                                                }),
                                                                            true);
                                                                    });
                                                            });

                                                        suite(
                                                            "Checking the integrity of the meta-data...",
                                                            () =>
                                                            {
                                                                let requiredTag: string;
                                                                let valueByContentTag: string;
                                                                let codeTag: string;
                                                                let validationPatternTag: string;

                                                                suiteSetup(
                                                                    () =>
                                                                    {
                                                                        requiredTag = "required";
                                                                        valueByContentTag = "useText";
                                                                        codeTag = "html";
                                                                        validationPatternTag = "validationpattern";
                                                                    });

                                                                test(
                                                                    "Checking the integrity of the required-property",
                                                                    () =>
                                                                    {
                                                                        validateTag(attributeElement, requiredTag, attribute.Required ? "1" : "0");
                                                                    });

                                                                test(
                                                                    "Checking the integrity of the valueByContent-property",
                                                                    () =>
                                                                    {
                                                                        validateTag(attributeElement, valueByContentTag, attribute.ValueByContent ? "1" : "0");
                                                                    });

                                                                test(
                                                                    "Checking the integrity of the code-property",
                                                                    function(): void
                                                                    {
                                                                        if (isNullOrUndefined(attribute.Code))
                                                                        {
                                                                            this.skip();
                                                                        }
                                                                        else
                                                                        {
                                                                            validateTag(attributeElement, codeTag, attribute.Code);
                                                                        }
                                                                    });

                                                                test(
                                                                    "Checking the integrity of the validationPattern-property",
                                                                    function(): void
                                                                    {
                                                                        if (isNullOrUndefined(attribute.ValidationPattern))
                                                                        {
                                                                            this.skip();
                                                                        }
                                                                        else
                                                                        {
                                                                            validateTag(attributeElement, validationPatternTag, attribute.ValidationPattern.source);
                                                                        }
                                                                    });
                                                            });
                                                    });
                                            });

                                        suite(
                                            "Checking the integrity of bb-codes based on PHP-classes...",
                                            () =>
                                            {
                                                let bbCodeElement: Element;
                                                let classTag: string;

                                                suiteSetup(
                                                    () =>
                                                    {
                                                        classTag = "classname";
                                                    });

                                                suite(
                                                    "General",
                                                    () =>
                                                    {
                                                        test(
                                                            "Checking whether the class-bb-code is present...",
                                                            () =>
                                                            {
                                                                let matches: Element[] = bbCodeElements.filter(
                                                                    (element: Element) =>
                                                                    {
                                                                        return element.getAttribute(nameAttribute) === classBBCodeName;
                                                                    });

                                                                assert.strictEqual(matches.length, 1);
                                                                bbCodeElement = matches[0];
                                                            });
                                                    });

                                                suite(
                                                    "Checking the integrity of the meta-data...",
                                                    () =>
                                                    {
                                                        test(
                                                            "Checking the integrity of the class-property...",
                                                            () =>
                                                            {
                                                                validateTag(bbCodeElement, classTag, className);
                                                            });
                                                    });
                                            });

                                        suite(
                                            "Checking the integrity of bb-codes based on HTML...",
                                            () =>
                                            {
                                                let bbCodeElement: Element;

                                                let htmlOpenTag: string;
                                                let htmlCloseTag: string;

                                                suiteSetup(
                                                    () =>
                                                    {
                                                        htmlOpenTag = "htmlopen";
                                                        htmlCloseTag = "htmlclose";
                                                    });

                                                suite(
                                                    "General",
                                                    () =>
                                                    {
                                                        test(
                                                            "Checking whether the html bb-code is present...",
                                                            () =>
                                                            {
                                                                let matches: Element[] = bbCodeElements.filter(
                                                                    (element: Element) =>
                                                                    {
                                                                        return element.getAttribute(nameAttribute) === htmlBBCodeName;
                                                                    });

                                                                assert.strictEqual(matches.length, 1);
                                                                bbCodeElement = matches[0];
                                                            });
                                                    });

                                                suite(
                                                    "Checking the integrity of the meta-data...",
                                                    () =>
                                                    {
                                                        test(
                                                            "Checking the integrity of the opening html-tag...",
                                                            () =>
                                                            {
                                                                validateTag(bbCodeElement, htmlOpenTag, htmlTag);
                                                            });

                                                        test(
                                                            "Checking the integrity of the closing html-tag...",
                                                            () =>
                                                            {
                                                                if (isSelfClosing)
                                                                {
                                                                    assert.strictEqual(document.getElementsByTagName(htmlCloseTag).length, 0);
                                                                }
                                                                else
                                                                {
                                                                    validateTag(bbCodeElement, htmlCloseTag, htmlTag);
                                                                }
                                                            });
                                                    });
                                            });
                                    });
                            });
                    });
            });
    });