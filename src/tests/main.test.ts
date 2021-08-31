import { ComponentTests } from "./Components";

suite(
    "WSCPackageGenerator",
    () =>
    {
        ComponentTests();
        require("./Generators");
    });
