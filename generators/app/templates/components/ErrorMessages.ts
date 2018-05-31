import ErrorMessageNode from "../lib/Globalization/Errors/ErrorMessageNode";
import ErrorMessagesInstruction from "../lib/Globalization/Errors/ErrorMessagesInstruction";

const errorMessageInstruction: ErrorMessagesInstruction = new ErrorMessagesInstruction({
    TranslationNodes: [
        new ErrorMessageNode({
            Name: "wcf.acp.option.error",
            Nodes: [
                
            ]
        })
    ]
});

export = errorMessageInstruction;