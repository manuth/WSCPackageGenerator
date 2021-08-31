import { ok, strictEqual } from "assert";
import { createInterface, Interface } from "readline";
import { TestContext, TestPrompt } from "@manuth/generator-ts-project-test";
import inquirer = require("inquirer");
import Choice = require("inquirer/lib/objects/choice");
import { MockSTDIN, stdin } from "mock-stdin";
import MuteStream = require("mute-stream");
import { Random } from "random-js";
import { ApplicationPrompt } from "../../../Components/Inquiry/Prompts/ApplicationPrompt";
import { IApplicationQuestionOptions } from "../../../Components/Inquiry/Prompts/IApplicationQuestionOptions";
import { ISuggestionOptions } from "../../../Components/Inquiry/Prompts/ISuggestionOptions";
import { IWoltLabApplication } from "../../../Components/Inquiry/Prompts/IWoltLabApplication";

/**
 * Registers tests for the {@link ApplicationPrompt `ApplicationPrompt<T>`} class.
 */
export function ApplicationPromptTests(): void
{
    suite(
        nameof(ApplicationPrompt),
        () =>
        {
            let context: TestContext;
            let random: Random;
            let mockedInput: MockSTDIN;
            let readLine: Interface;
            let question: IApplicationQuestionOptions;
            let testPrompt: TestApplicationPrompt;
            let defaultApp: string;
            let suggestedApps: ISuggestionOptions;
            let listRan: boolean;
            let listAnswer: string;
            let actualApps: inquirer.DistinctChoice[];

            /**
             * Provides an implementation of the {@link ApplicationPrompt `ApplicationPrompt<T>`} class for testing.
             */
            class TestApplicationPrompt extends ApplicationPrompt<IApplicationQuestionOptions>
            {
                /**
                 * @inheritdoc
                 */
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
             * Gets the prompt according to the specified settings.
             *
             * @returns
             * The resulting prompt.
             */
            function GetPrompt(): TestApplicationPrompt
            {
                return new TestApplicationPrompt(question, readLine, {});
            }

            suiteSetup(
                () =>
                {
                    context = TestContext.Default;
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

                    defaultApp = random.pick(suggestedApps.apps).ID;

                    question = {
                        type: ApplicationPrompt.TypeName,
                        name: "test",
                        suggestions: suggestedApps,
                        default: defaultApp
                    };

                    testPrompt = GetPrompt();
                    context.RegisterTestPrompt(inquirer.prompt);
                    inquirer.prompt.registerPrompt("list" as inquirer.QuestionTypeName, MockedListPrompt);
                    listRan = false;
                    listAnswer = undefined;
                });

            teardown(
                () =>
                {
                    mockedInput.restore();
                    readLine.close();
                });

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
                                await testPrompt.Prompt();

                                ok(
                                    suggestedApps.apps.every(
                                        (app) =>
                                        {
                                            return actualApps.some(
                                                (actualApp) =>
                                                {
                                                    return actualApp instanceof Choice &&
                                                        actualApp.name === app.DisplayName &&
                                                        actualApp.value === app.ID;
                                                });
                                        }));
                            }
                        });

                    test(
                        "Checking whether builtin suggestions can be hidden…",
                        async () =>
                        {
                            await testPrompt.Prompt();

                            ok(
                                actualApps.some(
                                    (app) =>
                                    {
                                        return (app as Choice).value === testPrompt.DefaultApplication.ID;
                                    }));

                            suggestedApps.showBuiltinSuggestions = false;
                            testPrompt = GetPrompt();
                            await testPrompt.Prompt();

                            ok(
                                actualApps.every(
                                    (app) =>
                                    {
                                        return (app as Choice).value !== testPrompt.DefaultApplication.ID;
                                    }));
                        });

                    test(
                        "Checking whether the app-list only is displayed if suggestions are present…",
                        async () =>
                        {
                            suggestedApps.apps = [];
                            suggestedApps.showBuiltinSuggestions = false;
                            testPrompt = GetPrompt();
                            await testPrompt.Prompt();
                            ok(!listRan);
                        });

                    test(
                        "Checking whether the user can type a custom app-name if desired…",
                        async () =>
                        {
                            listAnswer = null;
                            suggestedApps.apps = [];
                            testPrompt = GetPrompt();
                            strictEqual(await testPrompt.Prompt(), defaultApp);
                        });
                });
        });
}
