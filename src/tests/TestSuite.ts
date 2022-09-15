import { Context } from "mocha";

/**
 * Provides the functionality to register a test suite.
 */
export abstract class TestSuite
{
    /**
     * Initializes a new instance of the {@link TestSuite `TestSuite`} class.
     */
    public constructor()
    { }

    /**
     * Gets the title of the test suite.
     */
    public abstract get Title(): string;

    /**
     * Registers the tests.
     */
    public Register(): void
    {
        suite(
            this.Title,
            () =>
            {
                let self = this;

                suiteSetup(
                    async function()
                    {
                        return self.SuiteSetup(this);
                    });

                suiteTeardown(
                    async function()
                    {
                        return self.SuiteTeardown(this);
                    });

                setup(
                    async function()
                    {
                        return self.Setup(this);
                    });

                teardown(
                    async function()
                    {
                        self.Teardown(this);
                    });

                this.RegisterTests();
            });
    }

    /**
     * Prepares the test suite.
     *
     * @param context
     * The mocha context.
     */
    protected async SuiteSetup(context: Context): Promise<void>
    { }

    /**
     * Releases the resources of the suite.
     *
     * @param context
     * The mocha context.
     */
    protected async SuiteTeardown(context: Context): Promise<void>
    { }

    /**
     * Prepares each test-case.
     *
     * @param context
     * The mocha context.
     */
    protected async Setup(context: Context): Promise<void>
    { }

    /**
     * Disposes each test-case.
     *
     * @param context
     * The mocha context.
     */
    protected async Teardown(context: Context): Promise<void>
    { }

    /**
     * Registers any additional tests.
     */
    protected RegisterTests(): void
    { }
}
