import { basename } from "path";
import { InquiryTests } from "./Inquiry";

/**
 * Registers tests for components.
 */
export function ComponentTests(): void
{
    suite(
        basename(__dirname),
        () =>
        {
            InquiryTests();
        });
}
