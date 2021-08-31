import { basename } from "path";
import { ApplicationPromptTests } from "./ApplicationPrompt.test";

/**
 * Registers tests for prompts.
 */
export function PromptTests(): void
{
    suite(
        basename(__dirname),
        () =>
        {
            ApplicationPromptTests();
        });
}
