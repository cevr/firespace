import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let app;

export const setConfig = config => {
    app = firebase.initializeApp(config);
};

export default function firespace(path) {
    const database = app.database();
    const auth = app.auth();
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
        signIn: async ({ email, password }) => {
            const user = await auth.signInWithEmailAndPassword(email, password);
            return user;
        },
        signUp: async ({ email, password }) => {
            const user = await auth.createUserWithEmailAndPassword(email, password);
            return user;
        },
        signOut: async () => {
            await auth.signOut();
        },
    };
}
