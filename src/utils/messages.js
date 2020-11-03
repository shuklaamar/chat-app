const generate = (text) =>{
    return {
        text,
        createdAt : new Date().getTime()
    }
}


const generatelocation = (url) =>{
    return{
        url,
        createdAt:new Date().getTime()
    }
}

module.exports = {
    generate,
    generatelocation
}
