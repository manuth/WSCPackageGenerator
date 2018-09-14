import * as assert from "assert";
import { Package } from "../PackageSystem/Package";
import * as Path from "path";
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
            suite(
                "XML",
                () =>
                {
                    test(
                        "Test whether the XML-code is built correctly... ",
                        () =>
                        {
                            let sqlInstruction = new SQLInstruction({ Source: "main.sql" });
                            $package.InstallSet.push(sqlInstruction);
                            {
                                let xml = new DOMParser().parseFromString(sqlInstruction.XML);

                                assert.strictEqual(xml.documentElement.tagName, "instruction");
                                assert.strictEqual(xml.documentElement.hasAttribute("type"), true);
                                assert.strictEqual(xml.documentElement.getAttribute("type"), "sql");
                                assert.strictEqual(xml.documentElement.textContent, Path.join($package.InstallSet.Directory, sqlInstruction.FileName).replace(Path.sep, "/"));
                            }
                        });
                });
        });
});