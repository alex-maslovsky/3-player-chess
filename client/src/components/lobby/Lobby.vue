<template>
    <div>
        <md-progress-bar v-if="!lobby" md-mode="query"></md-progress-bar>
        <div v-else>
            <PlayerCard :username="lobby.members[0]"/>
            <PlayerCard :username="lobby.members[1]"/>
            <PlayerCard :username="lobby.members[2]"/>
        </div>
    </div>
</template>

<script>
import PlayerCard from './PlayerCard';
import { getUsername } from '../../services/local-storage-service';
import { createLobby, joinToLobby, onLobbyUpdates } from '../../services/lobby-socket-service';
import router from '../../router';

export default {
    name: 'Lobby',
    components: { PlayerCard },
    data: () => {
        return {
            lobby: null,
        };
    },
    async created() {
        const { hostUsername } = router.currentRoute.params;

        this.lobby = hostUsername
            ? await joinToLobby(hostUsername, getUsername())
            : await createLobby(getUsername());

        onLobbyUpdates(hostUsername || getUsername(), (lobby) => this.lobby = lobby);
    }
};
</script>