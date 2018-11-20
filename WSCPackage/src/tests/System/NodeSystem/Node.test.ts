import * as assert from "assert";
import { isNullOrUndefined } from "util";
import { INodeOptions } from "../../../System/NodeSystem/INodeOptions";
import { Node } from "../../../System/NodeSystem/Node";
import { NodeItem } from "../../../System/NodeSystem/NodeItem";

suite(
    "Node",
    () =>
    {
        /**
         * Represents a node.
         */
        class MyNode extends Node<NodeItem, {}>
        {
            public constructor(options: INodeOptions<{}>)
            {
                super(options, () => new NodeItem(this));
            }
        }

        let nodeAName: string;
        let nodeBName: string;
        let nodeCName: string;

        let nodeA: MyNode;
        let nodeB: MyNode;
        let nodeC: MyNode;

        setup(
            () =>
            {
                nodeAName = "foo";
                nodeBName = "bar";
                nodeCName = "baz";

                nodeA = new MyNode(
                    {
                        Name: nodeAName
                    });

                nodeB = new MyNode(
                    {
                        Name: nodeBName
                    });

                nodeC = new MyNode(
                    {
                        Name: nodeCName
                    });
            });

        suite(
            "FullName",
            () =>
            {
                test(
                    "Checking whether the `FullName`-property is built correctly...",
                    () =>
                    {
                        nodeA.Parent = nodeB;
                        nodeB.Parent = nodeC;

                        assert.strictEqual(nodeA.FullName, [nodeCName, nodeBName, nodeAName].join("."));
                    });
            });

        suite(
            "Parent",
            () =>
            {
                suite(
                    "Checking whether the `Parent`-property is automatically set properly, when...",
                    () =>
                    {
                        test(
                            "...setting the `Parent`-property...",
                            () =>
                            {
                                nodeA.Parent = nodeB;
                                assert.strictEqual(nodeA.Parent, nodeB);
                            });

                        test(
                            "...adding the node to another node's `Nodes`-array...",
                            () =>
                            {
                                nodeC.Nodes.push(nodeA);
                                assert.strictEqual(nodeA.Parent, nodeC);
                            });
                    });
            });

        suite(
            "Nodes",
            () =>
            {
                suite(
                    "Checking whether the `Nodes`-property is automatically set properly, when...",
                    () =>
                    {
                        test(
                            "...setting the `Parent`-property of another node...",
                            () =>
                            {
                                nodeB.Parent = nodeA;

                                assert.strictEqual(nodeA.Nodes.length, 1);
                                assert.strictEqual(nodeA.Nodes[0], nodeB);
                            });

                        test(
                            "...adding another node to the `Nodes`-array...",
                            () =>
                            {
                                nodeA.Nodes.push(nodeC);

                                assert.strictEqual(nodeA.Nodes.length, 1);
                                assert.strictEqual(nodeA.Nodes[0], nodeC);
                            });
                    });
            });

        suite(
            "GetAllNodes()",
            () =>
            {
                test(
                    "Checking whether `GetAllNodes()` gets all nodes recursively...",
                    () =>
                    {
                        nodeA.Parent = nodeB;
                        nodeB.Parent = nodeC;

                        assert.strictEqual(nodeC.GetAllNodes().includes(nodeA), true);
                        assert.strictEqual(nodeC.GetAllNodes().includes(nodeB), true);
                        assert.strictEqual(nodeC.GetAllNodes().includes(nodeC), true);
                        assert.strictEqual(nodeC.GetAllNodes().length, 3);
                    });
            });

        suite(
            "GetObjects()",
            () =>
            {
                let id: string;
                let idNode: MyNode;

                suiteSetup(
                    () =>
                    {
                        id = "Foo";
                        idNode = new MyNode(
                            {
                                ID: id,
                                Name: "example"
                            });
                    });

                test(
                    "Checking whether the node returns itself if an ID is assigned...",
                    () =>
                    {
                        assert.strictEqual(id in idNode.GetObjects(), true);
                        assert.strictEqual(idNode.GetObjects()[id], idNode);
                    });

                test(
                    "Checking whether nodes with IDs are recognized correctly if they are nested deeply...",
                    () =>
                    {
                        let rootNode: MyNode = new MyNode(
                            {
                                Name: "root"
                            });

                        let names: string[] = ["foo", "bar", "baz", "this", "is", "a", "test"];
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

                        rootNode.Nodes.push(node);

                        let allNodes: Node<NodeItem, {}>[] = rootNode.GetAllNodes();
                        allNodes[Math.floor(Math.random() * allNodes.length)].Nodes.push(idNode);

                        assert.strictEqual(id in rootNode.GetObjects(), true);
                        assert.strictEqual(rootNode.GetObjects()[id], idNode);
                    });
            });
    });