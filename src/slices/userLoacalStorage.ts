import { User } from "../types"

export const getUsers = () => mockLoadUsers()
export const setUsers = (allUsers: User[]) => mockSaveUsers(allUsers)
export const getUserID = () => mockLoadID()
export const setUserID = (userID : number) => mockSetID(userID)

export const mockLoadUsers = async() => {
  return new Promise<User[]>((resolve)=>{
    const allUsers: User[] = JSON.parse(localStorage.getItem("allUsers") || "[]")
    resolve(allUsers)
    return allUsers
  })
}

export const mockSaveUsers = async(allUsers: User[]) => {
  return new Promise<void>((resolve)=>{
    localStorage.setItem("allUsers", JSON.stringify(allUsers))
    resolve()
  })
}

export const mockLoadID = async() => {
  return new Promise<number>((resolve)=>{
    const userID: string = JSON.parse(localStorage.getItem("userID") || "-1")
    resolve(parseInt(userID))
    return userID
  })
}

export const mockSetID = async(userID: number) => {
  return new Promise<void>((resolve)=>{
    localStorage.setItem("userID", JSON.stringify(userID))
    resolve()
  })
}