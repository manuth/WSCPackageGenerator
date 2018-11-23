import * as assert from "assert";
import * as FileSystem from "fs-extra";
import { TempFile } from "temp-filesystem";
import { DOMParser } from "xmldom";
import { ListenerFileCompiler } from "../../../../System/Compilation/Events/ListenerFileCompiler";
import { IListenerOptions } from "../../../../System/Events/IListenerOptions";
import { Listener } from "../../../../System/Events/Listener";
import { ListenerEnvironment } from "../../../../System/Events/ListenerEnvironment";
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

                /**
                 * Represenst an instruction which provides listeners.
                 */
                class MyListenerInstruction extends ListenerInstruction<Listener, IListenerOptions>
                {
                    /**
                     * Initializes a new instance of the `MyListenerInstruction` class.
                     *
                     * @param options
                     * The options for the initialization.
                     */
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

                    public get Type()
                    {
                        return "baz";
                    }
                }

                /**
                 * Provides the functionality to compile `MyListenerInstruction`s.
                 */
                class MyListenerFileCompiler extends ListenerFileCompiler<MyListenerInstruction, Listener>
                {
                    protected get ObjectTagName()
                    {
                        return listenerTag;
                    }

                    protected get SchemaLocation()
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
                        let importEditor: XMLEditor;

                        suite(
                            "General",
                            () =>
                            {
                                test(
                                    "Checking whether the content of the compiled file is valid xml...",
                                    async () =>
                                    {
                                        let document = new DOMParser().parseFromString((await FileSystem.readFile(tempFile.FullName)).toString());
                                        importEditor = new XMLEditor(document.documentElement).GetChildrenByTag("import")[0];
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