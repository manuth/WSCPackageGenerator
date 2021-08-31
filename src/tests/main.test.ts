import { join } from "path";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { WoltLabPackageGenerator } from "../generators/package/WoltLabPackageGenerator";
import { ComponentTests } from "./Components";

suite(
    "WSCPackageGenerator",
    () =>
    {
        let context: TestContext<WoltLabPackageGenerator> = new TestContext(join(__dirname, "..", "generators", "app"));
        ComponentTests(context);
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
