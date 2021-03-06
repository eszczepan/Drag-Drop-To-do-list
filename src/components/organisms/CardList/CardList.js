import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Card from 'components/molecules/Card/Card';
import CardHeader from 'components/molecules/CardHeader/CardHeader';
import CardForm from 'components/molecules/CardForm/CardForm';

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 2rem 0 0;
  width: 25rem;
  @media (max-width: 550px) {
    width: 35rem;
  }
  @media (max-width: 420px) {
    width: 30rem;
  }
  @media (max-width: 350px) {
    width: 25rem;
  }
`;

const StyledList = styled.div`
  min-height: 10rem;
  border-radius: 10px;
`;

class InnerList extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { tasks } = this.props;
    if (nextProps.tasks === tasks) {
      return false;
    }
    return true;
  }

  render() {
    const { tasks, column } = this.props;
    return tasks.map((task, index) => (
      <Card key={task.id} task={task} index={index} column={column} />
    ));
  }
}

const CardList = ({ title, tasks, column, form }) => (
  <StyledColumn>
    <CardHeader title={title} amount={tasks.length} column={column} />
    <Droppable droppableId={String(column.id)}>
      {(provided) => (
        <StyledList {...provided.droppableProps} ref={provided.innerRef}>
          {form.isVisible && form.column === 1 && column.id === 1 && (
            <CardForm columnId={column.id} />
          )}
          {form.isVisible && form.column === 2 && column.id === 2 && (
            <CardForm columnId={column.id} />
          )}
          {form.isVisible && form.column === 3 && column.id === 3 && (
            <CardForm columnId={column.id} />
          )}

          {tasks.map((task, index) => {
            return (
              <Card
                key={task.id}
                task={task}
                index={index}
                column={column}
                id={task.id}
              />
            );
          })}
          {provided.placeholder}
        </StyledList>
      )}
    </Droppable>
  </StyledColumn>
);

CardList.propTypes = {
  title: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object),
  column: PropTypes.PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    taskIds: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
  form: PropTypes.shape({
    isVisible: PropTypes.bool,
    column: PropTypes.number,
  }).isRequired,
};

CardList.defaultProps = {
  tasks: [],
};

InnerList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
  column: PropTypes.PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    taskIds: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
};
InnerList.defaultProps = {
  tasks: [],
};

export default CardList;
