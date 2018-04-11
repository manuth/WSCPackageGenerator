'use strict';
import * as Path from 'path';
import * as Generator from 'yeoman-generator';
import chalk from 'chalk';
const yosay = require('yosay');

export = class extends Generator
{
    /**
     * Initializes a new instance of the `Generator` class.
     * 
     * @param args
     * A set of arguments.
     * 
     * @param opts
     * A set of options.
     */
    constructor(args, opts)
    {
        super(args, opts);
    }

    /**
     * Validates whether a folder other than the destination is provided.
     * 
     * @param {string} value
     * The value that is to be validated.
     * 
     * @param {Generator.Answers} answers
     * The answers provided by the user.
     */
    private enforceDifferentFolder = (value: string, answers?: Generator.Answers): boolean | string =>
    {
        if (answers['destination'] !== Path.resolve(answers['destination'], value))
        {
            return true;
        }
        else
        {
            return 'Files must be stored in a separate folder!';
        }
    }

    /**
     * Validates whether the a value is provided.
     * 
     * @param {string} value
     * The value that is to be validated.
     * 
     * @param {Generator.Answers} answers
     * The answers provided by the user.
     */
    private forceInput = (value: string, answers?: Generator.Answers): boolean | string =>
    {
        if (value.length > 0)
        {
            return true;
        }
        else
        {
            return 'Please enter a valid input!';
        }
    }

    /**
     * Collects all informations about the packaged that is to be created.
     */
    prompting()
    {
        // Have Yeoman greet the user.
        this.log(yosay(`Welcome to the ${chalk.whiteBright('WoltLab Suite Core Package')} generator!`));

        let prompts: Generator.Questions = [
            {
                type: 'input',
                name: 'destination',
                message: 'What directory do you want to create the package to?',
                default: './',
                filter: (value: string, answers?: Generator.Answers) =>
                {
                    return Path.resolve(process.cwd(), value);
                }
            },
            {
                type: 'input',
                name: 'name',
                message: 'What\'s the name of your package?',
                default: (answers: Generator.Answers) =>
                {
                    return Path.basename(answers['destination']);
                },
                validate: this.forceInput
            },
            {
                type: 'input',
                name: 'identifier',
                message: 'Please type an identifier for your package:',
                default: (answers: Generator.Answers) =>
                {
                    return 'com.example.' + (answers['name'] as string).toLowerCase();
                },
                validate: this.forceInput
            },
            {
                type: 'input',
                name: 'description',
                message: 'Please enter a description:'
            },
            {
                type: 'input',
                name: 'author',
                message: 'Please enter your name.'
            },
            {
                type: 'input',
                name: 'authorURL',
                message: 'Please enter your homepage.'
            },
            {
                type: 'checkbox',
                name: 'components',
                message: 'What components do you want to provide?',
                choices: [
                    {
                        type: 'separator',
                        line: 'General'
                    },
                    {
                        name: 'Files (for example PHP-scripts or pictures)',
                        value: 'files'
                    },
                    {
                        name: 'Control Panel-Options and Categories',
                        value: 'acp'
                    },
                    {
                        name: 'Event-Listeners',
                        value: 'eventListener'
                    },
                    {
                        type: 'separator',
                        line: 'Globalization'
                    },
                    {
                        name: 'Translations',
                        value: 'translations'
                    },
                    {
                        name: 'Error-Messages',
                        value: 'errors'
                    },
                    {
                        type: 'separator',
                        line: 'Customization'
                    },
                    {
                        name: 'Styles',
                        value: 'style'
                    },
                    {
                        name: 'Templates',
                        value: 'template'
                    },
                    {
                        name: 'ACP-Templates',
                        value: 'acpTemplate'
                    },
                    {
                        name: 'Template-Listeners',
                        value: 'templateListener'
                    },
                    {
                        type: 'separator',
                        line: 'Other'
                    },
                    {
                        name: 'Emojis',
                        value: 'emoji'
                    }
                ]
            },
            {
                type: 'input',
                name: 'sourcePath',
                message: 'Where do you want to store the files?',
                default: 'files',
                when: (answers: Generator.Answers) =>
                {
                    return (answers['components'] as string[]).indexOf('files') >= 0;
                },
                validate: this.enforceDifferentFolder
            },
            {
                type: 'input',
                name: 'optionsFile',
                message: 'Where do you want to store the ACP-options and categories?',
                default: 'acp.ts',
                when: (answers: Generator.Answers) =>
                {
                    return (answers['components'] as string[]).indexOf('acp') >= 0;
                }
            },
            {
                type: 'input',
                name: 'eventListenerFile',
                message: 'Where do you want to store your event-listeners?',
                default: 'eventListeners.json',
                when: (answers: Generator.Answers) =>
                {
                    return (answers['components'] as string[]).indexOf('eventListener') >= 0;
                }
            },
            {
                type: 'input',
                name: 'translationsFile',
                message: 'Where do you want to store your translations?',
                default: 'translations.ts',
                when: (answers: Generator.Answers) =>
                {
                    return (answers['components'] as string[]).indexOf('translations') >= 0;
                }
            },
            {
                type: 'input',
                name: 'errorMessageFile',
                message: 'Where do you want to store error-messages?',
                default: 'errorMessage.ts',
                when: (answers: Generator.Answers) =>
                {
                    return (answers['components'] as string[]).indexOf('errors') >= 0;
                }
            },
            {
                type: 'input',
                name: 'stylePath',
                message: 'Where do you want to store styles?',
                default: 'styles',
                when: (answers: Generator.Answers) =>
                {
                    return (answers['components'] as string[]).indexOf('style') >= 0;
                }
            },
            {
                type: 'input',
                name: 'templatePath',
                message: 'Where do you want to store templates?',
                default: 'templates',
                when: (answers: Generator.Answers) =>
                {
                    return (answers['components'] as string[]).indexOf('template') >= 0;
                },
                validate: this.enforceDifferentFolder
            },
            {
                type: 'input',
                name: 'acpTemplatePath',
                message: 'Where do you want to store ACP-templates?',
                default: 'acp-templates',
                when: (answers: Generator.Answers) =>
                {
                    return (answers['components'] as string[]).indexOf('acpTemplate') >= 0;
                },
                validate: this.enforceDifferentFolder
            },
            {
                type: 'input',
                name: 'templateListenerFile',
                message: 'Where do you want to store template-listeners?',
                default: 'templateListener.ts',
                when: (answers: Generator.Answers) =>
                {
                    return (answers['components'] as string[]).indexOf('templateListener') >= 0;
                },
            },
            {
                type: 'input',
                name: 'emojiFile',
                default: 'emoji.json',
                message: 'Where do you want to store emojis?',
                when: (answers: Generator.Answers) =>
                {
                    return (answers['components'] as string[]).indexOf('emoji') >= 0;
                }
            }
        ];

        return this.prompt(prompts).then(answers =>
        {
            // To access props later use this.props.someAnswer;
        });
    }

    writing()
    {
    }

    install()
    {
        this.installDependencies({ npm: true, bower: false });
    }
};
