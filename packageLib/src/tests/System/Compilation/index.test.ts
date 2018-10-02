suite(
    "Compilation",
    () =>
    {
        require("./XMLFileCompiler.test");
        require("./EJSFileCompiler.test");
        require("./WoltLabXMLCompiler.test");
        require("./Globalization/index.test");
        require("./Tasks/index.test");
        require("./Presentation/index.test");
        require("./Instructions/index.test");
    });