import * as assert from "assert";
import { Node } from "../../../System/NodeSystem/Node";
import { NodeItem } from "../../../System/NodeSystem/NodeItem";

suite(
    "Node",
    () =>
    {
        let nodeAName: string;
        let nodeBName: string;
        let nodeCName: string;

        let nodeA: Node<NodeItem, {}>;
        let nodeB: Node<NodeItem, {}>;
        let nodeC: Node<NodeItem, {}>;

        setup(
            () =>
            {
                nodeAName = "foo";
                nodeBName = "bar";
                nodeCName = "baz";

                nodeA = new Node(
                    {
                        Name: nodeAName
                    },
                    (): NodeItem => null);

                nodeB = new Node(
                    {
                        Name: nodeBName
                    },
                    (): NodeItem => null);

                nodeC = new Node(
                    {
                        Name: nodeCName
                    },
                    (): NodeItem => null);
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
    });