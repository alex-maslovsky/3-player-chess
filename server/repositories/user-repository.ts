import BaseRepository, { IBaseCollection } from './base-repository';
import DatabaseCollections from '../constants/database-collections';

export interface IUserCollection extends IBaseCollection {
    socketId: string;
    username: string;
}

export default class UserRepository extends BaseRepository<IUserCollection> {
    constructor() {
        super(DatabaseCollections.Users);
    }

    public findByUsername(username: string): IUserCollection | null {
        return this.collection.findOne({ username });
    }

    public deleteBySocketId(socketId: string): IUserCollection | null {
        const doc = this.collection.findOne({ socketId });

        if (doc) {
            this.collection.remove(doc);
        }

        return doc;
    }
}
