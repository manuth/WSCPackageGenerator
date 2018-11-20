import * as assert from "assert";
import { isNullOrUndefined } from "util";
import { INode } from "../../../../System/NodeSystem/INode";
import { INodeOptions } from "../../../../System/NodeSystem/INodeOptions";
import { Node } from "../../../../System/NodeSystem/Node";
import { NodeItem } from "../../../../System/NodeSystem/NodeItem";
import { INodeSystemInstructionOptions } from "../../../../System/PackageSystem/Instructions/NodeSystem/INodeSystemInstructionOptions";
import { NodeSystemInstruction } from "../../../../System/PackageSystem/Instructions/NodeSystem/NodeSystemInstruction";

suite(
    "NodeSystemInstruction",
    () =>
    {
        class MyNode extends Node<NodeItem, {}>
        {
            public constructor(options: INodeOptions<{}>)
            {
                super(options, (opts: INodeOptions<{}>, node: INode): NodeItem => new NodeItem(node));
            }
        }

        class MyNodeInstruction extends NodeSystemInstruction<NodeItem, {}>
        {
            public Type: string;

            public constructor(options: INodeSystemInstructionOptions<{}>)
            {
                super(options, (opts: INodeOptions<{}>, node: INode): NodeItem => new NodeItem(node));
            }
        }

        let id: string;
        let idNode: MyNode;
        let instruction: MyNodeInstruction;

        suiteSetup(
            () =>
            {
                id = "Foo";
                idNode = new MyNode(
                    {
                        ID: id,
                        Name: "bar"
                    });

                let names: string[] = [ "this", "is", "a", "test" ];
                let node: MyNode;

                for (let name of names.reverse())
                {
                    let child: MyNode = node;

                    node = new MyNode(
                        {
                            Name: name
                        });

                    if (!isNullOrUndefined(child))
                    {
                        node.Nodes.push(child);
                    }
                }

                let allNodes: Node<NodeItem, {}>[] = node.GetAllNodes();
                allNodes[Math.floor(Math.random() * allNodes.length)].Nodes.push(idNode);

                instruction = new MyNodeInstruction(
                    {
                        FileName: "test.xml",
                        Nodes: []
                    });

                instruction.Nodes.push(node);
            });

        suite(
            "ObjectsByID",
            () =>
            {
                test(
                    "Checking whether object-ids are queried correctly...",
                    () =>
                    {
                        assert.strictEqual(id in instruction.ObjectsByID, true);
                    });

                test(
                    "Checking whether the objects are assigned to the ids correctly...",
                    () =>
                    {
                        assert.strictEqual(instruction.ObjectsByID[id], idNode);
                    });
            });
    });