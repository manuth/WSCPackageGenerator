import * as assert from "assert";
import { isNullOrUndefined } from "util";
import { INode } from "../../../System/NodeSystem/INode";
import { INodeOptions } from "../../../System/NodeSystem/INodeOptions";
import { Node } from "../../../System/NodeSystem/Node";
import { Category } from "../../../System/Options/Category";
import { ICategoryOptions } from "../../../System/Options/ICategoryOptions";
import { IOptionOptions } from "../../../System/Options/IOptionOptions";
import { Option } from "../../../System/Options/Option";

suite(
    "Category",
    () =>
    {
        /**
         * Represents an option.
         */
        class MyOption extends Option
        {
        }

        /**
         * Represents a category.
         */
        class MyCategory extends Category<Option, IOptionOptions>
        {
            public constructor(node: INode, options: ICategoryOptions<IOptionOptions>)
            {
                super(
                    node,
                    options,
                    (parent: Category<Option, IOptionOptions>, opts: IOptionOptions) =>
                    {
                        return new MyOption(parent, opts);
                    });
            }
        }

        /**
         * Represents a node.
         */
        class MyNode extends Node<MyCategory, ICategoryOptions<IOptionOptions>>
        {
            public constructor(options: INodeOptions<ICategoryOptions<IOptionOptions>>)
            {
                super(
                    options,
                    (parent: Node<MyCategory, ICategoryOptions<IOptionOptions>>, opts: ICategoryOptions<IOptionOptions>) =>
                    {
                        return new MyCategory(parent, opts);
                    });
            }
        }

        let rootNode: MyNode;
        let names: string[];
        let category: MyNode;
        let categoryID: string;
        let optionID: string;
        let optionName: string;

        suiteSetup(
            () =>
            {
                names = ["foo", "bar", "baz", "this", "is", "a", "test", "and", "tests", "stuff"];
                categoryID = "foo";
                optionID = "bar";
                optionName = "test-option";

                category = new MyNode(
                    {
                        ID: categoryID,
                        Name: "test-category"
                    });

                for (let name of names.reverse())
                {
                    let child: MyNode = rootNode;

                    rootNode = new MyNode(
                        {
                            Name: name,
                            Item: {
                            }
                        });

                    if (!isNullOrUndefined(child))
                    {
                        rootNode.Nodes.push(child);
                    }
                }

                let allNodes: Node<MyCategory, ICategoryOptions<IOptionOptions>>[] = rootNode.GetAllNodes();
                allNodes[Math.floor(Math.random() * allNodes.length)].Nodes.push(category);
                allNodes[Math.floor(Math.random() * allNodes.length)].Nodes.push(
                    new MyNode(
                        {
                            Name: "option-container",
                            Item: {
                                Options: [
                                    {
                                        ID: optionID,
                                        Name: optionName
                                    }
                                ]
                            }
                        }));
            });

        suite(
            "GetObjects()",
            () =>
            {
                let objects: { [key: string]: any };

                suiteSetup(
                    () =>
                    {
                        objects = rootNode.GetObjects();
                    });

                test(
                    "Checking whether sub-nodes can be found by their ID...",
                    () =>
                    {
                        assert.strictEqual(categoryID in objects, true);
                        assert.strictEqual(objects[categoryID], category);
                    });

                test(
                    "Checking whether options can be found by their ID...",
                    () =>
                    {
                        assert.strictEqual(optionID in objects, true);
                        assert.strictEqual((objects[optionID] as MyOption).Name, optionName);
                    });
            });
    });