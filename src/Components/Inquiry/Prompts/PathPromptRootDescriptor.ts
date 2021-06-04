/**
 * Provides information about a root-directory.
 */
export type PathPromptRootDescriptor = string | {
    /**
     * The path to the root-directory.
     */
    path: string;

    /**
     * A value indicating whether paths outside the `rootDir` are allowed.
     */
    allowOutside?: boolean;
};
