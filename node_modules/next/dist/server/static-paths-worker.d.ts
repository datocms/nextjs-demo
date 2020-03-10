export declare function loadStaticPaths(distDir: string, buildId: string, pathname: string, serverless: boolean): Promise<{
    paths: string[];
    fallback: boolean;
}>;
