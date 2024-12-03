export interface UserAttributes {
    id: string;
    profileImage: string;
    phone: string;
    fullName: string;
    userName: string;
    email: string;
    password:string;
    isVerified: boolean;
}

export interface MovieAttributes {
    id: string;
    title: string;
    publishedYear: number;
    description: string;
    moviePoster: string;
    movieProducer: string;
  }