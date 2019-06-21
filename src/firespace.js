import firebase from 'firebase/app';
import 'firebase/database';

let firebaseApp;

export const setConfig = (config, name) => {
    firebaseApp = firebase.initializeApp(config, name);
    return firebaseApp;
};

export default function firespace(path) {
    if (!firebaseApp && process.env.NODE_ENV !== 'production') {
        throw new Error('Config not found! Did you forget to set the config?');
    }
    const database = firebaseApp.database();
    const ref = database.ref(path);
    const getValue = () => new Promise(resolve => ref.once('value', data => resolve(data.val())));
    return {
        ref,
        add: async (item, onComplete) => {
            await ref.push(item, onComplete);
            return await getValue(ref);
        },
        delete: async (id, onComplete) => {
            await ref.child(id).remove(onComplete);
            return await getValue(ref);
        },
        update: async (id, item, onComplete) => {
            ref.child(id).update(item, onComplete);
            return await getValue(ref);
        },
    };
}
