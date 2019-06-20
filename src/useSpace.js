import { useState, useMemo } from 'react';
import firespace from './firespace';

const isFunction = value => value && typeof value === 'function';

export default function useSpace(path) {
    const [state, setState] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const space = useMemo(() => firespace(path), [path]);

    space.ref.off('value');
    space.ref.on('value', data => {
        setLoading(false);
        setState(data.val());
        space.ref.off('value');
    });

    return [
        state,
        {
            add: async (item, onComplete) => {
                setLoading(true);
                return await space.add(item, e => {
                    if (e) setError(e);
                    setLoading(false);
                    isFunction(onComplete) && onComplete(e);
                });
            },
            update: async (id, item, onComplete) => {
                setLoading(true);
                return await space.update(id, item, e => {
                    if (e) setError(e);
                    setLoading(false);
                    isFunction(onComplete) && onComplete(e);
                });
            },
            delete: async (id, onComplete) => {
                setLoading(true);
                return await space.delete(id, e => {
                    if (e) setError(e);
                    setLoading(false);
                    isFunction(onComplete) && onComplete(e);
                });
            },
            loading,
            error,
        },
    ];
}
