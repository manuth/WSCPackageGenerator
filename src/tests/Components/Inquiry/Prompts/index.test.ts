import { basename } from "node:path";
import { ApplicationPromptTests } from "./ApplicationPrompt.test.js";

/**
 * Registers tests for prompts.
 */
export function PromptTests(): void
{
    suite(
        basename(new URL(".", import.meta.url).pathname),
        () =>
        {
            ApplicationPromptTests();
        });
}
