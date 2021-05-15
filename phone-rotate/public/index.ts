
enum ClientType {
    PHONE_CLIENT,
    CUBE_CLIENT
}

enum Action {
    REGISTER,
    UPDATE_COORDINATES
}

interface ClientMessage {
    action: Action,
    x: number,
    y: number,
    z: number
}

class RotationTracker {
    private websocket: WebSocket | null = null
    private websocketUrl: string

    private x: number | null = 0
    private y: number | null = 0
    private z: number | null = 0
    statsOutput: HTMLElement | null = null


    constructor(url: string) {
        this.websocketUrl = url
    }

    begin() {
        this.grabElements()
        this.addDomListeners()
        this.connectToServer()
    }

    private addDomListeners() {
        window.addEventListener("deviceorientation",  this.updateOrientation.bind(this))
    }

    private updateOrientation(event: DeviceOrientationEvent){
        this.x = Math.floor(event.beta!) * 0.01
        this.y = Math.floor(event.gamma!) * 0.01
        this.z = Math.floor(event.alpha!) * 0.01
        this.updateUi()
        this.sendToServer({action:Action.UPDATE_COORDINATES ,x: this.x!, y: this.y!, z: this.z!})
    }

    private updateUi() {
        this.statsOutput!.innerText = `x: ${this.x}\ny: ${this.y}\nz: ${this.z}`
    }


    private connectToServer() {
            this.websocket = new WebSocket(this.websocketUrl)
            this.websocket.addEventListener("open", this.onOpenHandler.bind(this))
            this.websocket.addEventListener("close", (event) => console.log("connection closed"))
            this.websocket.addEventListener("error", (event) => console.log("connected to server"))
            this.websocket.addEventListener("message", this.handleMessage.bind(this))
    }

    private onOpenHandler(event: Event) {
        console.log("connected to server")
    }



    private grabElements() {
        this.statsOutput = document.querySelector("#stats-output")
    }

    private handleMessage(message: MessageEvent) {
        const data = JSON.parse(message.data)
    }


    private sendToServer(message: ClientMessage) {
        this.websocket?.send(JSON.stringify(message))
    }

}

const client
    = new RotationTracker(`wss://${window.location.host}`)

// @ts-ignore
document.addEventListener("DOMContentLoaded", client.begin())