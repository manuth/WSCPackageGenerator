import * as assert from "assert";
import * as FileSystem from "fs-extra";
import { TempFile } from "temp-filesystem";
import { isNullOrUndefined } from "util";
import { DOMParser } from "xmldom";
import { OptionFileCompiler } from "../../../../System/Compilation/Options/OptionFileCompiler";
import { INode } from "../../../../System/NodeSystem/INode";
import { Node } from "../../../../System/NodeSystem/Node";
import { Category } from "../../../../System/Options/Category";
import { ICategory } from "../../../../System/Options/ICategory";
import { ICategoryOptions } from "../../../../System/Options/ICategoryOptions";
import { IOptionOptions } from "../../../../System/Options/IOptionOptions";
import { Option } from "../../../../System/Options/Option";
import { OptionType } from "../../../../System/Options/OptionType";
import { INodeSystemInstructionOptions } from "../../../../System/PackageSystem/Instructions/NodeSystem/INodeSystemInstructionOptions";
import { OptionInstruction } from "../../../../System/PackageSystem/Instructions/Options/OptionInstruction";
import { XMLEditor } from "../../../../System/Serialization/XMLEditor";

suite(
    "OptionFileCompiler",
    () =>
    {
        /**
         * Represents an option.
         */
        class MyOption extends Option
        {
            public constructor(category: ICategory, options: IOptionOptions)
            {
                super(category, options);
            }
        }

        /**
         * Represents a category.
         */
        class MyCategory extends Category<MyOption, IOptionOptions>
        {
            public constructor(node: INode, options: ICategoryOptions<IOptionOptions>)
            {
                super(
                    node,
                    options,
                    (category: Category<MyOption, IOptionOptions>, optionOptions: IOptionOptions) =>
                    {
                        return new MyOption(category, optionOptions);
                    });
            }
        }

        /**
         * Represents an instruction which provides `MyOption`s.
         */
        class MyOptionInstruction extends OptionInstruction<MyCategory, ICategoryOptions<IOptionOptions>, MyOption, IOptionOptions>
        {
            public constructor(options: INodeSystemInstructionOptions<ICategoryOptions<IOptionOptions>>)
            {
                super(
                    options,
                    (node: Node<MyCategory, ICategoryOptions<IOptionOptions>>, categoryOptions: ICategoryOptions<IOptionOptions>) =>
                    {
                        return new MyCategory(node, categoryOptions);
                    });
            }

            public get RootCategory()
            {
                return "wcf.foo.option";
            }

            public get Type()
            {
                return "bar";
            }
        }

        let tempFile: TempFile;
        let compiler: OptionFileCompiler<MyOptionInstruction, MyCategory, MyOption>;
        let section: string;
        let rootCategoryName: string;
        let rootShowOrder: number;
        let rootEnableOptions: string[];
        let categoryName: string;
        let showOrder: number;
        let enableOptions: string[];
        let rootCategoryNode: Node<MyCategory, ICategoryOptions<IOptionOptions>>;
        let categoryNode: Node<MyCategory, ICategoryOptions<IOptionOptions>>;
        let option: IOptionOptions;

        suiteSetup(
            () =>
            {
                tempFile = new TempFile();
                section = "general";
                rootCategoryName = "bar";
                rootShowOrder = 1;
                rootEnableOptions = ["foo", "bar", "baz"];
                categoryName = "baz";
                showOrder = null;
                enableOptions = ["foo", "bar", "baz"];
                option = {
                    Name: "foo",
                    Type: OptionType.MultiSelect,
                    DefaultValue: 3,
                    ValidationPattern: /^(3|4)$/,
                    Items: [
                        {
                            Name: "a",
                            Value: 3
                        },
                        {
                            Name: "test",
                            Value: 4
                        }
                    ],
                    Options: ["test"],
                    ShowOrder: 1,
                    EnableOptions: ["3:foo", "!4:bar"],
                    AdditionalProperties: {
                        minvalue: 5,
                        maxvalue: 10
                    }
                };

                let rootCategoryID = "rootCategory";
                let categoryID = "category";
                let optionInstruction = new MyOptionInstruction({
                    FileName: null,
                    Nodes: [
                        {
                            ID: rootCategoryID,
                            Name: rootCategoryName,
                            Parent: {
                                Name: section
                            },
                            Item: {
                                ShowOrder: rootShowOrder,
                                EnableOptions: enableOptions
                            },
                            Nodes: [
                                {
                                    ID: categoryID,
                                    Name: categoryName,
                                    Item: {
                                        ShowOrder: showOrder,
                                        Options: [
                                            option
                                        ],
                                        EnableOptions: enableOptions
                                    }
                                }
                            ]
                        }
                    ]
                });

                rootCategoryNode = optionInstruction.ObjectsByID[rootCategoryID];
                categoryNode = optionInstruction.ObjectsByID[categoryID];
                compiler = new class extends OptionFileCompiler<MyOptionInstruction, MyCategory, MyOption>
                {
                    protected get SchemaLocation()
                    {
                        return "http://example.com/myOptions.xsd";
                    }
                }(optionInstruction);
                compiler.DestinationPath = tempFile.FullName;
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
                            "Checking whether the compiler can be executed...",
                            async () =>
                            {
                                await compiler.Execute();
                            });
                    });

                suite(
                    "Checking the integrity of the compiled file...",
                    () =>
                    {
                        let importEditor: XMLEditor;
                        let nameAttribute: string;

                        suiteSetup(
                            () =>
                            {
                                nameAttribute = "name";
                            });

                        suite(
                            "General",
                            () =>
                            {
                                test(
                                    "Checking whether the content is valid xml...",
                                    async () =>
                                    {
                                        let document = new DOMParser().parseFromString((await FileSystem.readFile(tempFile.FullName)).toString());
                                        importEditor = new XMLEditor(document.documentElement).GetChildrenByTag("import")[0];
                                    });
                            });

                        suite(
                            "Checking the integrity of the category-list to import...",
                            () =>
                            {
                                let categoriesEditor: XMLEditor;

                                suite(
                                    "General",
                                    () =>
                                    {
                                        let categoriesTag: string;

                                        suiteSetup(
                                            () =>
                                            {
                                                categoriesTag = "categories";
                                            });

                                        test(
                                            "Checking whether the category-list is present...",
                                            () =>
                                            {
                                                assert.strictEqual(importEditor.HasTag(categoriesTag, true), true);
                                                categoriesEditor = importEditor.GetChildrenByTag(categoriesTag)[0];
                                            });
                                    });

                                suite(
                                    "Checking the integrity of the categories...",
                                    () =>
                                    {
                                        let categories: XMLEditor[];
                                        let parentTag: string;
                                        let showOrderTag: string;
                                        let enableOptionsTag: string;

                                        suiteSetup(
                                            () =>
                                            {
                                                parentTag = "parent";
                                                showOrderTag = "showorder";
                                                enableOptionsTag = "options";
                                            });

                                        suite(
                                            "General",
                                            () =>
                                            {
                                                let categoryTag: string;

                                                suiteSetup(
                                                    () =>
                                                    {
                                                        categoryTag = "category";
                                                    });

                                                test(
                                                    "Checking whether any category is present...",
                                                    () =>
                                                    {
                                                        assert.strictEqual(categoriesEditor.HasTag(categoryTag), true);
                                                        categories = categoriesEditor.GetChildrenByTag(categoryTag);
                                                    });

                                                test(
                                                    "Checking whether only the expected categories are present...",
                                                    () =>
                                                    {
                                                        categories.every(
                                                            (category) =>
                                                            {
                                                                return [rootCategoryName, categoryName].includes(category.GetAttribute(nameAttribute));
                                                            });
                                                    });
                                            });

                                        suite(
                                            "Checking the integrity of root-categories...",
                                            () =>
                                            {
                                                let categoryEditor: XMLEditor;

                                                suite(
                                                    "General",
                                                    () =>
                                                    {
                                                        test(
                                                            "Checking whether the root-category is present..",
                                                            () =>
                                                            {
                                                                let filtered = categories.filter(
                                                                    (category) =>
                                                                    {
                                                                        return category.GetAttribute(nameAttribute) === rootCategoryNode.FullName;
                                                                    });

                                                                assert.strictEqual(filtered.length, 1);
                                                                categoryEditor = filtered[0];
                                                            });
                                                    });

                                                suite(
                                                    "Checking the integrity of the meta-data...",
                                                    () =>
                                                    {
                                                        test(
                                                            "Checking the parent of the category...",
                                                            () =>
                                                            {
                                                                if (!isNullOrUndefined(section))
                                                                {
                                                                    assert.strictEqual(categoryEditor.HasText(parentTag, section), true);
                                                                }
                                                                else
                                                                {
                                                                    assert.strictEqual(categoryEditor.HasTag(parentTag), false);
                                                                }
                                                            });

                                                        test(
                                                            "Checking the show-order of the category...",
                                                            () =>
                                                            {
                                                                if (!isNullOrUndefined(rootShowOrder))
                                                                {
                                                                    assert.strictEqual(categoryEditor.HasText(showOrderTag, rootShowOrder.toString()), true);
                                                                }
                                                                else
                                                                {
                                                                    assert.strictEqual(categoryEditor.HasTag(showOrderTag), false);
                                                                }
                                                            });

                                                        test(
                                                            'Checking whether the "options"-property is correct...',
                                                            () =>
                                                            {
                                                                if (rootEnableOptions.length > 0)
                                                                {
                                                                    assert.strictEqual(categoryEditor.GetText(enableOptionsTag), enableOptions.join(","));
                                                                }
                                                            });
                                                    });
                                            });

                                        suite(
                                            "Checking the integrity of sub-categories...",
                                            () =>
                                            {
                                                let categoryEditor: XMLEditor;

                                                suite(
                                                    "General",
                                                    () =>
                                                    {
                                                        test(
                                                            "Checking whether the sub-category is present..",
                                                            () =>
                                                            {
                                                                let filtered = categories.filter(
                                                                    (category) =>
                                                                    {
                                                                        return category.GetAttribute(nameAttribute) === categoryNode.FullName;
                                                                    });

                                                                assert.strictEqual(filtered.length, 1);
                                                                categoryEditor = filtered[0];
                                                            });
                                                    });

                                                suite(
                                                    "Checking the integrity of the meta-data...",
                                                    () =>
                                                    {
                                                        test(
                                                            "Checking the parent of the category...",
                                                            () =>
                                                            {
                                                                if (!isNullOrUndefined(section))
                                                                {
                                                                    assert.strictEqual(categoryEditor.HasText(parentTag, categoryNode.Parent.FullName), true);
                                                                }
                                                                else
                                                                {
                                                                    assert.strictEqual(categoryEditor.HasTag(parentTag), false);
                                                                }
                                                            });

                                                        test(
                                                            "Checking the show-order of the category...",
                                                            () =>
                                                            {
                                                                if (!isNullOrUndefined(showOrder))
                                                                {
                                                                    assert.strictEqual(categoryEditor.HasText(showOrderTag, showOrder.toString()), true);
                                                                }
                                                                else
                                                                {
                                                                    assert.strictEqual(categoryEditor.HasTag(showOrderTag), false);
                                                                }
                                                            });

                                                        test(
                                                            'Checking whether the "options"-property is correct...',
                                                            () =>
                                                            {
                                                                if (enableOptions.length > 0)
                                                                {
                                                                    assert.strictEqual(categoryEditor.GetText(enableOptionsTag), enableOptions.join(","));
                                                                }
                                                            });
                                                    });
                                            });
                                    });
                            });

                        suite(
                            "Checking the integrity of the option-list to import...",
                            () =>
                            {
                                let optionsEditor: XMLEditor;

                                suite(
                                    "General",
                                    () =>
                                    {
                                        let optionsTag: string;

                                        suiteSetup(
                                            () =>
                                            {
                                                optionsTag = "options";
                                            });

                                        test(
                                            "Checking whether the option-list is present...",
                                            () =>
                                            {
                                                assert.strictEqual(importEditor.HasTag(optionsTag, true), true);
                                                optionsEditor = importEditor.GetChildrenByTag(optionsTag)[0];
                                            });
                                    });

                                suite(
                                    "Checking the integrity of the options...",
                                    () =>
                                    {
                                        let optionEditor: XMLEditor;

                                        suite(
                                            "General",
                                            () =>
                                            {
                                                let optionTag: string;

                                                suiteSetup(
                                                    () =>
                                                    {
                                                        optionTag = "option";
                                                    });

                                                test(
                                                    "Checking whether exactly one option is present...",
                                                    () =>
                                                    {
                                                        assert.strictEqual(optionsEditor.HasTag(optionTag, true), true);
                                                        optionEditor = optionsEditor.GetChildrenByTag(optionTag)[0];
                                                    });
                                            });

                                        suite(
                                            "Checking the meta-data...",
                                            () =>
                                            {
                                                let categoryTag: string;
                                                let typeTag: string;
                                                let defaultValueTag: string;
                                                let showOrderTag: string;
                                                let patternTag: string;
                                                let itemsTag: string;
                                                let optionsTag: string;
                                                let enableOptionsTag: string;

                                                suiteSetup(
                                                    () =>
                                                    {
                                                        categoryTag = "categoryname";
                                                        typeTag = "optiontype";
                                                        defaultValueTag = "defaultvalue";
                                                        showOrderTag = "showorder";
                                                        patternTag = "validationpattern";
                                                        itemsTag = "selectoptions";
                                                        optionsTag = "options";
                                                        enableOptionsTag = "enableoptions";
                                                    });

                                                test(
                                                    "Checking whether the name is correct...",
                                                    () =>
                                                    {
                                                        assert.strictEqual(optionEditor.HasAttribute(nameAttribute, option.Name), true);
                                                    });

                                                test(
                                                    "Checking whether the category is correct...",
                                                    () =>
                                                    {
                                                        assert.strictEqual(optionEditor.HasText(categoryTag, categoryNode.FullName), true);
                                                    });

                                                test(
                                                    "Checking whether the type is correct...",
                                                    () =>
                                                    {
                                                        assert.strictEqual(optionEditor.HasText(typeTag, option.Type), true);
                                                    });

                                                test(
                                                    "Checking whether the default value is correct...",
                                                    () =>
                                                    {
                                                        assert.strictEqual(optionEditor.HasText(defaultValueTag, `${option.DefaultValue}`), true);
                                                    });

                                                test(
                                                    "Checking whether the show-order is correct...",
                                                    () =>
                                                    {
                                                        assert.strictEqual(optionEditor.HasText(showOrderTag, option.ShowOrder.toString()), true);
                                                    });

                                                test(
                                                    "Checking whether the validation-pattern is correct...",
                                                    () =>
                                                    {
                                                        assert.strictEqual(optionEditor.HasText(patternTag, option.ValidationPattern.source), true);
                                                    });

                                                test(
                                                    "Checking whether the items are correct...",
                                                    () =>
                                                    {
                                                        assert.strictEqual(optionEditor.HasTag(itemsTag, true), true);
                                                        let lines = optionEditor.GetChildrenByTag(itemsTag)[0].TextContent.split("\n");

                                                        for (let item of option.Items)
                                                        {
                                                            let pattern = new RegExp(`^${item.Value}:.*?\.${option.Name}\.${item.Name}$`, "g");
                                                            assert.strictEqual(lines.filter((line: string) => pattern.test(line)).length, 1);
                                                        }
                                                    });

                                                test(
                                                    "Checking whether the dependent options are correct...",
                                                    () =>
                                                    {
                                                        assert.strictEqual(optionEditor.GetText(optionsTag), option.Options.join(","));
                                                    });

                                                test(
                                                    'Checking whether the "enableoptions" property is correct...',
                                                    () =>
                                                    {
                                                        assert.strictEqual(optionEditor.GetText(enableOptionsTag), option.EnableOptions.join(","));
                                                    });
                                            });
                                    });
                            });
                    });
            });
    });