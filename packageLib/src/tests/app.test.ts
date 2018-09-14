import * as assert from "assert";
import { Instruction } from "../PackageSystem/Instructions/Instruction";
import { Package } from "../PackageSystem/Package";
import { SQLInstruction } from "../PackageSystem/Instructions/Data/SQLInstruction";
import { DOMParser } from "xmldom";

suite("WSCPackageGenerator", () =>
{
    let $package: Package;

    suiteSetup(
        () =>
        {
            $package = new Package({
                DisplayName: { inv: "Test" },
                Identifier: "test",
                InstallSet: {
                    Instructions: [
                    ]
                }
            });
        });

    suite(
        "Instruction",
        () =>
        {
            let instruction: Instruction;

            suiteSetup(
                () =>
                {
                    instruction = new SQLInstruction({ Source: "main.sql" });
                    $package.InstallSet.push(instruction);
                });

            suite(
                "Type",
                () =>
                {
                    test(
                        "Testing whether type equals the expected value...",
                        () =>
                        {
                            assert.strictEqual(instruction.Type, "sql");
                        });
                });

            suite(
                "XML",
                () =>
                {
                    suite(
                        "Testing whether the XML-code is built correctly... ",
                        () =>
                        {
                            let xml: Document;

                            suiteSetup(
                                () =>
                                {
                                    xml = new DOMParser().parseFromString(instruction.XML);
                                });

                            test(
                                "Testing whether the root-tag has the correct name...",
                                () =>
                                {
                                    assert.strictEqual(xml.documentElement.tagName, "instruction");
                                });

                            test(
                                'Testing whether the "type"-attribute is present...',
                                () =>
                                {
                                    assert.strictEqual(xml.documentElement.hasAttribute("type"), true);
                                });

                            test(
                                'Testing whether the "type"-attribute equals the "Type"-member of the instruction...',
                                () =>
                                {
                                    assert.strictEqual(xml.documentElement.getAttribute("type"), instruction.Type);
                                });

                            test(
                                "Testing whether the text of the tag equals the filename of the instruction...",
                                () =>
                                {
                                    assert.strictEqual(xml.documentElement.textContent, instruction.FullName);
                                });
                        });
                });
        });
});