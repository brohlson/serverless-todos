import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  padding: 12px 8px;
  background: #fafafa;
  margin-bottom: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  width: 100%;

  .name {
    flex-grow: 1;
    width: 100%;
    text-decoration: ${props => props.completed && 'line-through'};
    opacity: ${props => props.completed && '.5'};
  }

  .buttons {
    flex-shrink: 0;
    flex-wrap: nowrap;
    display: flex;

    button {
      background: ${props => (props.completed ? '#5d768e' : '#0070f3')};
      border-radius: 4px;
      border: none;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      outline: 0;

      &.complete {
        margin-right: 4px;
      }
      &.delete {
        background: black;
      }
      height: 32px;
      width: 32px;
      span {
        font-weight: 700;
      }
    }
  }
`;

const Todo = ({ name, completed, onToggle, onDelete }) => {
  return (
    <Wrapper completed={completed}>
      <div className="name">
        <span>{name}</span>
      </div>
      <div className="buttons">
        <button className="complete" onClick={onToggle}>
          {completed ? <span>&#128260;</span> : <span>&#x2713;</span>}
        </button>
        <button className="delete" onClick={onDelete}>
          <span>&#10005;</span>
        </button>
      </div>
    </Wrapper>
  );
};

Todo.propTypes = {
  name: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Todo;
