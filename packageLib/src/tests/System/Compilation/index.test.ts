suite(
    "Compilation",
    () =>
    {
        require("./FileInstructionCompiler.test");
        require("./CronJobInstructionCompiler.test");
        require("./ThemeVariableCompiler.test");
        require("./ThemeCompiler.test");
        require("./ThemeInstructionCompiler.test");
    });