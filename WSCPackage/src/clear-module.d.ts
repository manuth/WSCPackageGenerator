declare module "clear-module"
{
    interface IClearRequire
    {
        (moduleId: string): boolean;
        all(): void;
        match(regex: RegExp): void;
    }

    let clear: IClearRequire;

    export = clear;
}