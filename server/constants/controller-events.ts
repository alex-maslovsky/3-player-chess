enum ControllerEvents {
    Connection = 'connection',
    Disconnect = 'disconnect',
    Login = 'login',
    CreateLobby = 'create-lobby',
    GetAllLobbies = 'get-all-lobbies',
    OnLobbyListUpdates = 'on-lobby-list-updates',
    JoinToLobby = 'join-to-lobby',
    OnLobbyUpdates = 'on-lobby-updates',
    VerifyToken = 'verify-token',
    Unauthorized = 'unauthorized',
    OnLobbyClosed = 'on-lobby-closed',
    LeaveLobby = 'leave-lobby',
    CloseLobby = 'close-lobby',
}

export default ControllerEvents;
