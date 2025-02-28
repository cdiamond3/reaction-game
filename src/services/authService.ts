import axios from "axios";

const urlBody = 'http://localhost:3000/'

 export const loginUser = async (username: string, password: string) => {
    //add a try catch to handle error
    try{
        //make a post call using axios to our desired endpoint and pass it the needed params
        const response = await axios.post(`${urlBody}api/login`, {username, password})
        //return the promise
        return response.data
    } catch{
        //throw error if login is not successful
            throw new Error('Login Failed')
    }
}

export const registerUser = async (username: string, password: string) => {
    try{
        const response = await axios.post(`${urlBody}api/register-users`, {username, password})
        return response.data
    } catch{
            throw new Error('Login Failed')
    }
}

