import BaseRepository, { IBaseDocument } from './base-repository';
import DatabaseCollections from '../constants/database-collections';

export interface IUserCollection extends IBaseDocument {
    socketIds: string[];
    username: string;
}

export default class UserRepository extends BaseRepository<IUserCollection> {
    constructor() {
        super(DatabaseCollections.Users);
    }

    public findByUsername(username: string): IUserCollection | null {
        return this.collection.findOne({ username });
    }

    public findBySocketId(socketId: string): IUserCollection | null {
        return this.collection.findOne({ socketIds: { $contains: socketId } });
    }
}
