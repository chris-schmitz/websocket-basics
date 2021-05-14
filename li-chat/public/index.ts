interface ClientMessage {
    action: string,
    name?: string,
    message?: string
}

class WebsocketClient {
    websocket: WebSocket | null = null
    private websocketUrl: string

    nameInput: HTMLInputElement | null = null
    connectButton: HTMLButtonElement | null = null
    chatLog: HTMLElement | null = null
    userInput: HTMLInputElement | null = null
    sendButton: HTMLButtonElement | null = null

    constructor(url: string) {
        this.websocketUrl = url
    }

    begin() {
        this.grabElements()
        this.addDomListeners()
    }

    addDomListeners() {
        this.connectButton?.addEventListener("click", this.connectToServer.bind(this))
        this.sendButton?.addEventListener("click", this.sendMessage.bind(this))
        this.userInput?.addEventListener("keydown", this.enterButtonSubmission.bind(this))
    }

    enterButtonSubmission(event: KeyboardEvent) {
        if (event.key == "Enter") {
            this.sendMessage()
        }
    }

    registerName() {
        this.websocket?.send(JSON.stringify({action: "registerName", name: this.nameInput?.value}))
    }


    connectToServer() {
        if (this.nameInput?.value) {
            this.websocket = new WebSocket(this.websocketUrl)
            this.websocket.addEventListener("open", this.onOpenHandler.bind(this))
            this.websocket.addEventListener("close", (event) => console.log("connection closed"))
            this.websocket.addEventListener("error", (event) => console.log("connected to server"))
            this.websocket.addEventListener("message", this.handleMessage.bind(this))
        } else {
            alert("you need to add a name before you can connect.")
        }
    }

    onOpenHandler(event: Event) {
        console.log("connected to server")
        this.disableConnectButton()
        this.enableInputElements()
        this.registerName()
    }

    private disableConnectButton() {
        this.connectButton!.disabled = true
    }

    private enableInputElements() {
        this.userInput!.disabled = false
        this.sendButton!.disabled = false
    }

    private grabElements() {
        this.nameInput = document.querySelector("#user-name")
        this.connectButton = document.querySelector("#connect-button")
        this.chatLog = document.querySelector("#chat-log")
        this.userInput = document.querySelector("#user-input")
        this.sendButton = document.querySelector("#send-button")
    }

    private handleMessage(message: MessageEvent) {
        const data = JSON.parse(message.data)
        if (data instanceof Array) {
            data.forEach(message => this.addToLog(message))
        } else {
            this.addToLog(data)
        }
    }

    private sendMessage() {
        const message = this.getUserInput()
        if (!message) return

        this.setUserInput("")
        this.sendToServer({message, action: "share-user-message"})
    }

    private getUserInput() {
        return this.userInput?.value
    }

    private setUserInput(data: string) {
        return this.userInput!.value = data
    }

    private sendToServer(message: ClientMessage) {
        this.websocket?.send(JSON.stringify(message))
    }

    private addToLog(data: { message: string, from: string }) {
        this.chatLog!.innerText += `${data.from}: ${data.message}\n`
    }
}

const client
    = new WebsocketClient(`ws://${window.location.host}`)

// @ts-ignore
document.addEventListener("DOMContentLoaded", client.begin())