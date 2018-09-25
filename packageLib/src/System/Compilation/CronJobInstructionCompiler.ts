import { isNullOrUndefined } from "util";
import { CronJobInstruction } from "../PackageSystem/Instructions/Tasks/CronJobInstruction";
import { XMLInstructionCompiler } from "./XMLInstructionCompiler";

/**
 * Provides the functionality to compile cronjob-instructions.
 */
export class CronJobInstructionCompiler extends XMLInstructionCompiler<CronJobInstruction>
{
    protected get SchemaLocation(): string
    {
        return "https://www.woltlab.com/XSD/tornado/cronjob.xsd";
    }

    protected get XMLElement(): Document
    {
        let document: Document = super.XMLElement;
        let $import: Element = document.createElement("import");

        for (let cronJob of this.Item.CronJobs)
        {
            let cronJobMeta: Element = document.createElement("cronjob");
            {
                if (!isNullOrUndefined(cronJob.Name))
                {
                    cronJobMeta.setAttribute("name", cronJob.Name);
                }

                for (let locale of cronJob.Description.GetLocales())
                {
                    let description: Element = document.createElement("description");

                    if (locale !== "inv")
                    {
                        description.setAttribute("language", locale);
                    }

                    description.appendChild(document.createTextNode(cronJob.Description.Data[locale]));
                }

                let className: Element = document.createElement("classname");
                className.appendChild(document.createTextNode(cronJob.ClassName));
                cronJobMeta.appendChild(className);

                let allowDisable: Element = document.createElement("canbedisabled");
                allowDisable.appendChild(document.createTextNode(cronJob.AllowDisable ? "1" : "0"));
                cronJobMeta.appendChild(allowDisable);

                let allowEdit: Element = document.createElement("canbeedited");
                allowEdit.appendChild(document.createTextNode(cronJob.AllowEdit ? "1" : "0"));
                cronJobMeta.appendChild(allowEdit);

                if (cronJob.Options.length > 0)
                {
                    let options: Element = document.createElement("options");
                    options.appendChild(document.createTextNode(cronJob.Options.join(",")));
                    cronJobMeta.appendChild(options);
                }

                let minute: Element = document.createElement("startminute");
                minute.appendChild(document.createTextNode(cronJob.Period.Minute));
                cronJobMeta.appendChild(minute);

                let hour: Element = document.createElement("starthour");
                hour.appendChild(document.createTextNode(cronJob.Period.Hour));
                cronJobMeta.appendChild(hour);

                let dayOfMonth: Element = document.createElement("startdom");
                dayOfMonth.appendChild(document.createTextNode(cronJob.Period.DayOfMonth));
                cronJobMeta.appendChild(dayOfMonth);

                let month: Element = document.createElement("startmonth");
                month.appendChild(document.createTextNode(cronJob.Period.Month));
                cronJobMeta.appendChild(month);

                let dayOfWeek: Element = document.createElement("startdow");
                dayOfWeek.appendChild(document.createTextNode(cronJob.Period.DayOfWeek));
                cronJobMeta.appendChild(dayOfWeek);
            }
            $import.appendChild(cronJobMeta);
        }
        document.appendChild($import);

        return document;
    }
}