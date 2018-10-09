import inquirer = require("inquirer");
import * as Path from "path";
import { isNullOrUndefined } from "util";
import * as YoGenerator from "yeoman-generator";
import { IComponentCategory } from "./IComponentCategory";
import { IValidator } from "./IValidator";

/**
 * Represents a generator.
 */
export abstract class Generator extends YoGenerator
{
    /**
     * Initializes a new instance of the `WSCPackageGenerator` class.
     *
     * @param args
     * A set of arguments.
     *
     * @param opts
     * A set of options.
     */
    public constructor(args: string | string[], opts: {})
    {
        super(args, opts);
    }

    /**
     * Gets the name of the root of the template-folder.
     */
    protected abstract get TemplateRoot(): string;

    /**
     * Gets the name of the setting which contains the path to the theme-directory.
     */
    protected get ThemePathSetting(): string
    {
        return "themePath";
    }

    /**
     * Gets the name of the setting which contains the components to install.
     */
    protected get ComponentSetting(): string
    {
        return "components";
    }

    /**
     * Gets the name of the setting which contains the paths to save the components to.
     */
    protected get ComponentPathSetting(): string
    {
        return "componentPath";
    }

    /**
     * Gets the components which can be generated.
     */
    protected abstract get Components(): IComponentCategory[];

    /**
     * Gets questions on what components to generate.
     */
    protected get ComponentQuestions(): YoGenerator.Question[]
    {
        let questions: YoGenerator.Question[] = [];
        let choices: inquirer.ChoiceType[] = [];

        for (let componentCategory of this.Components)
        {
            choices.push({
                type: "separator",
                line: componentCategory.DisplayName
            });

            for (let component of componentCategory.Components)
            {
                choices.push({
                    value: component.ID,
                    name: component.DisplayName
                });

                let question: YoGenerator.Question = {
                    type: "input",
                    name: `${this.ComponentPathSetting}[${JSON.stringify(component.ID)}]`,
                    message: component.Message,
                    when: (answers: YoGenerator.Answers): boolean =>
                    {
                        return (answers[this.ComponentSetting] as string[]).includes(component.ID);
                    }
                };

                if (!isNullOrUndefined(component.DefaultFileName))
                {
                    question.default = component.DefaultFileName;
                }

                questions.push(question);
            }
        }

        questions.unshift({
            type: "checkbox",
            name: this.ComponentSetting,
            message: "What components do you want to provide?",
            choices
        });

        return questions;
    }

    /**
     * Validates whether the a value is provided.
     */
    protected ForceInput: IValidator = (value, answers?) =>
    {
        if (value.length > 0)
        {
            return true;
        }
        else
        {
            return "Please enter a valid input!";
        }
    }

    /**
     * Validates whether the specified path is separated from the destination.
     */
    protected ForceSeparateFolder: IValidator = (value, answers?) =>
    {
        if (this.destinationPath() !== Path.resolve(process.cwd(), this.destinationPath(), value))
        {
            return true;
        }
        else
        {
            return "Files must be stored in a separate folder!";
        }
    }

    public templatePath(...path: string[]): string
    {
        return Path.join(__dirname, "..", "..", "templates", this.TemplateRoot, ...path);
    }
}