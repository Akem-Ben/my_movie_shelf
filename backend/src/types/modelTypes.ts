export interface UserAttributes {
    id: string;
    phone: string;
    fullName: string;
    userName: string;
    email: string;
    password:string;
    role: string;
    refreshToken: string;
    numberOfMoviesAdded: number;
}

export interface MovieAttributes {
    id: string;
    title: string;
    publishedDate: number;
    description: string;
    moviePoster: string;
    movieProducer: string;
    ownerId: string;
    genre: string;
  }