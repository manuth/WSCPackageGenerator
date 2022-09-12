import { deepStrictEqual } from "assert";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { Random } from "random-js";
import { WoltLabComponent } from "../../Components/WoltLabComponent.js";
import { PackageComponentType } from "../../generators/package/Settings/PackageComponentType.js";
import { WoltLabPackageGenerator } from "../../generators/package/WoltLabPackageGenerator.js";
import { IWoltLabComponentOptions } from "../../Settings/IWoltLabComponentOptions.js";
import { IWoltLabSettings } from "../../Settings/IWoltLabSettings.js";
import { WoltLabComponentSettingKey } from "../../Settings/WoltLabComponentSettingKey.js";
import { WoltLabSettingKey } from "../../Settings/WoltLabSettingKey.js";

/**
 * Registers tests for the {@link WoltLabComponent `WoltLabComponent<TSettings, TOptions, TComponentOptions>`} class.
 *
 * @param context
 * The test-context.
 */
export function WoltLabComponentTests(context: TestContext<WoltLabPackageGenerator>): void
{
    suite(
        nameof(WoltLabComponent),
        () =>
        {
            /**
             * Provides an implementation of the {@link WoltLabComponent `WoltLabComponent<TSettings, TOptions, TComponentOptions>`} class for testing.
             */
            class TestWoltLabComponent extends WoltLabComponent<IWoltLabSettings, GeneratorOptions>
            {
                /**
                 * @inheritdoc
                 */
                public get ID(): string
                {
                    return componentID;
                }

                /**
                 * @inheritdoc
                 */
                public get DisplayName(): string
                {
                    return "Test";
                }
            }

            let random: Random;
            let generator: WoltLabPackageGenerator;
            let component: TestWoltLabComponent;
            let componentTypes: PackageComponentType[];
            let componentID: PackageComponentType;

            suiteSetup(
                async function()
                {
                    random = new Random();
                    generator = await context.Generator;
                    component = new TestWoltLabComponent(generator);

                    componentTypes = [
                        PackageComponentType.ACPTemplate,
                        PackageComponentType.BBCode,
                        PackageComponentType.CronJob,
                        PackageComponentType.Emoji,
                        PackageComponentType.ErrorMessage,
                        PackageComponentType.EventListener,
                        PackageComponentType.FileUpload,
                        PackageComponentType.GroupOption,
                        PackageComponentType.Option,
                        PackageComponentType.PHPScript,
                        PackageComponentType.SQLScript,
                        PackageComponentType.Template,
                        PackageComponentType.TemplateListener,
                        PackageComponentType.Theme,
                        PackageComponentType.Translation,
                        PackageComponentType.UserOption
                    ];

                    componentID = random.pick(componentTypes);
                });

            setup(
                () =>
                {
                    componentID = random.pick(componentTypes);
                });

            suite(
                nameof<TestWoltLabComponent>((component) => component.ComponentOptions),
                () =>
                {
                    test(
                        `Checking whether \`${nameof<TestWoltLabComponent>((c) => c.ComponentOptions)}\` returns the options of the component…`,
                        () =>
                        {
                            for (let componentType of componentTypes)
                            {
                                let options: IWoltLabComponentOptions = {
                                    [WoltLabComponentSettingKey.Path]: random.string(10)
                                };

                                componentID = componentType;

                                generator.Settings[WoltLabSettingKey.ComponentOptions] = {
                                    [componentID]: options
                                };

                                generator.Settings[WoltLabSettingKey.ComponentOptions][componentID] = options;
                                deepStrictEqual(component.ComponentOptions, options);
                            }
                        });
                });
        });
}
