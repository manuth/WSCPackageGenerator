import { ok, strictEqual } from "node:assert";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { IPathQuestion } from "@manuth/generator-ts-project";
import { DistinctQuestion, Question } from "inquirer";
import { fetchAsyncQuestionProperty } from "inquirer/lib/utils/utils.js";
import { firstValueFrom } from "rxjs";
import { IApplicationQuestion } from "../../../../Components/Inquiry/Prompts/IApplicationQuestion.js";
import { ACPTemplateComponent } from "../../../../generators/package/Components/ACPTemplateComponent.js";
import { WoltLabPackageGenerator } from "../../../../generators/package/WoltLabPackageGenerator.js";
import { IFileUploadComponentOptions } from "../../../../Settings/IFileUploadComponentOptions.js";
import { IWoltLabSettings } from "../../../../Settings/IWoltLabSettings.js";

/**
 * Registers tests for the {@link ACPTemplateComponent `ACPTemplateComponent<TSettings, TOptions, TComponentOptions>`} class.
 *
 * @param context
 * The test context.
 */
export function ACPTemplateComponentTests(context: TestContext<WoltLabPackageGenerator>): void
{
    suite(
        nameof(ACPTemplateComponent),
        () =>
        {
            /**
             * Provides an implementation of the {@link ACPTemplateComponent `ACPTemplateComponent<TSettings, TOptions, TComponentOptions>`} class for testing.
             */
            class TestComponent extends ACPTemplateComponent<IWoltLabSettings, GeneratorOptions, IFileUploadComponentOptions>
            {
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
                 *
                 * @param question
                 * The question to transform.
                 */
                public override TransformQuestion(question: Question<IFileUploadComponentOptions>): void
                {
                    super.TransformQuestion(question);
                }
            }

            let messageProperty: string;
            let acpTerm: string;
            let generator: WoltLabPackageGenerator;
            let component: TestComponent;

            suiteSetup(
                async function()
                {
                    this.timeout(5 * 60 * 1000);
                    messageProperty = nameof<Question>((question) => question.message);
                    acpTerm = "Admin Control Panel-templates";
                    generator = await context.Generator;
                    component = new TestComponent(generator);
                });

            suite(
                nameof<TestComponent>((component) => component.TransformQuestion),
                () =>
                {
                    let originalMessage: string;
                    let expectedMessage: string;
                    let question: DistinctQuestion;

                    setup(
                        () =>
                        {
                            originalMessage = `${context.RandomString} templates ${context.RandomString}`;
                            expectedMessage = originalMessage.replace("templates", acpTerm);

                            question = {
                                name: "test",
                                message: originalMessage
                            };
                        });

                    test(
                        "Checking whether messages of questions specified as literal values are replaced properly…",
                        async () =>
                        {
                            component.TransformQuestion(question);
                            question = await firstValueFrom(fetchAsyncQuestionProperty(question, messageProperty, {}));
                            strictEqual(question.message, expectedMessage);
                        });

                    test(
                        `Checking whether messages of questions specified as \`${nameof(Promise)}\`s are replaced properly…`,
                        async () =>
                        {
                            question.default = context.CreatePromise(originalMessage);
                            component.TransformQuestion(question);
                            question = await firstValueFrom(fetchAsyncQuestionProperty(question, messageProperty, {}));
                            strictEqual(question.message, expectedMessage);
                        });

                    test(
                        "Checking whether messages of questions specified as functions are replaced properly…",
                        async () =>
                        {
                            question.default = context.CreateFunction(originalMessage);
                            component.TransformQuestion(question);
                            question = await firstValueFrom(fetchAsyncQuestionProperty(question, messageProperty, {}));
                            strictEqual(question.message, expectedMessage);
                        });

                    test(
                        `Checking whether messages of questions specified as \`${nameof(Promise)}\`s nested in functions are replaced properly…`,
                        async () =>
                        {
                            question.default = context.CreatePromiseFunction(originalMessage);
                            component.TransformQuestion(question);
                            question = await firstValueFrom(fetchAsyncQuestionProperty(question, messageProperty, {}));
                            strictEqual(question.message, expectedMessage);
                        });
                });

            suite(
                nameof<TestComponent>((component) => component.AppQuestion),
                () =>
                {
                    test(
                        "Checking whether the message of the question is adjusted properly…",
                        async () =>
                        {
                            let question = component.AppQuestion as DistinctQuestion;
                            question = await firstValueFrom(fetchAsyncQuestionProperty(question, messageProperty, {}));
                            ok(`${question.message}`.includes(acpTerm));
                        });
                });

            suite(
                nameof<TestComponent>((component) => component.SourceQuestion),
                () =>
                {
                    test(
                        "Checking whether the message of the question is adjusted properly…",
                        async () =>
                        {
                            let question = component.SourceQuestion as DistinctQuestion;
                            question = await firstValueFrom(fetchAsyncQuestionProperty(question, messageProperty, {}));
                            ok(`${question.message}`.includes(acpTerm));
                        });
                });
        });
}
