suite(
    "System",
    () =>
    {
        require("./Collections/index.test");
        require("./Serialization/index.test");
        require("./NodeSystem/index.test");
        require("./Globalization/index.test");
        require("./Options/index.test");
        require("./PackageSystem/index.test");
        require("./Tasks/index.test");
        require("./Themes/index.test");
        require("./Compilation/index.test");
    });