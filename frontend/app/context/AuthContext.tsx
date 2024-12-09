"use client"
import React, { createContext, useContext, useState } from 'react';
import { registerUser, loginUser } from '../axiosFolder/axiosFunctions/userAxios/userAxios';


interface AuthContextType {
  isAuthenticated: boolean;
  signIn: (body:Record<string, any>, remember: boolean) => void;
  signUp: (body: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined | any>(undefined);

export const AuthProvider: React.FC | any = ({ children }:any) => {
  const [user, setUser] = useState<any | null>(null);


  const signIn = async(body:Record<string, any>, remember: boolean) => {
    const response = await loginUser(body);
    if(response.status !== 200){
      return response
    }
    setUser(response.data.data)
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(response.data.data));
    }
    
    return response
  };

  const signUp = async(body:Record<string, any>) => {
    const response = await registerUser(body)
    return response
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("movie");
      localStorage.removeItem("user");
    }
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ signIn, user, setUser, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
