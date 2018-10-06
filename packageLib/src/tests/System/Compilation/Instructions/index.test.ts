suite(
    "Instructions", () =>
    {
        require("./InstructionCompiler.test");
        require("./FileInstructionCompiler.test");
        require("./LocalizationInstructionCompiler.test");
        require("./ACPOptionInstructionCompiler.test");
        require("./GroupOptionInstructionCompiler.test");
        require("./CronJobInstructionCompiler.test");
        require("./ThemeInstructionCompiler.test");
        require("./BBCodeInstructionCompiler.test");
    });