import * as assert from "assert";
import { Node } from "../../../System/NodeSystem/Node";
import { NodeItem } from "../../../System/NodeSystem/NodeItem";

suite(
    "NodeItem",
    () =>
    {
        suite(
            "Node",
            () =>
            {
                let node: Node<NodeItem, {}> = new Node<NodeItem, {}>(
                    {
                        Name: "foo",
                        Item: {}
                    },
                    (parent: Node<NodeItem, {}>): NodeItem =>
                    {
                        return new NodeItem(parent);
                    });

                test(
                    "Checking whether the `Node`-property is set correctly after initializing a new `NodeItem`...",
                    () =>
                    {
                        assert.strictEqual(node.Item.Node, node);
                    });
            });
    });