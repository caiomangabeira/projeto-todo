import './App.css';
import { useState, useEffect } from 'react';
import { BsTrash, BsBookmarkCheck, BsBookmarkCheckFill } from 'react-icons/bs';

function App() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load todos from localStorage on page load
  useEffect(() => {
    const loadData = () => {
      const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
      setTodos(savedTodos);
    };

    loadData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const todo = {
      id: Math.random(), // Use UUID or another unique method in production
      title,
      time,
      done: false,
    };

    // Update the local storage
    const updatedTodos = [...todos, todo];
    localStorage.setItem('todos', JSON.stringify(updatedTodos));

    setTodos(updatedTodos);
    setTitle("");
    setTime("");
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  const handleEdit = (todoToUpdate) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === todoToUpdate.id
        ? { ...todo, done: !todo.done }
        : todo
    );
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <div className='todo-header'>
        <h1>Lista de Tarefas</h1>
      </div>

      <div className='form-todo'>
        <h2>Insira a sua próxima tarefa:</h2>

        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <label htmlFor="title">O que você vai fazer?</label>
            <input
              type="text"
              name="title"
              placeholder='Título da tarefa'
              onChange={(e) => setTitle(e.target.value)}
              value={title || ""}
              required
            />
          </div>

          <div className='form-control'>
            <label htmlFor="time">Duração:</label>
            <input
              type="text"
              name="time"
              placeholder='Tempo estimado (em horas)'
              onChange={(e) => setTime(e.target.value)}
              value={time || ""}
              required
            />
          </div>

          <input type="submit" value="Criar Tarefa" />
        </form>
      </div>

      <div className='list-todo'>
        <h2>Lista de tarefas:</h2>
        {todos.length === 0 && <p>Não há tarefas!</p>}
        {todos.map((todo) => (
          <div className='todo' key={todo.id}>
            <h3 className={todo.done ? "todo-done" : ""}>{todo.title}</h3>
            <p>Duração: {todo.time}</p>
            <div className='actions'>
              <span onClick={() => handleEdit(todo)}>
                {!todo.done ? <BsBookmarkCheck /> : <BsBookmarkCheckFill />}
              </span>
              <BsTrash onClick={() => handleDelete(todo.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;