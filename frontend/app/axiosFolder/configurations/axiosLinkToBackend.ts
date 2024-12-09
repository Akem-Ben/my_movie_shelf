interface Secrets {
    apiHost: string;
}

interface Config {
    secrets: Secrets;
}

let cache: Config | null = null;

const config = (): Config => {
    if (!cache) {
        const apiHost = "http://localhost:3001/api"
        // "https://my-movie-shelf.onrender.com/" ;

        cache = Object.freeze({
            secrets: {
                apiHost,
            },
        });
    }
    return cache;
};

export default config;
