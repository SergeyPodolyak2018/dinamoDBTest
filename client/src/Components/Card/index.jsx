import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styles from './Card.module.css';


const Card = (props) => {
  const {data, index} = props;
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div className={styles.container} ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}>
        <div className={styles.header}></div>
        <div className={styles.body}>
          {data.body}
        </div>
      </div>
      )}
    </Draggable>
    
  );
};

export default Card;