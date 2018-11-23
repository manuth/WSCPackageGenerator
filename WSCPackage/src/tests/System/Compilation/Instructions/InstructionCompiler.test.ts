import * as assert from "assert";
import * as FileSystem from "fs-extra";
import { TempFile } from "temp-filesystem";
import { InstructionCompiler } from "../../../../System/Compilation/PackageSystem/Instructions/InstructionCompiler";
import { IInstruction } from "../../../../System/PackageSystem/Instructions/IInstruction";
import { Instruction } from "../../../../System/PackageSystem/Instructions/Instruction";
import { Package } from "../../../../System/PackageSystem/Package";

suite(
    "InstructionCompiler",
    () =>
    {
        let tempFile: TempFile;
        let compiler: InstructionCompiler<IInstruction>;
        let type: string;
        let objectID: string;
        let object: object;

        suiteSetup(
            () =>
            {
                let objects: { [key: string]: object } = {};
                tempFile = new TempFile();
                type = "test";
                objectID = "date";
                object = new Date();
                objects[objectID] = object;

                let $package: Package = new Package(
                    {
                        Identifier: "foobar",
                        DisplayName: {},
                        InstallSet: {
                            Instructions: []
                        }
                    });

                let instruction: Instruction = new class extends Instruction
                {
                    public Type: string = type;

                    public constructor()
                    {
                        super({ FileName: "example.txt" });
                    }

                    public get ObjectsByID(): { [key: string]: any }
                    {
                        return objects;
                    }
                }();

                $package.InstallSet.push(instruction);

                compiler = new class extends InstructionCompiler<IInstruction>
                {
                    public constructor(item: IInstruction)
                    {
                        super(item);
                    }

                    protected async Compile(): Promise<void>
                    {
                        await FileSystem.writeFile(this.DestinationPath, `<%= Item.Type %>\n<%= $("${objectID}") %>`);
                        await this.CopyTemplate(this.DestinationPath, this.DestinationPath);
                    }
                }(instruction);

                compiler.DestinationPath = tempFile.FullName;
            });

        suiteTeardown(
            () =>
            {
                tempFile.Dispose();
            });

        suite(
            "Compile()",
            () =>
            {
                test(
                    "Checking whether the item can be compiled...",
                    async () =>
                    {
                        await compiler.Execute();
                    });
            });

        suite(
            "CopyTemplate()",
            () =>
            {
                let content: string;

                suiteSetup(
                    async () =>
                    {
                        content = (await FileSystem.readFile(tempFile.FullName)).toString();
                    });

                test(
                    "Checking whether members of the item are replaced using ejs...",
                    () =>
                    {
                        assert.strictEqual(new RegExp(`^${type}$`, "gm").test(content), true);
                    });

                test(
                    "Checking whether $-substitutions are replaced using ejs...",
                    () =>
                    {
                        assert.strictEqual(content.includes(`${object}`), true);
                    });
            });

        suite(
            "Serialize()",
            () =>
            {
                let document: Document;

                suiteSetup(
                    () =>
                    {
                        document = compiler.Serialize();
                    });

                test(
                    "Checking whether the tag-name is correct...",
                    () =>
                    {
                        assert.strictEqual(document.documentElement.tagName, "instruction");
                    });

                test(
                    "Checking whether the type-attribute is set correctly...",
                    () =>
                    {
                        assert.strictEqual(document.documentElement.getAttribute("type"), compiler.Item.Type);
                    });

                test(
                    "Checking whether the execution-mode is set correctly...",
                    () =>
                    {
                        if (compiler.Item.Standalone)
                        {
                            assert.strictEqual(document.documentElement.getAttribute("run"), "standalone");
                        }
                        else
                        {
                            assert.strictEqual(document.documentElement.hasAttribute("run"), false);
                        }
                    });

                test(
                    "Checking whether the filename is set correctly...",
                    () =>
                    {
                        assert.strictEqual(document.documentElement.textContent, compiler.Item.FullName);
                    });
            });
    });