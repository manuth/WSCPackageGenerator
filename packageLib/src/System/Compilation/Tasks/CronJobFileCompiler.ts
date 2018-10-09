import { isNullOrUndefined } from "util";
import { CronJobInstruction } from "../../PackageSystem/Instructions/Tasks/CronJobInstruction";
import { XMLEditor } from "../../Serialization/XMLEditor";
import { NamedObjectDeletionFileCompiler } from "../NamedObjectDeletionFileCompiler";

/**
 * Provides the functionality to compile cron-job files.
 */
export class CronJobFileCompiler extends NamedObjectDeletionFileCompiler<CronJobInstruction>
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

    protected get ObjectTagName(): string
    {
        return "cronjob";
    }

    protected CreateImport(): Element
    {
        let editor: XMLEditor = new XMLEditor(super.CreateImport());

        for (let cronJob of this.Item.CronJobs)
        {
            editor.AddElement(
                "cronjob",
                (cronJobEditor: XMLEditor) =>
                {
                    if (!isNullOrUndefined(cronJob.Name))
                    {
                        cronJobEditor.SetAttribute("name", cronJob.Name);
                    }

                    for (let locale of cronJob.Description.GetLocales())
                    {
                        cronJobEditor.AddTextElement(
                            "description",
                            cronJob.Description.Data[locale],
                            (description: XMLEditor) =>
                            {
                                if (locale !== "inv")
                                {
                                    description.SetAttribute("language", locale);
                                }
                            });
                    }

                    cronJobEditor.AddTextElement("classname", cronJob.ClassName);
                    cronJobEditor.AddTextElement("canbeedited", cronJob.AllowEdit ? "1" : "0");
                    cronJobEditor.AddTextElement("canbedisabled", cronJob.AllowDisable ? "1" : "0");

                    if (cronJob.Options.length > 0)
                    {
                        cronJobEditor.AddTextElement("options", cronJob.Options.join(","));
                    }

                    cronJobEditor.AddTextElement("startminute", cronJob.Period.Minute);
                    cronJobEditor.AddTextElement("starthour", cronJob.Period.Hour);
                    cronJobEditor.AddTextElement("startdom", cronJob.Period.DayOfMonth);
                    cronJobEditor.AddTextElement("startmonth", cronJob.Period.Month);
                    cronJobEditor.AddTextElement("startdow", cronJob.Period.DayOfWeek);
                });
        }

        return editor.Element;
    }
}