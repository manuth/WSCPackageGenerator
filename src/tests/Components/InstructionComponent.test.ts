import { ok, strictEqual } from "assert";
import { GeneratorOptions, IFileMapping, Question } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { InstructionComponent } from "../../Components/InstructionComponent.js";
import { InstructionFileMapping } from "../../FileMappings/InstructionFileMapping.js";
import { WoltLabPackageGenerator } from "../../generators/package/WoltLabPackageGenerator.js";
import { IWoltLabComponentOptions } from "../../Settings/IWoltLabComponentOptions.js";
import { IWoltLabSettings } from "../../Settings/IWoltLabSettings.js";
import { WoltLabComponentSettingKey } from "../../Settings/WoltLabComponentSettingKey.js";

/**
 * Registers tests for the {@link InstructionComponent `InstructionComponent<TSettings, TOptions>`} class.
 *
 * @param context
 * The test-context.
 */
export function InstructionComponentTests(context: TestContext<WoltLabPackageGenerator>): void
{
    suite(
        nameof(InstructionComponent),
        () =>
        {
            /**
             * Provides an implementation of the {@link InstructionComponent `InstructionComponent<TSettings, TOptions>`} class for testing.
             */
            class TestInstructionComponent extends InstructionComponent<IWoltLabSettings, GeneratorOptions>
            {
                /**
                 * A file-mapping.
                 */
                private fileMapping = new InstructionFileMapping(this);

                /**
                 * @inheritdoc
                 */
                public get ID(): string
                {
                    return "test";
                }

                /**
                 * @inheritdoc
                 */
                public get DisplayName(): string
                {
                    return "Test";
                }

                /**
                 * @inheritdoc
                 */
                public override get PathQuestion(): Question<IWoltLabComponentOptions>
                {
                    return super.PathQuestion;
                }

                /**
                 * @inheritdoc
                 */
                public get InstructionFileMapping(): IFileMapping<IWoltLabSettings, GeneratorOptions>
                {
                    return this.fileMapping;
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
                public GetClassName(options: IWoltLabComponentOptions): string
                {
                    return GetExpectedClassName(options);
                }

                /**
                 * @inheritdoc
                 *
                 * @param options
                 * The options which have been provided by the user.
                 *
                 * @returns
                 * The name of the instruction-variable to export.
                 */
                public override GetVariableName(options: IWoltLabComponentOptions): string
                {
                    return super.GetVariableName(options);
                }

                /**
                 * @inheritdoc
                 *
                 * @param options
                 * The options which have been provided by the user.
                 *
                 * @returns
                 * The default name of the file to write the instruction to.
                 */
                public override GetInstructionFileName(options: IWoltLabComponentOptions): string
                {
                    return super.GetInstructionFileName(options);
                }
            }

            let className: string;
            let generator: WoltLabPackageGenerator;
            let component: TestInstructionComponent;

            suiteSetup(
                async function()
                {
                    this.timeout(5 * 60 * 1000);
                    generator = await context.Generator;
                    component = new TestInstructionComponent(generator);
                });

            setup(
                () =>
                {
                    className = context.RandomString;
                });

            /**
             * Gets the expected name of the class.
             *
             * @param options
             * The options provided by the user.
             *
             * @returns
             * The expected class name.
             */
            function GetExpectedClassName(options: IWoltLabComponentOptions): string
            {
                return `${className}-${options.path}`;
            }

            suite(
                nameof<TestInstructionComponent>((component) => component.PathQuestion),
                () =>
                {
                    test(
                        `Checking whether the \`${nameof<Question>((q) => q.default)}\` value changes dynamically…`,
                        () =>
                        {
                            for (let value of ["hello", "world"])
                            {
                                let options: IWoltLabComponentOptions = {
                                    [WoltLabComponentSettingKey.Path]: value
                                };

                                let defaultValue: string;

                                if (typeof component.PathQuestion.default === "function")
                                {
                                    defaultValue = component.PathQuestion.default(options);
                                }
                                else
                                {
                                    defaultValue = component.PathQuestion.default;
                                }

                                strictEqual(defaultValue, GetExpectedClassName(options));
                            }
                        });
                });

            suite(
                nameof<TestInstructionComponent>((component) => component.FileMappings),
                () =>
                {
                    test(
                        `Checking whether the \`${nameof<TestInstructionComponent>((c) => c.InstructionFileMapping)}\` is included…`,
                        () =>
                        {
                            ok(component.FileMappings.includes(component.InstructionFileMapping));
                        });
                });

            suite(
                nameof<TestInstructionComponent>((component) => component.GetInstructionFileName),
                () =>
                {
                    test(
                        "Checking whether the file-name has a TypeScript-extension…",
                        () =>
                        {
                            ok(component.InstructionFileName.endsWith(".ts"));
                        });
                });
        });
}
