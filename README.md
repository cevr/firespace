<p>&nbsp;</p>
<p align='center'>A simple space for Firebase</p>
<p>&nbsp;</p>

## Introduction

Firespace is for developers who want to quickly develop applications using Firebase, without all of the overhead.

**Step 1 - Set Firebase config in your root file**

```js
import { setConfig } from '@cevr/firespace';

setConfig({
    apiKey: //...,
    authDomain: //...,
    databaseURL: //...,
    projectId: //...,
    storageBucket: //...,
    messagingSenderId:  //...,
    appId: //..,
});
```

**Step 2 - Use it**

```js
import { useSpace } from '@cevr/firespace';

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

    const handleTextChange = e => setText(e.target.value);
    return <input value={text} onChange={handleTextChange} placeholder="What to do next" />;
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
