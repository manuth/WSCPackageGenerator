import { strictEqual } from "assert";
import { GeneratorOptions, Question } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { IPathQuestion } from "@manuth/generator-ts-project";
import { FileUploadComponentBase } from "../../Components/FileUploadComponentBase.js";
import { IApplicationQuestion } from "../../Components/Inquiry/Prompts/IApplicationQuestion.js";
import { WoltLabPackageGenerator } from "../../generators/package/WoltLabPackageGenerator.js";
import { IFileUploadComponentOptions } from "../../Settings/IFileUploadComponentOptions.js";
import { IWoltLabSettings } from "../../Settings/IWoltLabSettings.js";

/**
 * Registers tests for the {@link FileUploadComponentBase `FileUploadComponentBase<TSettings, TOptions>`} class.
 *
 * @param context
 * The test-context.
 */
export function FileUploadComponentBaseTests(context: TestContext<WoltLabPackageGenerator>): void
{
    suite(
        nameof(FileUploadComponentBase),
        () =>
        {
            /**
             * Provides an implementation of the {@link FileUploadComponentBase `FileUploadComponentBase<TSettings, TOptions>`} class for testing.
             */
            class TestFileUploadComponentBase extends FileUploadComponentBase<IWoltLabSettings, GeneratorOptions, IFileUploadComponentOptions>
            {
                /**
                 * @inheritdoc
                 */
                public get DefaultSourceBaseName(): string
                {
                    return "baseName";
                }

                /**
                 * @inheritdoc
                 */
                public get ClassName(): string
                {
                    return "className";
                }

                /**
                 * @inheritdoc
                 */
                public get ID(): string
                {
                    return "id";
                }

                /**
                 * @inheritdoc
                 */
                public get DisplayName(): string
                {
                    return "displayName";
                }

                /**
                 * @inheritdoc
                 */
                public override get PathQuestion(): Question<IFileUploadComponentOptions>
                {
                    return super.PathQuestion;
                }

                /**
                 * @inheritdoc
                 */
                public override get AppQuestion(): IApplicationQuestion<IFileUploadComponentOptions>
                {
                    return super.AppQuestion;
                }

                /**
                 * @inheritdoc
                 */
                public override get SourceQuestion(): IPathQuestion<IFileUploadComponentOptions>
                {
                    return super.SourceQuestion;
                }

                /**
                 * @inheritdoc
                 */
                public override get ComponentOptionQuestionCollection(): Array<Question<IFileUploadComponentOptions>>
                {
                    return super.ComponentOptionQuestionCollection;
                }

                /**
                 * @inheritdoc
                 *
                 * @param options
                 * The options of the component.
                 *
                 * @returns
                 * The default full name of the path to suggest in the {@link LocalInstructionComponent.SourceQuestion `SourceQuestion`}.
                 */
                public override GetDefaultSource(options: IFileUploadComponentOptions): string
                {
                    return super.GetDefaultSource(options);
                }
            }

            let generator: WoltLabPackageGenerator;
            let component: TestFileUploadComponentBase;

            suiteSetup(
                async function()
                {
                    this.timeout(5 * 60 * 1000);
                    generator = await context.Generator;
                    component = new TestFileUploadComponentBase(generator);
                });

            suite(
                nameof<TestFileUploadComponentBase>((component) => component.ComponentOptionQuestionCollection),
                () =>
                {
                    test(
                        "Checking whether important questions are asked first…",
                        () =>
                        {
                            strictEqual(component.ComponentOptionQuestionCollection[0].name, component.PathQuestion.name);
                            strictEqual(component.ComponentOptionQuestionCollection[1].name, component.AppQuestion.name);
                            strictEqual(component.ComponentOptionQuestionCollection[2].name, component.SourceQuestion.name);
                        });
                });

            suite(
                nameof<TestFileUploadComponentBase>((component) => component.GetDefaultSource),
                () =>
                {
                    test(
                        "Checking whether the path points to the proper location…",
                        () =>
                        {
                            let app = "wcf";

                            strictEqual(
                                component.GetDefaultSource(
                                    {
                                        Application: app
                                    } as IFileUploadComponentOptions),
                                generator.assetPath(component.DefaultSourceBaseName, app));
                        });
                });
        });
}
