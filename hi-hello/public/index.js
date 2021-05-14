class WebsocketClient {
    websocket = null
    codeElement = null
    hiButton = null

    constructor(url) {
        this.websocketUrl = url
    }

    begin() {
        this.grabElements()
        this.addDomListeners()
        this.setupWebsocketConnection()
    }

    addDomListeners() {
        this.hiButton.addEventListener("click", this.sendHi.bind(this))
    }

    setupWebsocketConnection() {
        this.websocket = new WebSocket(this.websocketUrl)
        this.websocket.addEventListener("open", () => console.log("connected to server"))
        this.websocket.addEventListener("message", this.handleMessage.bind(this))
    }

    grabElements() {
        this.codeElement = document.querySelector("code")
        this.hiButton = document.querySelector("#hi")
    }

    handleMessage(message) {
        console.log(`Got a message from the server: ${message.data}`)
        this.codeElement.innerHTML = message.data
    }

    sendHi() {
        this.websocket.send("hi")
    }
}

const client
    = window.client
    = new WebsocketClient(`ws://${window.location.host}`)

document.addEventListener("DOMContentLoaded", client.begin())