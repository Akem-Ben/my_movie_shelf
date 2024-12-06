interface Secrets {
    apiHost: string;
}

interface Config {
    secrets: Secrets;
}

let cache: Config | null = null;

const config = (): Config => {
    if (!cache) {
        const apiHost = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3001/api";

        cache = Object.freeze({
            secrets: {
                apiHost,
            },
        });
    }
    return cache;
};

export default config;