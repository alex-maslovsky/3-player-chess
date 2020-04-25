<template>
    <div>
        <PlayerCard :username="host"/>
        <PlayerCard :username="users[0]"/>
        <PlayerCard :username="users[1]"/>
    </div>
</template>

<script>
import PlayerCard from './PlayerCard';
import { getUsername } from '../../services/local-storage-service';
import { createLobby } from '../../services/lobby-socket-service';

export default {
    name: 'Lobby',
    components: { PlayerCard },
    data: () => {
        return {
            host: getUsername(),
            users: [],
        };
    },
    created() {
        createLobby(this.host);
    }
};
</script>