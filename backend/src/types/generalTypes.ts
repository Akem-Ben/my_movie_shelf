export interface ResponseDetails {
    statusCode: number;
    message: string;
    data?: any
}

export class QueryParameters {
    title?: string;
    publishedYear?: number;
    movieProducer?: string;
  }