import { InquiryTests } from "./Inquiry";

suite(
    "WSCPackageGenerator",
    () =>
    {
        InquiryTests();
        require("./Generators");
    });
