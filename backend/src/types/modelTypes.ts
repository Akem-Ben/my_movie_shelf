export interface UserAttributes {
    id: string;
    profileImage: string;
    phone: string;
    fullName: string;
    userName: string;
    email: string;
    password:string;
    isVerified: boolean;
    role: string;
    refreshToken: string;
    numberOfMoviesAdded: number;
}

export interface MovieAttributes {
    id: string;
    title: string;
    publishedDate: Date;
    description: string;
    moviePoster: string;
    movieProducer: string;
    ownerId: string;
  }