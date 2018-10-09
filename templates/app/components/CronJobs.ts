import { CronJobInstruction } from "../lib/System/PackageSystem/Instructions/Tasks/CronJobInstruction";

const cronjobInstruction: CronJobInstruction = new CronJobInstruction({
    FileName: "cronJobs.xml",
    CronJobs: [
    ]
});

export = cronjobInstruction;