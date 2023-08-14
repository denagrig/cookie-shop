import { UserLoginData, User, UserDataAndId } from "../types"

export const getUser = async() => {
  return new Promise<UserDataAndId>((resolve)=>{
    const userDataAndId : UserDataAndId = {
      user : {
        name:"",
        password:"",
        cart:[],
        alergens:[],
      },
      userID: -1
    }
    const allUsers: User[] = JSON.parse(localStorage.getItem("allUsers") || "[]")
    const userID : number = JSON.parse(localStorage.getItem("userID") || "-1")

    if(userID != -1){
      userDataAndId.userID = userID
      userDataAndId.user = allUsers[userID]
    }
    resolve(userDataAndId)
    return allUsers
  })
}

export const registerUser = async(userData: User) => {
  return new Promise<UserDataAndId>((resolve)=>{
    let doesAlreadyExist = false
    let alergenNum = 0
    const userDataAndID : UserDataAndId = {
      user: userData,
      userID: -1
    }
    const allUsers: User[] = JSON.parse(localStorage.getItem("allUsers") || "[]")
    allUsers.map((user) => {
      if (userData.name == user.name) {
        doesAlreadyExist = true
      }
    })
    if(!doesAlreadyExist)
    {
      userData.alergens.map((alergen) => {
        userData.alergens[alergenNum] = alergen.replace(/\s/g, "")
        alergenNum++
      })
      allUsers.push(userData)
      userDataAndID.userID = allUsers.length - 1
      localStorage.setItem("allUsers", JSON.stringify(allUsers))
      localStorage.setItem("userID", JSON.stringify(userDataAndID.userID))
    }
    resolve(userDataAndID)
    return(userDataAndID)
  })
}

export const logInUser = async(nameAndPassword: UserLoginData) => {
  return new Promise<UserDataAndId>((resolve)=>{
    const userDataAndID : UserDataAndId = {
      user : {
        name:"",
        password:"",
        cart:[],
        alergens:[],
      },
      userID: -1
    }
    let curID = 0
    const allUsers: User[] = JSON.parse(localStorage.getItem("allUsers") || "[]")

    allUsers.map((user) => {
      if (nameAndPassword.name == user.name && nameAndPassword.password == user.password) {
        userDataAndID.userID = curID
      }
      curID++
    })
    if(userDataAndID.userID != -1)
    {
      userDataAndID.user = allUsers[userDataAndID.userID]
      localStorage.setItem("allUsers", JSON.stringify(allUsers))
      localStorage.setItem("userID", JSON.stringify(userDataAndID.userID))
    }
    resolve(userDataAndID)
    return(userDataAndID)
  })
}

export const logOutUser = async() => {
  return new Promise<boolean>((resolve)=>{
    localStorage.setItem("userID", JSON.stringify(-1))
    resolve(true)
  })
}

export const getUserID = async() => {
  return new Promise<number>((resolve)=>{
    const userID: string = JSON.parse(localStorage.getItem("userID") || "-1")
    resolve(parseInt(userID))
    return userID
  })
}

export const setUserID = async(userID: number) => {
  return new Promise<boolean>((resolve)=>{
    localStorage.setItem("userID", JSON.stringify(userID))
    resolve(true)
  })
}