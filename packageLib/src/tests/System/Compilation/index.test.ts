suite(
    "Compilation",
    () =>
    {
        require("./XMLFileCompiler.test");
        require("./EJSFileCompiler.test");
        require("./WoltLabXMLCompiler.test");
        require("./ImportFileCompiler.test");
        require("./ObjectDeletionFileCompiler.test");
        require("./NamedObjectDeletionFileCompiler.test");
        require("./Globalization/index.test");
        require("./Options/index.test");
        require("./Tasks/index.test");
        require("./Events/index.test");
        require("./Presentation/index.test");
        require("./Instructions/index.test");
    });