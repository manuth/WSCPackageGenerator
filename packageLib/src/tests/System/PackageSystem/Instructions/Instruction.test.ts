import * as assert from "assert";
import * as Path from "path";
import { Instruction } from "../../../../System/PackageSystem/Instructions/Instruction";
import { Package } from "../../../../System/PackageSystem/Package";

suite(
    "Instruction",
    () =>
    {
        class MyInstruction extends Instruction
        {
            public Type: string = "custom";
        }

        let $package: Package;
        let instruction: MyInstruction;

        suiteSetup(
            () =>
            {
                instruction = new MyInstruction({
                    FileName: "example.txt",
                    Standalone: Math.random() > 0.5
                });

                $package = new Package({
                    Identifier: "example",
                    DisplayName: {},
                    InstallSet: {
                        Instructions: []
                    }
                });
            });

        suite(
            "Collection",
            () =>
            {
                suite(
                    "Checking whether the `Collection`-property is automatically set properly, when...",
                    () =>
                    {
                        test(
                            "...setting the `Collection`-property...",
                            () =>
                            {
                                instruction.Collection = $package.InstallSet;
                                assert.strictEqual(instruction.Collection, $package.InstallSet);
                            });

                        test(
                            "...setting the `Collection`-property to `null`...",
                            () =>
                            {
                                instruction.Collection = null;
                                assert.strictEqual(instruction.Collection, null);
                            });

                        test(
                            "...adding the instruction to an `InstructionSet`...",
                            () =>
                            {
                                $package.InstallSet.push(instruction);
                                assert.strictEqual(instruction.Collection, $package.InstallSet);
                            });

                        test(
                            "...removing the instruction from the `InstructionSet`...",
                            () =>
                            {
                                $package.InstallSet.pop();
                                assert.strictEqual(instruction.Collection, null);
                            });
                    });
            });

        suite(
            "DestinationRoot",
            () =>
            {
                suiteSetup(
                    () =>
                    {
                        instruction.Collection = $package.InstallSet;
                    });

                test(
                    "Checking whether the `DestinationRoot` is correct...",
                    () =>
                    {
                        assert.strictEqual(instruction.DestinationRoot, $package.InstallSet.Directory);
                    });
            });

        suite(
            "FullName",
            () =>
            {
                test(
                    "Checking whether the `FullName`-property is correct...",
                    () =>
                    {
                        assert.strictEqual(
                            instruction.FullName,
                            Path.join($package.InstallSet.Directory, instruction.FileName).replace(Path.sep, "/"));
                    });
            });

        suite(
            "Serialize()",
            () =>
            {
                let element: Element;

                suiteSetup(
                    () =>
                    {
                        element = instruction.Serialize();
                    });

                test(
                    "Checking whether the tag-name is correct...",
                    () =>
                    {
                        assert.strictEqual(element.tagName, "instruction");
                    });

                test(
                    "Checking whether the type-attribute is set correctly...",
                    () =>
                    {
                        assert.strictEqual(element.getAttribute("type"), instruction.Type);
                    });

                test(
                    "Checking whether the execution-mode is set correctly...",
                    () =>
                    {
                        if (instruction.Standalone)
                        {
                            assert.strictEqual(element.getAttribute("run"), "standalone");
                        }
                        else
                        {
                            assert.strictEqual(element.hasAttribute("run"), false);
                        }
                    });

                test(
                    "Checking whether the filename is set correctly...",
                    () =>
                    {
                        assert.strictEqual(element.textContent, instruction.FullName);
                    });
            });
    });