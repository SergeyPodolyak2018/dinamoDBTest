import React from 'react';
import styles from './Board.module.css';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Card from '../Card';
import Column from '../Column';
import useBoard from '../CustomHooks/useBoard';


const Board = () => {
  const [loading, statuses, cards, updateCard] = useBoard();

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    updateCard(draggableId, destination.droppableId, source.droppableId);
  };

  return (
    <>
      <div className={styles.header}></div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.container}>
          {loading?<p>Loading...</p>:statuses.map(el=><Column key={el.id} data={el} cards={cards[el.name] || []}/>)}
        </div>
      </DragDropContext>
    </>
  );
};

export default Board;