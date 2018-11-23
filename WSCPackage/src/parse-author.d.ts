declare module "parse-author"
{
    interface IPerson
    {
        name?: string;
        email?: string;
        url?: string;
    }

    let parse: (value: string) => IPerson;

    export = parse;
}