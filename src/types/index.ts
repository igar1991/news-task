export interface Tdrownews {
    articles: NewsData[];
    status: string;
    totalResults: number;
}

export interface Tdrowsources {
    sources: SourcesData[];
    status: string;
}

export interface NewsData {
    author: string;
    content: Partial<string>;
    description: string;
    publishedAt: string;
    source: Tsources;
    title: string;
    url: string;
    urlToImage: string;
}

export interface SourcesData {
    id: string;
    name: string;
    category: string;
    country: string;
    description: string;
    language: string;
    url: string;
}

export type Options = {
    [apiKey: string]: string;
};

export type Tsources = Pick<SourcesData, 'id' | 'name'>;

export type Res = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    json(): any;
    ok: boolean;
    status: number;
    statusText: string;
};

export type Callback<T> = { (data: T): void };
