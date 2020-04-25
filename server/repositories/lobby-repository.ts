import BaseRepository, { IBaseCollection } from './base-repository';
import DatabaseCollections from '../constants/database-collections';

export interface ILobbyCollection extends IBaseCollection {
    hostUsername: string;
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
}
