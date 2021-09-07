import { ok } from "assert";
import { GeneratorOptions, IFileMapping } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { InstructionComponent } from "../../Components/InstructionComponent";
import { InstructionFileMapping } from "../../FileMappings/InstructionFileMapping";
import { WoltLabPackageGenerator } from "../../generators/package/WoltLabPackageGenerator";
import { IWoltLabSettings } from "../../Settings/IWoltLabSettings";

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
                public get ClassName(): string
                {
                    return "TestInstruction";
                }

                /**
                 * @inheritdoc
                 */
                public get InstructionFileMapping(): IFileMapping<IWoltLabSettings, GeneratorOptions>
                {
                    return this.fileMapping;
                }
            }

            let generator: WoltLabPackageGenerator;
            let component: TestInstructionComponent;

            suiteSetup(
                async function()
                {
                    this.timeout(5 * 60 * 1000);
                    generator = await context.Generator;
                    component = new TestInstructionComponent(generator);
                });

            suite(
                nameof<TestInstructionComponent>((component) => component.InstructionFileName),
                () =>
                {
                    test(
                        "Checking whether the file-name ha s a TypeScript-extension…",
                        () =>
                        {
                            ok(component.InstructionFileName.endsWith(".ts"));
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
        });
}
