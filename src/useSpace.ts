import * as React from 'react';
import * as firebase from 'firebase/app';
import firespace, { add, update, del } from './firespace';

interface SpaceHook {
    add: add;
    update: update;
    delete: del;
    loading: boolean;
    error: null | any;
}

type GetRef = (
    ref: firebase.database.Reference,
) => firebase.database.Reference | firebase.database.Query;

const isFunction = (value: any) => value && typeof value === 'function';

export default function useSpace<State>(path: string, getRef?: GetRef): [State, SpaceHook] {
    const [state, setState] = React.useState();
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const space = React.useMemo(() => firespace(path), [path]);

    const ref = isFunction(getRef) ? React.useMemo(() => getRef(space.ref), [getRef]) : space.ref;

    ref.off('value');
    ref.on('value', (data: firebase.database.DataSnapshot) => {
        setLoading(false);
        setState(data.val());
        ref.off('value');
    });

    return [
        state,
        {
            add: async (item: any) => {
                setLoading(true);
                try {
                    const id = await space.add(item);
                    setLoading(false);
                    return id;
                } catch (error) {
                    setError(error);
                }
            },
            update: async (id: string, item: any) => {
                setLoading(true);
                try {
                    const ret = await space.update(id, item);
                    setLoading(false);
                    return ret;
                } catch (error) {
                    setError(error);
                }
            },
            delete: async (id: string) => {
                setLoading(true);
                try {
                    await space.delete(id);
                    setLoading(false);
                } catch (error) {
                    setError(error);
                }
            },
            loading,
            error,
        },
    ];
}
