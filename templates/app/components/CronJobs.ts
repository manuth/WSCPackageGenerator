import { CronjobInstruction } from "../lib/System/PackageSystem/Instructions/Tasks/CronJobInstruction";

const cronjobInstruction: CronjobInstruction = new CronjobInstruction({
    FileName: "cronJobs.xml",
    Cronjobs: [
    ]
});

export = cronjobInstruction;