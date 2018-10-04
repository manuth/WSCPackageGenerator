import * as assert from "assert";
import * as FileSystem from "fs-extra";
import { isNullOrUndefined } from "util";
import { DOMParser } from "xmldom";
import { BBCodeFileCompiler } from "../../../../System/Compilation/Presentation/BBCodeFileCompiler";
import { BBCode } from "../../../../System/Customization/BBCodes/BBCode";
import { IBBCodeAttributeOptions } from "../../../../System/Customization/BBCodes/IBBCodeAttributeOptions";
import { TempFile } from "../../../../System/FileSystem/TempFile";
import { ILocalization } from "../../../../System/Globalization/ILocalization";
import { XMLEditor } from "../../../../System/Serialization/XMLEditor";

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
                        let rootEditor: XMLEditor;

                        suiteSetup(
                            async () =>
                            {
                                document = new DOMParser().parseFromString((await FileSystem.readFile(tempFile.FileName)).toString());
                                rootTag = "data";
                                rootEditor = new XMLEditor(document.documentElement);
                            });

                        suite(
                            "General",
                            () =>
                            {
                                test(
                                    "Checking whether the name of the root-tag is correct...",
                                    () =>
                                    {
                                        assert.strictEqual(rootEditor.TagName, rootTag);
                                    });
                            });

                        suite(
                            "Checking the integrity of imported bb-codes...",
                            () =>
                            {
                                let importTag: string;
                                let importEditor: XMLEditor;

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
                                            "Checking whether the import exists...",
                                            () =>
                                            {
                                                assert.strictEqual(rootEditor.ChildrenByTag(importTag).length, 1);
                                                importEditor = rootEditor.ChildrenByTag(importTag)[0];
                                            });
                                    });

                                suite(
                                    "Checking the integrity of the bb-codes...",
                                    () =>
                                    {
                                        let bbCodeTag: string;
                                        let bbCodeEditors: XMLEditor[];
                                        let nameAttribute: string;

                                        suiteSetup(
                                            () =>
                                            {
                                                bbCodeTag = "bbcode";
                                                bbCodeEditors = [];
                                                nameAttribute = "name";
                                            });

                                        suite(
                                            "General",
                                            () =>
                                            {
                                                test(
                                                    "Checking whether at least one bb-code exists...",
                                                    () =>
                                                    {
                                                        importEditor.AssertTag(bbCodeTag);
                                                        bbCodeEditors = importEditor.ChildrenByTag(bbCodeTag);
                                                    });
                                            });

                                        suite(
                                            "Checking the integrity of common bb-codes...",
                                            () =>
                                            {
                                                let bbCodeEditor: XMLEditor;
                                                let labelTag: string;
                                                let iconTag: string;
                                                let isBlockElementTag: string;
                                                let parseContentTag: string;

                                                suiteSetup(
                                                    () =>
                                                    {
                                                        labelTag = "buttonLabel";
                                                        iconTag = "wysiwygicon";
                                                        isBlockElementTag = "isBlockElement";
                                                        parseContentTag = "sourcecode";
                                                    });

                                                suite(
                                                    "General",
                                                    () =>
                                                    {
                                                        test(
                                                            "Checking whether the common bb-code is present...",
                                                            () =>
                                                            {
                                                                let matches: XMLEditor[] = bbCodeEditors.filter(
                                                                    (editor: XMLEditor) =>
                                                                    {
                                                                        return editor.GetAttribute(nameAttribute) === commonBBCodeName;
                                                                    });

                                                                assert.strictEqual(matches.length, 1);
                                                                bbCodeEditor = matches[0];
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
                                                                bbCodeEditor.AssertText(labelTag, `wcf.editor.button.${commonBBCodeName}`);
                                                            });

                                                        test(
                                                            "Checking the integrity of the icon-property...",
                                                            () =>
                                                            {
                                                                bbCodeEditor.AssertText(iconTag, icon);
                                                            });

                                                        test(
                                                            "Checking the integrity of the isBlockElement-property...",
                                                            () =>
                                                            {
                                                                bbCodeEditor.AssertText(isBlockElementTag, isBlockElement ? "1" : "0");
                                                            });

                                                        test(
                                                            "Checking the integrity of the parseContent-property...",
                                                            () =>
                                                            {
                                                                bbCodeEditor.AssertText(parseContentTag, parseContent ? "0" : "1");
                                                            });
                                                    });

                                                suite(
                                                    "Checking the integrity of the attributes...",
                                                    () =>
                                                    {
                                                        let attributeEditor: XMLEditor;
                                                        let attributesEditor: XMLEditor;

                                                        suite(
                                                            "General",
                                                            () =>
                                                            {
                                                                let attributeTag: string;
                                                                let attributesTag: string;

                                                                suiteSetup(
                                                                    () =>
                                                                    {
                                                                        attributeTag = "attribute";
                                                                        attributesTag = "attributes";
                                                                    });

                                                                test(
                                                                    "Checking the integrity of the attributes-property...",
                                                                    () =>
                                                                    {
                                                                        bbCodeEditor.AssertTag(attributesTag, true);
                                                                        attributesEditor = bbCodeEditor.ChildrenByTag(attributesTag)[0];
                                                                    });

                                                                test(
                                                                    "Checking whether at least one attribute is present...",
                                                                    () =>
                                                                    {
                                                                        let attributeEditors: XMLEditor[] = attributesEditor.ChildrenByTag(attributeTag);
                                                                        assert.strictEqual(attributeEditors.length > 0, true);
                                                                        attributeEditor = attributeEditors[Math.floor(Math.random() * attributeEditors.length)];
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
                                                                        attributeEditor.AssertText(requiredTag, attribute.Required ? "1" : "0");
                                                                    });

                                                                test(
                                                                    "Checking the integrity of the valueByContent-property",
                                                                    () =>
                                                                    {
                                                                        attributeEditor.AssertText(valueByContentTag, attribute.ValueByContent ? "1" : "0");
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
                                                                            attributeEditor.AssertText(codeTag, attribute.Code);
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
                                                                            attributeEditor.AssertText(validationPatternTag, attribute.ValidationPattern.source);
                                                                        }
                                                                    });
                                                            });
                                                    });
                                            });

                                        suite(
                                            "Checking the integrity of bb-codes based on PHP-classes...",
                                            () =>
                                            {
                                                let bbCodeEditor: XMLEditor;
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
                                                                let matches: XMLEditor[] = bbCodeEditors.filter(
                                                                    (element: XMLEditor) =>
                                                                    {
                                                                        return element.GetAttribute(nameAttribute) === classBBCodeName;
                                                                    });

                                                                assert.strictEqual(matches.length, 1);
                                                                bbCodeEditor = matches[0];
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
                                                                bbCodeEditor.AssertText(classTag, className);
                                                            });
                                                    });
                                            });

                                        suite(
                                            "Checking the integrity of bb-codes based on HTML...",
                                            () =>
                                            {
                                                let bbCodeEditor: XMLEditor;

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
                                                                let matches: XMLEditor[] = bbCodeEditors.filter(
                                                                    (element: XMLEditor) =>
                                                                    {
                                                                        return element.GetAttribute(nameAttribute) === htmlBBCodeName;
                                                                    });

                                                                assert.strictEqual(matches.length, 1);
                                                                bbCodeEditor = matches[0];
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
                                                                bbCodeEditor.AssertText(htmlOpenTag, htmlTag);
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
                                                                    bbCodeEditor.AssertText(htmlCloseTag, htmlTag);
                                                                }
                                                            });
                                                    });
                                            });
                                    });
                            });
                    });
            });
    });