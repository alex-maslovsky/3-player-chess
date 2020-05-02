import database from './index';
import DatabaseCollections from '../constants/database-collections';

export interface IBaseDocument {
    id: number;
}

export default class BaseRepository<TDocument extends IBaseDocument> {
    protected database: Loki = database;
    protected collection: Collection<TDocument>;

    constructor(databaseCollection: DatabaseCollections) {
        this.collection = this.createOrGetCollection(databaseCollection);
    }

    public insert(doc: Omit<TDocument, 'id'>): TDocument {
        return this.collection.insert({
            id: this.collection.maxId + 1,
            ...doc
        } as TDocument);
    }

    public update(doc: TDocument): TDocument {
        return this.collection.update(doc);
    }

    public findOneById(id: number): TDocument | null {
        return this.collection.findOne({ id } as TDocument);
    }

    public getAll(): TDocument[] {
        return this.collection.find();
    }

    public delete(id: number): void {
        const doc = this.findOneById(id);

        if (doc) {
            this.collection.remove(doc);
        }
    }

    private createOrGetCollection(databaseCollection: DatabaseCollections): Collection<TDocument> {
        const collectionName = DatabaseCollections[databaseCollection];
        return this.database.getCollection(collectionName) || this.database.addCollection(collectionName);
    }
}
