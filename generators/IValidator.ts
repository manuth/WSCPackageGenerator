import * as YoGenerator from "yeoman-generator";

/**
 * Represents a validator.
 */
export type IValidator = (value: string, answers?: YoGenerator.Answers) => string | boolean | Promise<string | boolean>;