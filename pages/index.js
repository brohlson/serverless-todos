// Package imports
import React, { useState } from 'react';
import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';

// Component imports
import Layout from '../components/Layout';
import Todo from '../components/Todo';

// Util imports
import endpoints from '../util/endpoints';

// Vars
const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://serverless-todos.chaseohlson.now.sh';

// Styled components
const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  overflow-hidden;
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const Container = styled.div`
  width: 500px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 7px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
  padding: 12px;
  overflow: hidden;
  position: relative;
  background: white;
`;

const LoadingIcon = styled.img`
  position: absolute;
  top: ${props => (props.active ? '12px' : '-34px')};
  right: 12px;
  height: 24px;
  width: 24px;
  transition: 0.3s ease;
  z-index: 50;
`;

const Title = styled.h1`
  margin: 0;
  width: 100%;
  background: white;
  position: sticky;
  z-index: 10;
  top: 0;
  padding-bottom: 4px;
`;

const TodoContainer = styled.div`
  flex-grow: 1;
  position: relative;
  z-index: 0;
  overflow: scroll;
`;

const InputContainer = styled.div`
  width: 100%;
  position: sticky;
  bottom: 0;
  background: white;
  z-index: 10;
  padding-top: 4px;
  form {
    display: flex;
    input {
      border-radius: 4px;
      border: 1px solid lightgrey;
      outline: 0;
      width: 100%;
      padding: 4px 8px;
      &:focus,
      &:active {
        border: 1px solid black;
      }
    }
    button {
      height: 50px;
      width: 50px;
      background: black;
      margin-left: 8px;
      flex-shrink: 0;
      border: none;
      border-radius: 4px;
      span {
        color: white;
        font-size: 20px;
        font-weight: 700;
      }
    }
  }
`;

const Index = ({ todos }) => {
  const [localTodos, setLocalTodos] = useState(todos);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (loading) return null;
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}${endpoints.todos.create}`, {
        method: 'POST',
        body: JSON.stringify({
          name: newTodo,
        }),
      });
      const data = await res.json();
      setLoading(false);
      let newTodos = [...localTodos];
      newTodos.push(data.todo);
      setLocalTodos(newTodos);
      setNewTodo('');
    } catch (error) {
      setLoading(false);
    }
  };

  const handleDelete = async id => {
    if (loading) return null;
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}${endpoints.todos.delete}`, {
        method: 'DELETE',
        body: JSON.stringify({
          id: id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      setLocalTodos(data.todos);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleToggle = id => {
    console.log(id);
  };

  return (
    <Layout>
      <Wrapper>
        <Container>
          <LoadingIcon
            active={loading}
            src="/static/img/loading.svg"
            alt="loading"
          />
          <Title>serverless-todos</Title>
          <TodoContainer>
            {localTodos.map(t => (
              <Todo
                onToggle={() => handleToggle(!t.completed)}
                onDelete={() => handleDelete(t._id)}
                key={t._id}
                name={t.name}
                completed={t.completed}
              />
            ))}
          </TodoContainer>
          <InputContainer>
            <form disabled={loading} onSubmit={handleSubmit}>
              <input
                placeholder="Add todo..."
                onChange={e => setNewTodo(e.target.value)}
                value={newTodo}
                required
              />
              <button type="submit">
                <span>&#10011;</span>
              </button>
            </form>
          </InputContainer>
        </Container>
      </Wrapper>
    </Layout>
  );
};

Index.getInitialProps = async () => {
  const res = await fetch(`${baseUrl}${endpoints.todos.all}`);
  const data = await res.json();

  return {
    todos: data.todos,
  };
};

export default Index;
