import { Options, Res } from '../../types/index';
import { Tdrownews, Tdrowsources, Callback } from '../../types/index';

class Loader {
    private baseLink;
    private options;
    constructor(baseLink: string, options: Options) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: { endpoint: string; options?: object },

        callback: Callback<Tdrowsources> | Callback<Tdrownews> = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Res) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: { [sources: string]: string }, endpoint: string) {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(
        method: 'GET' | 'POST',
        endpoint: string,
        callback: Callback<Tdrowsources> | Callback<Tdrownews>,
        options = {}
    ) {
        fetch(this.makeUrl(options, endpoint), { method })
            // eslint-disable-next-line @typescript-eslint/unbound-method
            .then(this.errorHandler)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            .then((res) => res.json())
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
