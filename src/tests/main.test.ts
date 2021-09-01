import { join } from "path";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { WoltLabPackageGenerator } from "../generators/package/WoltLabPackageGenerator";
import { ComponentTests } from "./Components";
import { FileMappingTests } from "./FileMappings";
import { GeneratorTests } from "./Generators";

suite(
    "WSCPackageGenerator",
    () =>
    {
        let workingDirectory: string;
        let context: TestContext<WoltLabPackageGenerator> = new TestContext(join(__dirname, "..", "generators", "app"));

        suiteSetup(
            () =>
            {
                workingDirectory = process.cwd();
            });

        teardown(
            async () =>
            {
                await context.ResetSettings();
                process.chdir(workingDirectory);
            });

        suiteTeardown(
            () =>
            {
                context.Dispose();
            });

        ComponentTests(context);
        FileMappingTests(context);
        GeneratorTests(context);
    });
