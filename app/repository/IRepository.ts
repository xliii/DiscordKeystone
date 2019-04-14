export interface IRepository<T> {
    List(): Promise<T[]>;
}