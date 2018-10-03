import { isNullOrUndefined } from "util";
import { CronJobInstruction } from "../../PackageSystem/Instructions/Tasks/CronJobInstruction";
import { XML } from "../../Serialization/XML";
import { WoltLabXMLCompiler } from "../WoltLabXMLCompiler";

export class CronJobFileCompiler extends WoltLabXMLCompiler<CronJobInstruction>
{
    /**
     * Initializes a new instance of the `CronJobFileCompiler` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: CronJobInstruction)
    {
        super(item);
    }

    protected get SchemaLocation(): string
    {
        return "https://www.woltlab.com/XSD/tornado/cronjob.xsd";
    }

    protected CreateDocument(): Document
    {
        let document: Document = super.CreateDocument();

        XML.AddElement(
            document.documentElement,
            "import",
            ($import: Element) =>
            {
                for (let cronJob of this.Item.CronJobs)
                {
                    XML.AddElement(
                        $import,
                        "cronjob",
                        (cronJobElement: Element) =>
                        {
                            if (!isNullOrUndefined(cronJob.Name))
                            {
                                cronJobElement.setAttribute("name", cronJob.Name);
                            }

                            for (let locale of cronJob.Description.GetLocales())
                            {
                                XML.AddTextElement(
                                    cronJobElement,
                                    "description",
                                    cronJob.Description.Data[locale],
                                    (description: Element) =>
                                    {
                                        if (locale !== "inv")
                                        {
                                            description.setAttribute("language", locale);
                                        }
                                    });

                                XML.AddTextElement(cronJobElement, "classname", cronJob.ClassName);
                                XML.AddTextElement(cronJobElement, "canbeedited", cronJob.AllowEdit ? "1" : "0");
                                XML.AddTextElement(cronJobElement, "canbedisabled", cronJob.AllowDisable ? "1" : "0");

                                if (cronJob.Options.length > 0)
                                {
                                    XML.AddTextElement(cronJobElement, "options", cronJob.Options.join(","));
                                }

                                XML.AddTextElement(cronJobElement, "startminute", cronJob.Period.Minute);
                                XML.AddTextElement(cronJobElement, "starthour", cronJob.Period.Hour);
                                XML.AddTextElement(cronJobElement, "startdom", cronJob.Period.DayOfMonth);
                                XML.AddTextElement(cronJobElement, "startmonth", cronJob.Period.Month);
                                XML.AddTextElement(cronJobElement, "startdow", cronJob.Period.DayOfWeek);
                            }
                        });
                }
            });

        return document;
    }
}