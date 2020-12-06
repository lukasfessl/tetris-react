import { w3cwebsocket as W3CWebSocket } from "websocket";

class Client {

    client = new W3CWebSocket('ws://127.0.0.1:8000');

    createConnection() {
        this.client.onopen = () => {
            console.log('WebSocket Client Connected');
        };
    }

    waitForOpenConnection = (socket) => {
        return new Promise((resolve, reject) => {
            const maxNumberOfAttempts = 10
            const intervalTime = 200 //ms
    
            let currentAttempt = 0
            const interval = setInterval(() => {
                if (currentAttempt > maxNumberOfAttempts - 1) {
                    clearInterval(interval)
                    reject(new Error('Maximum number of attempts exceeded'))
                } else if (socket.readyState === socket.OPEN) {
                    clearInterval(interval)
                    resolve()
                }
                currentAttempt++
            }, intervalTime)
        })
    }

    sendMessage = async (msg) => {
        if (this.client.readyState !== this.client.OPEN) {
            try {
                await this.waitForOpenConnection(this.client)
                this.client.send(msg)
            } catch (err) { console.error(err) }
        } else {
            this.client.send(JSON.stringify(msg))
        }
    }

    readMessage() {
        return this.client.onmessage = (message) => {
            return message;
        }
    }

}

export default Client;