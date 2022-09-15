import { doesNotReject, ok } from "assert";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import { AbstractConstructor, FileMapping, Generator, GeneratorOptions } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { TypeScriptCreatorMapping } from "@manuth/generator-ts-project";
import { TempFileSystem } from "@manuth/temp-files";
import { Instruction } from "@manuth/woltlab-compiler";
import { Context } from "mocha";
import npmWhich from "npm-which";
import { SourceFile } from "ts-morph";
import { InstructionComponent } from "../Components/InstructionComponent.js";
import { InstructionFileMapping } from "../FileMappings/InstructionFileMapping.js";
import { IWoltLabComponentOptions } from "../Settings/IWoltLabComponentOptions.js";
import { IWoltLabSettings } from "../Settings/IWoltLabSettings.js";
import { WoltLabComponentSettingKey } from "../Settings/WoltLabComponentSettingKey.js";
import { WoltLabSettingKey } from "../Settings/WoltLabSettingKey.js";
import { TestSuite } from "./TestSuite.js";
import { TypeScriptCompilerTester } from "./TypeScriptCompilerTester.js";

/**
 * Represents a typescript file mapping.
 */
declare abstract class TestFileMapping extends TypeScriptCreatorMapping<any, any>
{
    /**
     * @inheritdoc
     *
     * @param sourceFile
     * The source-file to process.
     *
     * @returns
     * The processed data.
     */
    public override Transform(sourceFile: SourceFile): Promise<SourceFile>;
}

/**
 * Provides the functionality to register tests for {@link InstructionFileMapping `InstructionFileMapping<TSettings, TOptions, TComponentOptions>`} classes.
 *
 * @template TSettings
 * The type of the settings of the file mapping.
 *
 * @template TOptions
 * The type of the options of the file mapping.
 *
 * @template TGenerator
 * The type of the generator of the file mapping.
 *
 * @template TComponentOptions
 * The type of the options of the component of the file mapping.
 *
 * @template TFileMapping
 * The type of the file mapping.
 */
export abstract class InstructionFileMappingSuite<TSettings extends IWoltLabSettings, TOptions extends GeneratorOptions, TGenerator extends Generator<TSettings, TOptions>, TComponentOptions extends IWoltLabComponentOptions, TFileMapping extends InstructionFileMapping<TSettings, TOptions, TComponentOptions>> extends TestSuite
{
    /**
     * A component for testing the generator.
     */
    private context: TestContext<TGenerator, TOptions>;

    /**
     * The generator of the file mapping to test.
     */
    private generator: TGenerator;

    /**
     * A component for testing the file mapping.
     */
    private tester: TypeScriptCompilerTester<TGenerator, TSettings, TOptions, TFileMapping>;

    /**
     * Initializes a new instance of the {@link InstructionFileMappingSuite `InstructionFileMappingSuite<TSettings, TOptions, TGenerator, TComponentOptions, TFileMapping>`} class.
     *
     * @param context
     * The test context.
     */
    public constructor(context: TestContext<TGenerator, TOptions>)
    {
        super();
        this.context = context;
    }

    /**
     * Gets a component for testing the generator.
     */
    protected get Context(): TestContext<TGenerator, TOptions>
    {
        return this.context;
    }

    /**
     * Gets the generator for testing the generator.
     */
    protected get Generator(): TGenerator
    {
        return this.generator;
    }

    /**
     * Gets the options of the file mapping to test.
     */
    protected get FileMappingOptions(): TFileMapping
    {
        return this.Tester.FileMappingOptions;
    }

    /**
     * Gets the file mapping to test.
     */
    protected get FileMapping(): FileMapping<TSettings, TOptions>
    {
        return this.Tester.FileMapping;
    }

    /**
     * Gets the component of the file mapping.
     */
    protected get Component(): InstructionComponent<TSettings, TOptions, TComponentOptions>
    {
        return this.FileMappingOptions["Component"];
    }

    /**
     * Gets a component for testing the file mapping.
     */
    protected get Tester(): TypeScriptCompilerTester<TGenerator, TSettings, TOptions, TFileMapping>
    {
        return this.tester;
    }

    /**
     * Gets the class of the constructor which is expected to be generated.
     */
    protected get InstructionClass(): AbstractConstructor<Instruction>
    {
        return Instruction;
    }

    /**
     * Creates the file mapping to test.
     *
     * @returns
     * The file mapping to test.
     */
    protected abstract CreateFileMapping(): TFileMapping;

