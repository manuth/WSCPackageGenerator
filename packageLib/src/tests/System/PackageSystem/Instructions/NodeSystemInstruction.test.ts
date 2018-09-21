import * as assert from "assert";
import { INodeOptions } from "../../../../System/NodeSystem/INodeOptions";
import { Node } from "../../../../System/NodeSystem/Node";
import { NodeItem } from "../../../../System/NodeSystem/NodeItem";
import { INodeSystemInstructionOptions } from "../../../../System/PackageSystem/Instructions/INodeSystemInstructionOptions";
import { NodeSystemInstruction } from "../../../../System/PackageSystem/Instructions/NodeSystemInstruction";

suite(
    "NodeSystemInstruction",
    () =>
    {
        class MyNode extends Node<NodeItem, {}>
        {
            public constructor(options: INodeOptions<{}>)
            {
                super(options, (): NodeItem => new NodeItem());
            }
        }

        class MyNodeInstruction extends NodeSystemInstruction<NodeItem, {}>
        {
            public Type: string;

            public constructor(options: INodeSystemInstructionOptions<{}>)
            {
                super(options, (): NodeItem => new NodeItem());
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
                    let child: MyNode = node || idNode;

                    node = new MyNode(
                        {
                            Name: name
                        });

                    node.Nodes.push(child);
                }

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