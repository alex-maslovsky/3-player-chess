<template>
    <div>
        <h1>Opened Lobbies</h1>
        <md-list>
            <md-list-item v-for="lobby in lobbyList" :key="lobby" v-bind:to="`/lobby/${lobby}`">{{ lobby }}</md-list-item>
        </md-list>
    </div>
</template>

<script>
import { onLobbyListUpdates } from '../../services/lobby-socket-service';

export default {
    name: "OpenedLobbies",
    data: () => {
        return {
            lobbyList: [],
        };
    },
    created() {
        onLobbyListUpdates((lobbyList) => this.lobbyList = lobbyList);
    }
};
</script>
