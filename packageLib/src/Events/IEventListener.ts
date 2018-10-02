import { IEventListenerOptions } from "./IEventListenerOptions";

/**
 * Represents the declaration of a PHP-class that should be executed when a specific event occurs.
 *
 * Please note that you have to provide your PHP-files using a FilesInstruction.
 */
export interface IEventListener extends Required<IEventListenerOptions>
{
}