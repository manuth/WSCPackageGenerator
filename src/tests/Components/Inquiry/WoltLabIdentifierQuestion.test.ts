import { notStrictEqual, ok, strictEqual } from "assert";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { TSProjectSettingKey } from "@manuth/generator-ts-project";
import { WoltLabIdentifierQuestion } from "../../../Components/Inquiry/WoltLabIdentifierQuestion";
import { WoltLabPackageGenerator } from "../../../generators/package/WoltLabPackageGenerator";
import { IWoltLabSettings } from "../../../Settings/IWoltLabSettings";
import { WoltLabSettingKey } from "../../../Settings/WoltLabSettingKey";

/**
 * Registers tests for the {@link WoltLabIdentifierQuestion `WoltLabIdentifierQuestion<TSettings, TOptions>`} class.
 *
 * @param context
 * The test-context.
 */
export function WoltLabIdentifierQuestionTests(context: TestContext<WoltLabPackageGenerator>): void
{
    suite(
        nameof(WoltLabIdentifierQuestion),
        () =>
        {
            /**
             * Provides an implementation of the {@link WoltLabIdentifierQuestion `WoltLabIdentifierQuestion<TSettings, TOptions>`} class for testing.
             */
            class TestWoltLabIdentifierQuestion extends WoltLabIdentifierQuestion<IWoltLabSettings, GeneratorOptions>
            {
                /**
                 * @inheritdoc
                 *
                 * @param answers
                 * The answers provided by the user.
                 *
                 * @returns
                 * The message to show to the user.
                 */
                public override async Message(answers: IWoltLabSettings): Promise<string>
                {
                    return super.Message(answers);
                }

                /**
                 * @inheritdoc
                 *
                 * @param answers
                 * The answers provided by the user.
                 *
                 * @returns
                 * The default value.
                 */
                public override async Default(answers: IWoltLabSettings): Promise<string>
                {
                    return super.Default(answers);
                }

                /**
                 * @inheritdoc
                 *
                 * @param input
                 * The answer provided by the user.
                 *
                 * @param answers
                 * The answers provided by the user.
                 *
                 * @returns
                 * The choices the user can choose from.
                 */
                public override async Validate(input: any, answers: IWoltLabSettings): Promise<string | boolean>
                {
                    return super.Validate(input, answers);
                }
            }

            let generator: WoltLabPackageGenerator;
            let question: TestWoltLabIdentifierQuestion;
            let name: string;
            let domain: string;
            let reversedDomain: string;
            let settings: IWoltLabSettings;

            suiteSetup(
                async function()
                {
                    this.timeout(5 * 60 * 1000);
                    generator = await context.Generator;
                    question = new TestWoltLabIdentifierQuestion(generator);
                    name = "test";
                    domain = "games.terra.com";
                    reversedDomain = "com.terra.games";
                    settings = {} as IWoltLabSettings;
                    settings[TSProjectSettingKey.Name] = name;
                    settings[WoltLabSettingKey.HomePage] = `https://${domain}/about/`;
                });

            suite(
                nameof<TestWoltLabIdentifierQuestion>((question) => question.name),
                () =>
                {
                    test(
                        "Checking whether the correct question-name is returned…",
                        () =>
                        {
                            strictEqual(question.name, WoltLabSettingKey.Identifier);
                        });
                });

            suite(
                nameof<TestWoltLabIdentifierQuestion>((question) => question.Default),
                () =>
                {
                    test(
                        "Checking whether the reversed domain-name is prepended to the default value…",
                        async () =>
                        {
                            ok((await question.Default(settings)).startsWith(`${reversedDomain}.`));
                        });

                    test(
                        "Checking whether the chosen name is appended to the default value…",
                        async () =>
                        {
                            strictEqual((await question.Default(settings)), `${reversedDomain}.${name}`);
                        });

                    test(
                        "Checking whether the reversed domain-name defaults to `example.com` if no homepage or an empty homepage was specified…",
                        async () =>
                        {
                            for (
                                let invalidUri of [
                                    "",
                                    "this is an invalid uri"
                                ])
                            {
                                strictEqual(
                                    (await question.Default(
                                        {
                                            ...settings,
                                            [WoltLabSettingKey.HomePage]: invalidUri
                                        })),
                                    `com.example.${name}`);
                            }
                        });
                });

            suite(
                nameof<TestWoltLabIdentifierQuestion>((question) => question.Validate),
                () =>
                {
                    test(
                        "Checking whether empty identifiers are disallowed…",
                        async () =>
                        {
                            strictEqual(await question.Validate("test", settings), true);
                            notStrictEqual(await question.Validate("", settings), false);
                        });
                });
        });
}
