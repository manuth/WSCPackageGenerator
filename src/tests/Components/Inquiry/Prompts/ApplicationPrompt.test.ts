import { ok, strictEqual } from "assert";
import { createInterface, Interface } from "readline";
import { Predicate } from "@manuth/extended-yo-generator";
import { TestPrompt } from "@manuth/generator-ts-project-test";
import inquirer, { DistinctChoice, QuestionTypeName } from "inquirer";
import Choice from "inquirer/lib/objects/choice.js";
import { MockSTDIN, stdin } from "mock-stdin";
import MuteStream from "mute-stream";
import { Random } from "random-js";
import { ApplicationPrompt } from "../../../../Components/Inquiry/Prompts/ApplicationPrompt.js";
import { IApplicationQuestionOptions } from "../../../../Components/Inquiry/Prompts/IApplicationQuestionOptions.js";
import { ISuggestionOptions } from "../../../../Components/Inquiry/Prompts/ISuggestionOptions.js";
import { IWoltLabApplication } from "../../../../Components/Inquiry/Prompts/IWoltLabApplication.js";

/**
 * Registers tests for the {@link ApplicationPrompt `ApplicationPrompt<T>`} class.
 */
export function ApplicationPromptTests(): void
{
    suite(
        nameof(ApplicationPrompt),
        () =>
        {
            let random: Random;
            let mockedInput: MockSTDIN;
            let readLine: Interface;
            let question: IApplicationQuestionOptions;
            let testPrompt: TestApplicationPrompt;
            let suggestedApps: ISuggestionOptions;
            let listRan: boolean;
            let listAnswer: string;
            let inputRan: boolean;
            let inputAnswer: string;
            let actualApps: DistinctChoice[];

            /**
             * Provides an implementation of the {@link ApplicationPrompt `ApplicationPrompt<T>`} class for testing.
             */
            class TestApplicationPrompt extends ApplicationPrompt<IApplicationQuestionOptions>
            {
                /**
                 * @inheritdoc
                 */
                // eslint-disable-next-line @delagen/deprecation/deprecation
                public override opt: inquirer.prompts.PromptOptions<IApplicationQuestionOptions>;

                /**
                 * @inheritdoc
                 */
                public override get SuggestedApplications(): IWoltLabApplication[]
                {
                    return super.SuggestedApplications;
                }

                /**
                 * @inheritdoc
                 */
                public override get DefaultApplication(): IWoltLabApplication
                {
                    return super.DefaultApplication;
                }

                /**
                 * @inheritdoc
                 *
                 * @returns
                 * The value to save to the answer-hash.
                 */
                public override async Prompt(): Promise<any>
                {
                    return super.Prompt();
                }
            }

            /**
             * Provides a mocked representation of the choice-prompt.
             */
            class MockedListPrompt extends TestPrompt
            {
                /**
                 * @inheritdoc
                 *
                 * @returns
                 * The result of the prompt.
                 */
                public override Run(): Promise<any>
                {
                    listRan = true;
                    actualApps = this.opt.choices.choices;
                    return (listAnswer === undefined) ? this.opt.default : listAnswer;
                }
            }

            /**
             * Provides a mocked representation of the input-prompt.
             */
            class MockedInputPrompt extends TestPrompt
            {
                /**
                 * @inheritdoc
                 *
                 * @returns
                 * The result of the prompt.
                 */
                public override Run(): Promise<any>
                {
                    inputRan = true;
                    return inputAnswer ?? this.opt.default;
                }
            }

            /**
             * Gets the prompt according to the specified settings.
             *
             * @returns
             * The resulting prompt.
             */
            function GetPrompt(): TestApplicationPrompt
            {
                return new TestApplicationPrompt(question, readLine, {});
            }

            /**
             * Runs the {@link testPrompt `testPrompt`}.
             *
             * @returns
             * The result of the prompt.
             */
            async function RunPrompt(): Promise<any>
            {
                listRan = false;
                inputRan = false;
                return testPrompt.Prompt();
            }

            suiteSetup(
                () =>
                {
                    random = new Random();
                });

            setup(
                () =>
                {
                    let muteStream = new MuteStream();
                    muteStream.pipe(process.stdout);
                    mockedInput = stdin();

                    readLine = createInterface(
                        {
                            terminal: true,
                            input: process.stdin,
                            output: muteStream
                        });

                    suggestedApps = {
                        apps: [
                            {
                                DisplayName: random.string(10),
                                ID: random.string(5)
                            },
                            {
                                DisplayName: random.string(11),
                                ID: random.string(6)
                            }
                        ]
                    };

                    question = {
                        type: ApplicationPrompt.TypeName,
                        name: "test",
                        suggestions: suggestedApps,
                        default: listAnswer
                    };

                    testPrompt = GetPrompt();
                    inquirer.prompt.registerPrompt("input" as QuestionTypeName, MockedInputPrompt);
                    inquirer.prompt.registerPrompt("list" as QuestionTypeName, MockedListPrompt);
                    listRan = false;
                    listAnswer = random.pick(suggestedApps.apps).ID;
                    inputRan = false;
                    inputAnswer = undefined;
                });

            teardown(
                () =>
                {
                    inquirer.prompt.restoreDefaultPrompts();
                    mockedInput.restore();
                    readLine.close();
                });

            /**
             * Asserts that the specified {@link value `value`} is a {@link Choice `Choice`}.
             *
             * @param value
             * The value to check.
             */
            function IsChoice(value: any): asserts value is Choice
            {
                let classCandidates: any[] = [];

                for (let candidate = value.constructor; candidate !== null; candidate = Object.getPrototypeOf(candidate))
                {
                    classCandidates.push(candidate);
                }

                ok(classCandidates.some((candidate) => `${candidate}` === Choice.toString()));
            }

            suite(
                nameof<TestApplicationPrompt>((prompt) => prompt.Prompt),
                () =>
                {
                    test(
                        "Checking whether the suggestions are loaded from the settings correctly…",
                        async () =>
                        {
                            for (
                                let suggestions of [
                                    suggestedApps,
                                    (async () => suggestedApps)(),
                                    () => suggestedApps,
                                    async () => suggestedApps
                                ])
                            {
                                testPrompt.opt.suggestions = suggestions;
                                await RunPrompt();

                                ok(
                                    suggestedApps.apps.every(
                                        (app) =>
                                        {
                                            return actualApps.some(
                                                (actualApp) =>
                                                {
                                                    IsChoice(actualApp);

                                                    return actualApp.name === app.DisplayName &&
                                                        actualApp.value === app.ID;
                                                });
                                        }));
                            }
                        });

                    test(
                        "Checking whether builtin suggestions can be hidden…",
                        async () =>
                        {
                            /**
                             * Asserts the inclusion of the suggestions.
                             *
                             * @param expected
                             * A value indicating whether the suggestions are expected to be included.
                             */
                            function AssertSuggestions(expected: boolean): void
                            {
                                let predicate: Predicate<IWoltLabApplication> = (app) =>
                                {
                                    return actualApps.some(
                                        (actualApp) =>
                                        {
                                            let choice = actualApp as Choice;

                                            return choice.name === app.DisplayName &&
                                                choice.value === app.ID;
                                        });
                                };

                                let builtInApps = [
                                    testPrompt.DefaultApplication,
                                    ...testPrompt.SuggestedApplications
                                ];

                                if (expected)
                                {
                                    builtInApps.every(predicate);
                                }
                                else
                                {
                                    builtInApps.every((app) => !predicate(app));
                                }
                            }

                            await RunPrompt();
                            AssertSuggestions(true);
                            suggestedApps.showBuiltinSuggestions = false;
                            testPrompt = GetPrompt();
                            await RunPrompt();
                            AssertSuggestions(false);
                        });

                    test(
                        "Checking whether the app-list only is displayed if suggestions are present…",
                        async () =>
                        {
                            await RunPrompt();
                            ok(listRan);
                            suggestedApps.apps = [];
                            suggestedApps.showBuiltinSuggestions = false;
                            testPrompt = GetPrompt();
                            await RunPrompt();
                            ok(!listRan);
                        });

                    test(
                        "Checking whether the user can type a custom app-name if no application was chosen from the list…",
                        async () =>
                        {
                            let result: any;
                            inputAnswer = random.string(15);
                            await RunPrompt();
                            ok(listRan);
                            ok(!inputRan);
                            listAnswer = null;
                            result = await RunPrompt();
                            strictEqual(result, inputAnswer);
                            ok(listRan);
                            ok(inputRan);
                            suggestedApps.apps = [];
                            suggestedApps.showBuiltinSuggestions = false;
                            result = await RunPrompt();
                            strictEqual(result, inputAnswer);
                            ok(!listRan);
                            ok(inputRan);
                        });
                });
        });
}
