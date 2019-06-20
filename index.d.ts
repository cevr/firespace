import firebase from 'firebase';

type onComplete = (error: any) => void;

type add = (item: any, onComplete: onComplete) => Promise<any>;
type del = (id: string, onComplete: onComplete) => Promise<any>;
type update = (id: string, item: any, onComplete: onComplete) => Promise<any>;

interface Space {
    ref: firebase.database.Reference;
    add: add;
    delete: del;
    update: update;
    signIn: (email: string, password: string) => firebase.User;
    signUp: (email: string, password: string) => firebase.User;
    signOut: () => void;
}

export function firespace(spacePath: string): Space;

export function useSpace<State = any>(
    spacePath: string,
): [State, { add: add; delete: del; update: update; loading: boolean; error: null | any }];
