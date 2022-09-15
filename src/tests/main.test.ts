import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { GeneratorName } from "@manuth/generator-ts-project";
import { TestContext as ProjectContext } from "@manuth/generator-ts-project-test";
import { WoltLabPackageGenerator } from "../generators/package/WoltLabPackageGenerator.js";
import { ComponentTests } from "./Components/index.test.js";
import { FileMappingTests } from "./FileMappings/index.test.js";
import { GeneratorTests } from "./Generators/index.test.js";
import { WoltLabGeneratorTests } from "./WoltLabGenerator.test.js";

suite(
    "WSCPackageGenerator",
    () =>
    {
        ProjectContext.Default.RegisterWorkingDirRestorer();
        let workingDirectory: string;

        let context: TestContext<WoltLabPackageGenerator> = new TestContext(
            join(fileURLToPath(new URL(".", import.meta.url)), "..", "generators", GeneratorName.Main));

        suiteSetup(
            () =>
            {
                workingDirectory = process.cwd();
            });

        suiteTeardown(
            function()
            {
                this.timeout(30 * 1000);
                process.chdir(workingDirectory);
                context.Dispose();
            });

        teardown(
            async () =>
            {
                await context.ResetSettings();
            });

        ComponentTests(context);
        FileMappingTests(context);
        WoltLabGeneratorTests();
        GeneratorTests(context);
    });
