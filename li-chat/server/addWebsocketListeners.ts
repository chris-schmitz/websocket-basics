import WebSocket from "ws";
import {websocketServer} from "./index"

interface MessageFromClient {
    action: string,
    name?: string,
    message?: string
}

interface MessageToClient {
    from: string,
    message: string
}

interface ChattyWebsocket extends WebSocket {
    name?: string
}

const messageCache: Array<MessageToClient> = []

function relayToAllSockets(message: MessageToClient) {
    websocketServer.clients.forEach(client => client.send(JSON.stringify(message)))
}

function cacheMessage(messageToClient: MessageToClient) {
    messageCache.push(messageToClient)
}

function handleMessage(data: MessageFromClient, socket: ChattyWebsocket) {
    const chattySocket = socket as ChattyWebsocket
    switch (data.action) {
        case "registerName":
            console.log(`registering name: ${data.name}`)
            chattySocket.name = data.name
            break
        case "share-user-message":
            const messageToClient = {message: data.message!, from: socket.name!}
            cacheMessage(messageToClient)
            relayToAllSockets(messageToClient)
            break
    }
}

export function addWebsocketListeners(socket: WebSocket) {
    //abstract
    if (messageCache.length > 0) {
        socket.send(JSON.stringify(messageCache))
    }

    socket.on("message", messageEvent => {
        const data = JSON.parse(messageEvent as string) as MessageFromClient
        handleMessage(data, socket)
    })
}