    /**
     * Creates a component for testing the file mapping.
     *
     * @returns
     * A component for testing the file mapping.
     */
    protected CreateTester(): TypeScriptCompilerTester<TGenerator, TSettings, TOptions, TFileMapping>
    {
        return new TypeScriptCompilerTester(this.Generator, this.CreateFileMapping());
    }

    /**
     * Registers the tests for the {@link InstructionFileMapping.Transform `Transform`} method.
     */
    protected RegisterTransformSuite(): void
    {
        suite(
            nameof<TestFileMapping>((fileMapping) => fileMapping.Transform),
            () =>
            {
                let self = this;

                suiteSetup(
                    async function()
                    {
                        return self.TransformSuiteSetup(this);
                    });

                suiteTeardown(
                    async function()
                    {
                        return self.TransformSuiteTeardown(this);
                    });

                setup(
                    async function()
                    {
                        return self.TransformSetup(this);
                    });

                teardown(
                    async function()
                    {
                        return self.Teardown(this);
                    });

                this.RegisterTransformTests();
            });
    }

    /**
     * @inheritdoc
     *
     * @param context
     * The mocha context.
     */
    protected override async SuiteSetup(context: Context): Promise<void>
    {
        context.timeout(5 * 60 * 1000);
        this.generator = await this.Context.Generator;
        this.tester = this.CreateTester();

        spawnSync(
            npmWhich(fileURLToPath(new URL(".", import.meta.url))).sync("npm"),
            [
                "install",
                "--silent"
            ],
            {
                cwd: this.Generator.destinationPath(),
                stdio: "ignore"
            });
    }

    /**
     * @inheritdoc
     *
     * @param context
     * The mocha context.
     */
    protected override async Setup(context: Mocha.Context): Promise<void>
    {
        await super.Setup(context);

        this.Generator.Settings[WoltLabSettingKey.ComponentOptions] = {
            [this.Component.ID]: {
                [WoltLabComponentSettingKey.Path]: TempFileSystem.TempBaseName(
                    {
                        Suffix: ".ts"
                    })
            }
        };
    }

    /**
     * @inheritdoc
     */
    protected override RegisterTests(): void
    {
        this.RegisterTransformSuite();
    }

    /**
     * Prepares the suite for the {@link InstructionFileMapping.Transform `Transform`} method.
     *
     * @param context
     * The mocha context.
     */
    protected async TransformSuiteSetup(context: Context): Promise<void>
    { }

    /**
     * Releases all resources of the suite for the {@link InstructionFileMapping.Transform `Transform`} method.
     *
     * @param context
     * The mocha context.
     */
    protected async TransformSuiteTeardown(context: Context): Promise<void>
    { }

    /**
     * Prepares each test for the {@link InstructionFileMapping.Transform `Transform`} method.
     *
     * @param context
     * The mocha context.
     */
    protected async TransformSetup(context: Context): Promise<void>
    {
        context.timeout(10 * 1000);

        await this.Tester.DumpOutput(
            await this.FileMappingOptions["Transform"](await this.FileMappingOptions.GetSourceObject()));
    }

    /**
     * Releases the resources of each test for the {@link InstructionFileMapping.Transform `Transform`} method.
     *
     * @param context
     * The mocha context.
     */
    protected async TransformTeardown(context: Context): Promise<void>
    { }

    /**
     * Registers the tests for the {@link InstructionFileMapping.Transform `Transform`} method.
     */
    protected RegisterTransformTests(): void
    {
        let self = this;

        test(
            "Checking whether valid typescript code is emitted…",
            async function()
            {
                this.timeout(30 * 1000);
                this.slow(15 * 1000);
                await doesNotReject(() => self.Tester.Import());
            });

        test(
            "Checking whether a variable with the expected name is exposed…",
            async function()
            {
                this.timeout(30 * 1000);
                this.slow(15 * 1000);
                ok(self.Component.VariableName in await self.Tester.Import());
            });

        test(
            `Checking whether the exported variable inherits the \`${this.InstructionClass.name}\` class…`,
            async function()
            {
                this.timeout(30 * 1000);
                this.slow(15 * 1000);
                let exportedValue = (await self.Tester.Import())[self.Component.VariableName];
                let classCandidates: any[] = [];

                for (let candidate = exportedValue.constructor; candidate !== null; candidate = Object.getPrototypeOf(candidate))
                {
                    classCandidates.push(candidate);
                }

                ok(
                    classCandidates.some(
                        (candidate) =>
                        {
                            return `${candidate}` === self.InstructionClass.toString();
                        }));
            });
    }
}
