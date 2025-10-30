from typing import Annotated

from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect, WebSocketException

from ..database import User, SessionDep
from ..security import get_current_user, token_to_user


router = APIRouter(prefix="/chat")


class ChatManager:
    def __init__(self):
        self.clients: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.clients.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.clients.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.clients:
            await connection.send_text(message)

manager = ChatManager()

@router.websocket("/ws")
async def chat_ws(websocket: WebSocket, token: str, session: SessionDep):
    user = token_to_user(token, session)
    if not user:
        raise WebSocketException(code=403)
        
    await manager.connect(websocket)
    username = user.username
    try:
        await manager.broadcast(f"{username} joined the chat")
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(f"{username}: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"{username} left the chat")

