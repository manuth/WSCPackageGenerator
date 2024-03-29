import { notStrictEqual, ok, strictEqual } from "node:assert";
import { FileMapping, GeneratorOptions, IFileMapping, Question } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { IPathQuestion, QuestionSetProperty, SetQuestion } from "@manuth/generator-ts-project";
import { PHPInstruction, SelfContainedPHPInstruction } from "@manuth/woltlab-compiler";
import { AsyncDynamicQuestionProperty, ListQuestion } from "inquirer";
import { Random } from "random-js";
import path from "upath";
import { IApplicationQuestion } from "../../../../Components/Inquiry/Prompts/IApplicationQuestion.js";
import { PHPScriptComponent } from "../../../../generators/package/Components/PHPScriptComponent.js";
import { PHPInstructionFileMapping } from "../../../../generators/package/FileMappings/PHPInstructionFileMapping.js";
import { SelfContainedPHPFileMapping } from "../../../../generators/package/FileMappings/SelfContainedPHPFileMapping.js";
import { IPHPScriptComponentOptions } from "../../../../generators/package/Settings/IPHPScriptComponentOptions.js";
import { PackageComponentType } from "../../../../generators/package/Settings/PackageComponentType.js";
import { WoltLabPackageGenerator } from "../../../../generators/package/WoltLabPackageGenerator.js";
import { IWoltLabSettings } from "../../../../Settings/IWoltLabSettings.js";
import { WoltLabComponentSettingKey } from "../../../../Settings/WoltLabComponentSettingKey.js";
import { WoltLabSettingKey } from "../../../../Settings/WoltLabSettingKey.js";

const { normalize } = path;

/**
 * Registers tests for the {@link PHPScriptComponent `PHPScriptComponent<TSettings, TOptions, TComponentOptions>`} class.
 *
 * @param context
 * The test-context.
 */
