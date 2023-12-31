"use server"

import { redirect } from "next/navigation";
import { UserModel } from "../models/user"
import { cookies } from 'next/headers';
export const login = async (data: {email:string, password:string}): Promise<any> => {
    const response = await fetch(`https://techspecbe.azurewebsites.net/login`, {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: "include",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            // "getSetCookie": 
            
        },
        
        // credentials: "include"
    });
    return response.json();
}

export const getTokenClaims = async (): Promise<any> => {
    try {
      const response = await fetch(`https://techspecbe.azurewebsites.net/token`, {
        method: 'GET',
        headers: {
            'X-CSRF-TOKEN': cookies().get('csrf_access_token')!.value,
          }
    })
    return response.json();  
    } catch (error) {
        console.log({message: "An error occurred", status: "500"})
    }

    redirect(`/admin/user`);
}

export const getAllUsers = async (): Promise<UserModel[]> => {
    const response = await fetch(`https://techspecbe.azurewebsites.net/user`, {
        next: {
            revalidate: 0
        }
    });
    return response.json();
}

export const registerUser = async (user: UserModel): Promise<UserModel> => {
    const response = await fetch(`https://techspecbe.azurewebsites.net/user`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        } 
    });
    return response.json();
}

export const deleteUser = async (email: string): Promise<string> => {
    const response = await fetch(`https://techspecbe.azurewebsites.net/user/${email}`, {
        method: 'DELETE'
    });
    return response.json();
}

// function getCookie(name) {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(';').shift();
//   }