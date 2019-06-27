import * as firebase from 'firebase/app';
import 'firebase/database';

let firebaseApp: firebase.app.App;

interface Config {
    apiKey: string;
    databaseURL: string;
    authDomain?: string;
    projectId?: string;
    storageBucket?: string;
    messagingSenderId?: string;
    appId?: string;
}

export const setConfig = (config: Config, name?: string): firebase.app.App => {
    if (!firebaseApp) {
        firebaseApp = firebase.initializeApp(config, name);
    }
    return firebaseApp;
};

export type add = (item: any) => Promise<string>;
export type del = (id: string) => Promise<void>;
export type update = (id: string, item: any) => Promise<void>;

interface Space {
    ref: firebase.database.Reference;
    add: add;
    delete: del;
    update: update;
}

export default function firespace(path: string): Space {
    if (!firebaseApp && process.env.NODE_ENV !== 'production') {
        throw new Error('Config not found! Did you forget to set the config?');
    }
    const database = firebaseApp.database();
    const ref = database.ref(path);
    return {
        ref,
        add: (item: any) => {
            return new Promise((resolve, reject) =>
                ref.push(item, error => {
                    if (error) reject(error);
                    ref.once('child_added', data => resolve(data.key));
                }),
            );
        },
        delete: (id: string) => {
            return new Promise((resolve, reject) =>
                ref.child(id).remove(error => {
                    if (error) reject(error);
                    resolve();
                }),
            );
        },
        update: (id: string, item: any) => {
            return new Promise((resolve, reject) =>
                ref.child(id).update(item, error => {
                    if (error) reject(error);
                    resolve();
                }),
            );
        },
    };
}