export function PHPScriptComponentTests(context: TestContext<WoltLabPackageGenerator>): void
{
    suite(
        nameof(PHPScriptComponent),
        () =>
        {
            /**
             * Provides an implementation of the {@link PHPScriptComponent `PHPScriptComponent<TSettings, TOptions, TComponentOptions>`} class for testing.
             */
            class TestPHPScriptComponent extends PHPScriptComponent<IWoltLabSettings, GeneratorOptions, IPHPScriptComponentOptions>
            {
                /**
                 * @inheritdoc
                 */
                public override get ScriptTypeQuestion(): ListQuestion<IPHPScriptComponentOptions>
                {
                    return super.ScriptTypeQuestion;
                }

                /**
                 * @inheritdoc
                 */
                public override get PathQuestion(): Question<IPHPScriptComponentOptions>
                {
                    return super.PathQuestion;
                }

                /**
                 * @inheritdoc
                 */
                public override get AppQuestion(): IApplicationQuestion<IPHPScriptComponentOptions>
                {
                    return super.AppQuestion;
                }

                /**
                 * @inheritdoc
                 */
                public override get LocationQuestion(): SetQuestion<IPHPScriptComponentOptions, IWoltLabSettings>
                {
                    return super.LocationQuestion;
                }

                /**
                 * @inheritdoc
                 */
                public override get SourceQuestion(): IPathQuestion<IPHPScriptComponentOptions>
                {
                    return super.SourceQuestion;
                }

                /**
                 * @inheritdoc
                 */
                public override get ComponentOptionQuestionCollection(): Array<Question<IPHPScriptComponentOptions>>
                {
                    return super.ComponentOptionQuestionCollection;
                }

                /**
                 * @inheritdoc
                 */
                public override get InstructionFileMapping(): IFileMapping<IWoltLabSettings, GeneratorOptions>
                {
                    return super.InstructionFileMapping;
                }

                /**
                 * @inheritdoc
                 *
                 * @param options
                 * The options which have been provided by the user.
                 *
                 * @returns
                 * The name of the instruction-class.
                 */
                public override GetClassName(options: IPHPScriptComponentOptions): string
                {
                    return super.GetClassName(options);
                }

                /**
                 * @inheritdoc
                 *
                 * @param options
                 * The options of the component.
                 *
                 * @returns
                 * The default full name of the path to suggest in the {@link PHPScriptComponent.SourceQuestion `SourceQuestion`}.
                 */
                public override GetDefaultSource(options: IPHPScriptComponentOptions): string
                {
                    return super.GetDefaultSource(options);
                }

                /**
                 * @inheritdoc
                 *
                 * @param options
                 * The options provided by the user.
                 *
                 * @param expected
                 * A value indicating whether the php-script must be self-contained for passing the predicate.
                 *
                 * @param base
                 * The base of the predicate.
                 *
                 * @returns
                 * A predicate for checking whether the php-script is self-contained.
                 */
                public override async GetSelfContainedPredicate(options: IPHPScriptComponentOptions, expected: boolean, base?: AsyncDynamicQuestionProperty<boolean, IPHPScriptComponentOptions>): Promise<boolean>
                {
                    return super.GetSelfContainedPredicate(options, expected, base);
                }
            }

            let random: Random;
            let generator: WoltLabPackageGenerator;
            let component: TestPHPScriptComponent;
            let options: IPHPScriptComponentOptions;

            suiteSetup(
                async function()
                {
                    this.timeout(5 * 60 * 1000);
                    random = new Random();
                    generator = await context.Generator;
                    component = new TestPHPScriptComponent(generator);
                });

            setup(
                () =>
                {
                    options = {
                        [WoltLabComponentSettingKey.Path]: `${random.string(20)}.ts`,
                        Application: "wcf",
                        FileName: "install.php",
                        SelfContained: true,
                        Source: generator.assetPath("install.php")
                    };

                    Object.assign<IWoltLabSettings, Partial<IWoltLabSettings>>(
                        generator.Settings,
                        {
                            [WoltLabSettingKey.Identifier]: "com.example.test",
                            [WoltLabSettingKey.ComponentOptions]: {
                                [PackageComponentType.PHPScript]: options
                            }
                        });
                });

            /**
             * Fetches the actual result of the specified {@link value `value`}.
             *
             * @param value
             * The value to fetch.
             *
             * @param answers
             * The answers provided by the user.
             *
             * @returns
             * The fetched value.
             */
            // eslint-disable-next-line @typescript-eslint/ban-types
            async function FetchAsyncQuestionProperty<T extends AsyncDynamicQuestionProperty<{}, IPHPScriptComponentOptions>>(value: T, answers: IPHPScriptComponentOptions): Promise<T extends AsyncDynamicQuestionProperty<infer U, IPHPScriptComponentOptions> ? U : never>
            {
                // eslint-disable-next-line @typescript-eslint/ban-types
                let questionSetValue: QuestionSetProperty<{}, IPHPScriptComponentOptions, IWoltLabSettings> = value;
                let result: unknown;

                if (typeof questionSetValue === "function")
                {
                    result = await questionSetValue(answers, generator.Settings);
                }
                else
                {
                    result = await questionSetValue;
                }

                return result as any;
            }

            suite(
                nameof<TestPHPScriptComponent>((component) => component.AppQuestion),
                () =>
                {
                    test(
                        `Checking whether a different message is returned based on the \`${nameof<IPHPScriptComponentOptions>((o) => o.SelfContained)}\`-option…`,
                        async () =>
                        {
                            options.SelfContained = true;
                            let selfContainedMessage = await FetchAsyncQuestionProperty(component.AppQuestion.message, options);
                            options.SelfContained = false;
                            let defaultMessage = await FetchAsyncQuestionProperty(component.AppQuestion.message, options);
                            notStrictEqual(selfContainedMessage, defaultMessage);
                        });
                });

            suite(
                nameof<TestPHPScriptComponent>((component) => component.LocationQuestion),
                () =>
                {
                    test(
                        `Checking whether a different message is returned based on the \`${nameof<IPHPScriptComponentOptions>((o) => o.SelfContained)}\`-option…`,
                        async () =>
                        {
                            options.SelfContained = true;
                            let selfContainedMessage = await FetchAsyncQuestionProperty(component.AppQuestion.message, options);
                            options.SelfContained = false;
                            let defaultMessage = await FetchAsyncQuestionProperty(component.AppQuestion.message, options);
                            notStrictEqual(selfContainedMessage, defaultMessage);
                        });

                    test(
                        "Checking whether a default file-name is suggested if a self-contained PHP-script is being created…",
                        async () =>
                        {
                            options.SelfContained = true;
                            ok(typeof await FetchAsyncQuestionProperty(component.LocationQuestion.default, options) === "string");
                            options.SelfContained = false;
                            ok(typeof await FetchAsyncQuestionProperty(component.LocationQuestion.default, options) === "undefined");
                        });
                });

            suite(
                nameof<TestPHPScriptComponent>((component) => component.SourceQuestion),
                () =>
                {
                    test(
                        "Checking whether the question is asked only if a self-contained PHP-script is being created…",
                        async () =>
                        {
                            options.SelfContained = true;
                            ok(await FetchAsyncQuestionProperty(component.SourceQuestion.when, options));
                        });
                });

            suite(
                nameof<TestPHPScriptComponent>((component) => component.ComponentOptionQuestionCollection),
                () =>
                {
                    test(
                        "Checking whether the important questions are asked first…",
                        () =>
                        {
                            let questions = [
                                component.ScriptTypeQuestion,
                                component.PathQuestion,
                                component.AppQuestion,
                                component.SourceQuestion,
                                component.LocationQuestion
                            ];

                            for (let i = 0; i < questions.length; i++)
                            {
                                strictEqual(questions[i].name, component.ComponentOptionQuestionCollection[i].name);
                            }
                        });
                });

            suite(
                nameof<TestPHPScriptComponent>((component) => component.InstructionFileMapping),
                () =>
                {
                    test(
                        "Checking whether the proper file-mapping is returned…",
                        () =>
                        {
                            options.SelfContained = true;
                            ok(component.InstructionFileMapping instanceof SelfContainedPHPFileMapping);
                            options.SelfContained = false;
                            ok(component.InstructionFileMapping instanceof PHPInstructionFileMapping);
                        });
                });

            suite(
                nameof<TestPHPScriptComponent>((component) => component.FileMappings),
                () =>
                {
                    test(
                        "Checking whether a file-mapping for creating the source file is included if a self contained script is being created…",
                        () =>
                        {
                            let hasSourceMapping = (): boolean =>
                            {
                                return component.FileMappings.map(
                                    (fileMapping) =>
                                    {
                                        return new FileMapping(generator, fileMapping);
                                    }).some(
                                        (fileMapping) =>
                                        {
                                            return normalize(generator.destinationPath(options.Source)) === normalize(fileMapping.Destination);
                                        });
                            };

                            for (let value of [null, undefined, false])
                            {
                                options.SelfContained = value;
                                ok(!hasSourceMapping());
                            }

                            options.SelfContained = true;
                            ok(hasSourceMapping());
                        });
                });

            suite(
                nameof<TestPHPScriptComponent>((component) => component.GetClassName),
                () =>
                {
                    test(
                        "Checking whether the proper class-name is returned based on whether a self contained file is being created…",
                        () =>
                        {
                            /**
                             * Gets the name of the class.
                             *
                             * @returns
                             * The name of the class.
                             */
                            function GetClassName(): string
                            {
                                return component.GetClassName(options);
                            }

                            for (let selfContained of [undefined, false])
                            {
                                options.SelfContained = selfContained;
                                strictEqual(GetClassName(), nameof<PHPInstruction>());
                            }

                            options.SelfContained = true;
                            strictEqual(GetClassName(), nameof<SelfContainedPHPInstruction>());
                        });
                });

            suite(
                nameof<TestPHPScriptComponent>((component) => component.GetDefaultSource),
                () =>
                {
                    test(
                        "Checking whether the path to a `.php`-file is suggested…",
                        () =>
                        {
                            ok(component.GetDefaultSource(options).endsWith(".php"));
                        });
                });

            suite(
                nameof<TestPHPScriptComponent>((component) => component.GetSelfContainedPredicate),
                () =>
                {
                    test(
                        "Checking whether a proper predicate can be created…",
                        async () =>
                        {
                            options.SelfContained = true;
                            ok(await component.GetSelfContainedPredicate(options, true));
                            ok(!await component.GetSelfContainedPredicate(options, false));
                            ok(await component.GetSelfContainedPredicate(options, true, () => true));
                            ok(!await component.GetSelfContainedPredicate(options, true, () => false));
                            options.SelfContained = false;
                            ok(!await component.GetSelfContainedPredicate(options, true));
                            ok(await component.GetSelfContainedPredicate(options, false));
                        });
                });
        });
}
