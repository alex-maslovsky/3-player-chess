import database from './index';
import DatabaseCollections from '../constants/DatabaseCollections';

export interface IBaseCollection {
    id: number;
}

export default class BaseRepository<TCollection extends IBaseCollection> {
    protected database: Loki = database;
    protected collection: Collection<TCollection>;

    constructor(databaseCollection: DatabaseCollections) {
        this.collection = this.createOrGetCollection(databaseCollection);
    }

    public insert(collection: Omit<TCollection, 'id'>): TCollection {
        return this.insert(collection);
    }

    public update(collection: TCollection): TCollection {
        return this.collection.update(collection);
    }

    public findOneById(id: number): TCollection {
        return this.collection.findOne({ id } as TCollection);
    }

    private createOrGetCollection(databaseCollection: DatabaseCollections): Collection<TCollection> {
        const collectionName = DatabaseCollections[databaseCollection];
        return this.database.getCollection(collectionName) || this.database.addCollection(collectionName);
    }
}
