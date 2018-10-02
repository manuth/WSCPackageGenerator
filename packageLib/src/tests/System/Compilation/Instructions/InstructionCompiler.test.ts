import * as assert from "assert";
import * as FileSystem from "fs-extra";
import { InstructionCompiler } from "../../../../System/Compilation/Instructions/InstructionCompiler";
import { TempFile } from "../../../../System/FileSystem/TempFile";
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
                        super({ FileName: null });
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

                compiler.DestinationPath = tempFile.FileName;
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
                        content = (await FileSystem.readFile(tempFile.FileName)).toString();
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
    });