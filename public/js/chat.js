const socket = io()

socket.on('message',(message)=>{
    console.log(message)
})

document.querySelector("#message-form").addEventListener("submit",(e)=>{
    e.preventDefault();

    const message = e.target.elements.message.value
    socket.emit('sendMessage',message,(error)=>{
        if(error) return console.log(error)
        console.log("delivered")
    })
})

document.querySelector("#location").addEventListener('click',()=>{
    if(!navigator.geolocation){
        return alert('geolocatioin is not supported by your browser')
    }

    navigator.geolocation.getCurrentPosition((position)=>{
        //console.log(position)
        socket.emit('location',{
        latitude:position.coords.latitude,
        longittude:position.coords.longitude
    },()=>{
        console.log("location sared")
    })
    })
})