export interface UserAttributes {
    id: string;
    profileImage: string;
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
    movieAuthor: string;
  }