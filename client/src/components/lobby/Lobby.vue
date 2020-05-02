<template>
    <div>
        <md-progress-bar v-if="!lobby" md-mode="query"></md-progress-bar>
        <div v-else>
            <PlayerCard :username="(lobby.members[0] || {}).username"/>
            <PlayerCard :username="(lobby.members[1] || {}).username"/>
            <PlayerCard :username="(lobby.members[2] || {}).username"/>
        </div>
        <md-snackbar md-position="center" :md-duration="Infinity" :md-active.sync="showSnackbar">
            <span>Lobby has been closed!</span>
            <md-button class="md-primary" @click="closeLobby()">Go to Home</md-button>
        </md-snackbar>
    </div>
</template>

<script>
import PlayerCard from './PlayerCard';
import { createLobby, joinToLobby, onLobbyUpdates, onLobbyClosed, leave, close } from '../../services/lobby-socket-service';
import router from '../../router';
import userStore from '../../stores/user-store';
import Pages from '../../constants/pages';

export default {
    name: 'Lobby',
    components: { PlayerCard },
    data: () => {
        return {
            lobby: null,
            showSnackbar: false,
        };
    },
    methods: {
        async joinToLobby(hostUsername) {
            const lobby = await joinToLobby(hostUsername, userStore.username);

            onLobbyClosed(lobby.hostUsername, () => {
                this.showSnackbar = true;
            });

            return lobby;
        },
        closeLobby() {
            this.showSnackbar = false;
            router.push({ name: Pages.Home });
        },
    },
    async created() {
        const { hostUsername } = router.currentRoute.params;

        this.lobby = hostUsername
            ? await this.joinToLobby(hostUsername)
            : await createLobby(userStore.username);

        onLobbyUpdates(hostUsername || userStore.username, (lobby) => this.lobby = lobby);
    },
    beforeDestroy() {
        if (this.lobby.hostUsername === userStore.username) {
            close();
        } else {
            leave();
        }
    }
};
</script>