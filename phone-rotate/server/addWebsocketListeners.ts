import WebSocket from "ws";
import {websocketServer} from "./index"

enum ClientType {
    PHONE_CLIENT,
    CUBE_CLIENT
}

enum Action {
    REGISTER,
    UPDATE_COORDINATES
}

interface MessageFromClient {
    action: Action,
    type?: ClientType;
    x?: number,
    y?: number,
    z?: number
}


const cubeClients: Array<WebSocket> = []

function relayToCubeClients(message: MessageFromClient) {
    cubeClients.forEach(client => client.send(JSON.stringify({x: message.x, y: message.y, z: message.z} = message)))
}

function storeClient(type: ClientType, client: WebSocket) {
    if (type === ClientType.CUBE_CLIENT) {
        cubeClients.push(client)
    }
}

function handleMessage(data: MessageFromClient, socket: WebSocket) {
    switch (data.action) {
        case Action.REGISTER:
            storeClient(data.type!, socket)
            break
        case Action.UPDATE_COORDINATES:
            relayToCubeClients(data)
            break
    }
}

export function addWebsocketListeners(socket: WebSocket) {
    socket.on("message", messageEvent => {
        const data = JSON.parse(messageEvent as string) as MessageFromClient
        handleMessage(data, socket)
    })
}