import { notStrictEqual, strictEqual } from "node:assert";
import { Question } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { QuestionSetPrompt } from "@manuth/generator-ts-project";
import { createSandbox, SinonSandbox } from "sinon";
import { ApplicationPrompt } from "../Components/Inquiry/Prompts/ApplicationPrompt.js";
import { IWoltLabSettings } from "../Settings/IWoltLabSettings.js";
import { WoltLabGenerator } from "../WoltLabGenerator.js";

/**
 * Registers tests for the {@link WoltLabGenerator `WoltLabGenerator<TSettings, TOptions>`} class.
 */
export function WoltLabGeneratorTests(): void
{
    suite(
        nameof(WoltLabGenerator),
        () =>
        {
            /**
             * Provides an implementation of the {@link WoltLabGenerator `WoltLabGenerator<TSettings, TOptions>`} class for testing.
             */
            class TestWoltLabGenerator extends WoltLabGenerator
            {
                /**
                 * @inheritdoc
                 */
                public override get AuthorQuestion(): Question<IWoltLabSettings>
                {
                    return super.AuthorQuestion;
                }

                /**
                 * @inheritdoc
                 */
                public override get HomePageQuestion(): Question<IWoltLabSettings>
                {
                    return super.HomePageQuestion;
                }
            }

            let generator: TestWoltLabGenerator;
            let sandbox: SinonSandbox;

            suiteSetup(
                () =>
                {
                    generator = TestContext.Default.CreateGenerator(TestWoltLabGenerator);
                    sandbox = createSandbox();
                });

            teardown(
                () =>
                {
                    sandbox.restore();
                });

            suite(
                nameof(WoltLabGenerator.constructor),
                () =>
                {
                    test(
                        "Checking whether the required prompts are registered…",
                        () =>
                        {
                            strictEqual(generator.env.adapter.promptModule.prompts[ApplicationPrompt.TypeName], ApplicationPrompt);
                            strictEqual(generator.env.adapter.promptModule.prompts[QuestionSetPrompt.TypeName], QuestionSetPrompt);
                        });
                });

            suite(
                nameof<TestWoltLabGenerator>((generator) => generator.AuthorQuestion),
                () =>
                {
                    let author: string;

                    suiteSetup(
                        () =>
                        {
                            author = "John Doe";
                        });

                    setup(
                        () =>
                        {
                            sandbox.replace(generator.user.git, "name", () => author);
                        });

                    test(
                        "Checking whether the answer defaults to the name configured in git…",
                        () =>
                        {
                            strictEqual(generator.AuthorQuestion.default(), author);
                        });
                });

            suite(
                nameof<TestWoltLabGenerator>((generator) => generator.HomePageQuestion),
                () =>
                {
                    test(
                        "Checking whether an empty answer is considered valid…",
                        () =>
                        {
                            strictEqual(generator.HomePageQuestion.validate(""), true);
                        });

                    test(
                        "Checking whether only valid URLs are considered valid…",
                        () =>
                        {
                            strictEqual(generator.HomePageQuestion.validate("https://example.com"), true);
                            notStrictEqual(generator.HomePageQuestion.validate("This URL is invalid"), true);
                        });
                });
        });
}
