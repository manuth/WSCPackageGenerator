import { join } from "path";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { WoltLabPackageGenerator } from "../generators/package/WoltLabPackageGenerator";
import { ComponentTests } from "./Components";
import { FileMappingTests } from "./FileMappings";

suite(
    "WSCPackageGenerator",
    () =>
    {
        let workingDirectory: string;
        let context: TestContext<WoltLabPackageGenerator> = new TestContext(join(__dirname, "..", "generators", "app"));
        ComponentTests(context);
        FileMappingTests(context);
        require("./Generators");

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
    });
