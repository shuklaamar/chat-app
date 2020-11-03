//const messages = require("../../src/utils/messages")

const socket = io()

const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $location = document.querySelector("#location")
const $messages = document.querySelector('#messages')

const messageTemplate = document.querySelector("#message-template").innerHTML
const locationmessageTemplate = document.querySelector("#locationmessage-template").innerHTML


socket.on('message',(message)=>{
    console.log(message)
    const html = Mustache.render(messageTemplate,{
        message:message.text,
        createdAt: moment(messages.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend',html)
})

document.querySelector("#message-form").addEventListener("submit",(e)=>{
    e.preventDefault();
    $messageFormButton.setAttribute('disabled','disabled')


    const message = e.target.elements.message.value
    
    
    socket.emit('sendMessage',message,(error)=>{
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()
       
        if(error) return console.log(error)
        console.log("delivered")
    })
})

socket.on('locationmessage',(message)=>{
    //console.log(url)
    const html = Mustache.render(locationmessageTemplate,{
        url:message.url,
        createdAt: moment(messages.createdAt).format('h:mm a')
        })
    $messages.insertAdjacentHTML('beforeend',html)
})

$location.addEventListener('click',()=>{
    if(!navigator.geolocation){
        return alert('geolocatioin is not supported by your browser')
    }

    $location.setAttribute('disabled','disabled')

    navigator.geolocation.getCurrentPosition((position)=>{
        //console.log(position)
        socket.emit('location',{
        latitude:position.coords.latitude,
        longittude:position.coords.longitude
    },()=>{
        $location.removeAttribute('disabled')
        console.log("location sared")
    })
    })
})