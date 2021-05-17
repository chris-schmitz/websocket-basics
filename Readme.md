# Websocket Basics

This is a repository of a couple of simple websocket implementations. 


## Goal

The goal of these demos is to give a practical way of exploring websockets. None of these are fully fleshed out as applications, but they have enough of a skeleton to see the core concepts. 

# The examples

## hi-hello

![demo](./hi-hello/readme_attachments/hi-hello-demo.gif)

[hi-hello](./hi-hello) is the ultra-basic-no-frills look at a websocket setup.

I intentionally left out as much logic as I could so that it was easier to see the basic setup.

This example consists of an http server with a websocket server attached and a javascript client. When you click the `hi` button the message is realyed to the
server, the server then responds with a `hello` message.

## li-chat

![demo](./li-chat/readme_attachments/li-chat-demo.gif)

[li-chat](./li-chat) shows the real time nature of websocket communication as well as how to work with the anonymous nature of the websocket instances on the server (at
least for the `ws` package). It's a simple group chat application with message history (per session).

## phone-rotate

![demo](./phone-rotate/readme_attachments/demo.gif)

[phone-rotate](./phone-rotate) is a dual screen demo that aims to highlight the speed that websocket communication. As you rotate your phone with the phone client open the cube on the separate screen will follow the movements.
