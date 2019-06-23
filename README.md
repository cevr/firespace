<p>&nbsp;</p>
<p align='center'>A simple space for Firebase</p>
<p>&nbsp;</p>

## Introduction

Firespace is for developers who want to quickly develop applications using Firebase, without all of the overhead. Currently only targeting the firebase real time database.

```
npm install @cvr/firespace
```

```
yarn add @cvr/firespace
```

**Step 1 - Set the firebase config in your root file**

```js
import { setConfig } from '@cvr/firespace';

setConfig({
    apiKey: '<APIKEY>',
    databaseURL: '<DATABASEURL>',
});

// you can also extend it
import 'firebase/auth';

const firebase = setConfig({
    apiKey: 'xx',
    databaseURL: 'xx',
    authDomain: 'xx',
});

const auth = firebase.auth();
```

**Step 2 - Use it**

```js
import { useSpace } from '@cvr/firespace';

export default function App() {
    const [todos, space] = useSpace('todos');

    return (
        <div>
            <h1>Todo</h1>
            <AddTodo space={space} />
            <Todos todos={todos} space={space} />
        </div>
    );
}

function AddTodo({ space }) {
    const [text, setText] = useState('');
    const handleAddClick = async () => {
        if (text) {
            await space.add({ text, done: false });
            setText('');
        }
    };
    return <input value={text} onChange={e => setText(e.target.value);} placeholder="What to do next" />;
}

function Todos({ todos, space }) {
    const todosList = Object.entries(todos || {});
    return (
        <div>
            {todosList.map(([id, todo]) => (
                <Todo key={id} id={id} todo={todo} space={space} />
            ))}
        </div>
    );
}

function Todo({ todo, id, space }) {
    return (
        <div onClick={() => space.update(id, { done: !todo.done })}>
            <span>{todo.text}</span>
            <button
                onClick={e => {
                    e.stopPropagation();
                    space.delete(id);
                }}
            >
                delete
            </button>
        </div>
    );
}
```

**Simple Api**

```js
import { useSpace } from '@cvr/firespace';

function Component() {
    const [todos, space] = useSpace('todos');

    space.add({ text: 'Install it', done: false });
    space.update(id, { done: true });
    space.delete(id);
    space.loading;
    space.error;
}
```

### Try it
[![Edit admiring-fermi-uric7](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/admiring-fermi-uric7?fontsize=14)
