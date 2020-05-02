import BaseRepository, { IBaseDocument } from './base-repository';
import DatabaseCollections from '../constants/database-collections';

export interface ILobbyCollection extends IBaseDocument {
    hostUsername: string;
    members: {
        socketId: string;
        username: string;
    }[];
}

export default class LobbyRepository extends BaseRepository<ILobbyCollection> {
    constructor() {
        super(DatabaseCollections.Lobbies);
    }

    public deleteByHostUsername(hostUsername: string): ILobbyCollection | null {
        const doc = this.collection.findOne({ hostUsername });

        if (doc) {
            this.collection.remove(doc);
        }

        return doc;
    }

    public getLobbyHostUsernames(): string[] {
        return this.getAll().map((lobby) => lobby.hostUsername);
    }

    public findLobbyByHostUsername(hostUsername: string): ILobbyCollection | null {
        return this.collection.findOne({ hostUsername });
    }

    public findBySocketId(socketId: string): ILobbyCollection | null {
        return this.collection.where((lobby) => {
            return !!lobby.members.find((member) => member.socketId === socketId);
        })[0] || null;
    }
}
