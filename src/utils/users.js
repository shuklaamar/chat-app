const users = []

const addUser = ({id,name,room}) =>{
    name=name.trim().toLowerCase()
    room=room.trim().toLowerCase()

    if(!name||!room){
        return{
            error:'username is required'
        }
    }

const exist = users.find((user)=>{
    return user.room=room && user.name===name
})

if(exist){
    return{
        error:"the username is in use"
    }
}

const user = {id,name,room}
users.push(user)
return {user}
}

const removeUser = (id) => {
    const index = users.findIndex((user)=>user.id===id)
    if(index!=-1){
        return users.splice(index,1)
    }
}

const getUser = (id) =>{
    return users.find((user)=>user.id===id)
}

const getUserIn = (room) => {
    return users.filter((user)=>{
        user.room===room
    })
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUserIn
}