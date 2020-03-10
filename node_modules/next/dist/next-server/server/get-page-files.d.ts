export declare type BuildManifest = {
    devFiles: string[];
    lowPriorityFiles: string[];
    pages: {
        '/_app': string[];
        [page: string]: string[];
    };
};
export declare function getPageFiles(buildManifest: BuildManifest, page: string): string[];
