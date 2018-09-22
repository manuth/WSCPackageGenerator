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
        class MyOption extends Option
        {
        }

        class MyCategory extends Category<Option, IOptionOptions>
        {
            public constructor(node: INode, options: ICategoryOptions<IOptionOptions>)
            {
                super(
                    node,
                    options,
                    (parent: Category<Option, IOptionOptions>, opts: IOptionOptions): Option =>
                    {
                        return new MyOption(parent, opts);
                    });
            }
        }

        class MyNode extends Node<MyCategory, ICategoryOptions<IOptionOptions>>
        {
            public constructor(options: INodeOptions<ICategoryOptions<IOptionOptions>>)
            {
                super(
                    options,
                    (parent: Node<MyCategory, ICategoryOptions<IOptionOptions>>, opts: ICategoryOptions<IOptionOptions>): MyCategory =>
                    {
                        return new MyCategory(parent, opts);
                    });
            }
        }

        let rootNode: MyNode;
        let names: string[];
        let category: MyNode;
        let option: MyOption;
        let categoryID: string;
        let optionID: string;

        suiteSetup(
            () =>
            {
                names = ["foo", "bar", "baz", "this", "is", "a", "test", "and", "tests", "stuff"];
                categoryID = "foo";
                optionID = "bar";

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
                option = new MyOption(
                    allNodes[Math.floor(Math.random() * allNodes.length)].Item,
                    {
                        ID: optionID,
                        Name: "test-option"
                    });
            });

        suite(
            "GetObjects()",
            () =>
            {
                test(
                    "Checking whether sub-nodes can be found by their ID...",
                    () =>
                    {
                        console.log(option);
                        assert.strictEqual(categoryID in rootNode.GetObjects(), true);
                    });
            });
    });