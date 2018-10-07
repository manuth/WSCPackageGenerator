import * as assert from "assert";
import * as FileSystem from "fs-extra";
import { DOMParser } from "xmldom";
import { ListenerFileCompiler } from "../../../../System/Compilation/Events/ListenerFileCompiler";
import { IListenerOptions } from "../../../../System/Events/IListenerOptions";
import { Listener } from "../../../../System/Events/Listener";
import { ListenerEnvironment } from "../../../../System/Events/ListenerEnvironment";
import { TempFile } from "../../../../System/FileSystem/TempFile";
import { IListenerInstruction } from "../../../../System/PackageSystem/Instructions/Events/IListenerInstruction";
import { IListenerInstructionOptions } from "../../../../System/PackageSystem/Instructions/Events/IListenerInstructionOptions";
import { ListenerInstruction } from "../../../../System/PackageSystem/Instructions/Events/ListenerInstruction";
import { XMLEditor } from "../../../../System/Serialization/XMLEditor";

suite(
    "ListenerFileCompiler",
    () =>
    {
        let tempFile: TempFile;
        let listenerTag: string;
        let compiler: ListenerFileCompiler<IListenerInstruction<Listener>, Listener>;
        let name: string;
        let environment: ListenerEnvironment;
        let event: string;
        let executionOrder: number;
        let permissions: string[];
        let enableOptions: string[];

        suiteSetup(
            () =>
            {
                listenerTag = "myListener";

                class MyListenerInstruction extends ListenerInstruction<Listener, IListenerOptions>
                {
                    public constructor(options: IListenerInstructionOptions<IListenerOptions>)
                    {
                        super(options,
                            (opts: IListenerOptions) =>
                            {
                                return new class extends Listener
                                {
                                }(opts);
                            });
                    }

                    public get Type(): string
                    {
                        return "baz";
                    }
                }

                class MyListenerFileCompiler extends ListenerFileCompiler<MyListenerInstruction, Listener>
                {
                    protected get ListenerTagName(): string
                    {
                        return listenerTag;
                    }

                    protected get SchemaLocation(): string
                    {
                        return "http://example.com/myListener.xsd";
                    }
                }

                tempFile = new TempFile();
                name = "test";
                environment = ListenerEnvironment.FrontEnd;
                event = "exampleEvent";
                executionOrder = Math.floor(Math.random() * 100);
                permissions = ["foo", "bar", "baz"];
                enableOptions = ["this", "is", "a", "test"];

                let instruction: ListenerInstruction<Listener, IListenerOptions> = new MyListenerInstruction(
                    {
                        FileName: null,
                        Listeners: [
                            {
                                Name: name,
                                Environment: environment,
                                EventName: event,
                                ExecutionOrder: executionOrder,
                                Permissions: permissions,
                                Options: enableOptions
                            }
                        ]
                    });

                compiler = new MyListenerFileCompiler(instruction);
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
                suite(
                    "General",
                    () =>
                    {
                        test(
                            "Checking whether the compiler can be executed...",
                            async () =>
                            {
                                await compiler.Execute();
                            });
                    });

                suite(
                    "Checking the integrity of the file...",
                    () =>
                    {
                        let editor: XMLEditor;

                        suite("General",
                            () =>
                            {
                                let rootTag: string;

                                suiteSetup(
                                    () =>
                                    {
                                        rootTag = "data";
                                    });

                                test(
                                    "Checking whether the content of the compiled file is valid xml...",
                                    async () =>
                                    {
                                        let document: Document = new DOMParser().parseFromString((await FileSystem.readFile(tempFile.FileName)).toString());
                                        editor = new XMLEditor(document.documentElement);
                                    });

                                test(
                                    "Checking whether the name of the root-tag is correct...",
                                    () =>
                                    {
                                        assert.strictEqual(editor.TagName, rootTag);
                                    });
                            });

                        suite(
                            "Checking the integrity of the import-list",
                            () =>
                            {
                                let importEditor: XMLEditor;

                                suite(
                                    "General",
                                    () =>
                                    {
                                        let importTag: string;

                                        suiteSetup(
                                            () =>
                                            {
                                                importTag = "import";
                                            });

                                        test(
                                            "Checking whether the import-list is present...",
                                            () =>
                                            {
                                                assert.strictEqual(editor.HasTag(importTag, true), true);
                                                importEditor = editor.GetChildrenByTag(importTag)[0];
                                            });
                                    });

                                suite(
                                    "Checking the integrity of the listener...",
                                    () =>
                                    {
                                        let listenerEditor: XMLEditor;
                                        let nameAttribute: string;
                                        let environmentTag: string;
                                        let eventTag: string;
                                        let executionOrderTag: string;
                                        let permissionsTag: string;
                                        let optionsTag: string;

                                        suiteSetup(
                                            () =>
                                            {
                                                nameAttribute = "name";
                                                environmentTag = "environment";
                                                eventTag = "eventname";
                                                executionOrderTag = "nice";
                                                permissionsTag = "permissions";
                                                optionsTag = "options";
                                            });

                                        test(
                                            "Checking whether the listener is present...",
                                            () =>
                                            {
                                                assert.strictEqual(importEditor.HasTag(listenerTag, true), true);
                                                listenerEditor = importEditor.GetChildrenByTag(listenerTag)[0];
                                            });

                                        test(
                                            "Checking the integrity of the meta-data...",
                                            () =>
                                            {
                                                assert.strictEqual(listenerEditor.HasAttribute(nameAttribute, name), true);
                                                assert.strictEqual(listenerEditor.HasText(environmentTag, environment), true);
                                                assert.strictEqual(listenerEditor.HasText(eventTag, event), true);
                                                assert.strictEqual(listenerEditor.HasText(executionOrderTag, executionOrder.toString()), true);
                                                assert.strictEqual(listenerEditor.HasText(permissionsTag, permissions.join(",")), true);
                                                assert.strictEqual(listenerEditor.HasText(optionsTag, enableOptions.join(",")), true);
                                            });
                                    });
                            });
                    });
            });
    });