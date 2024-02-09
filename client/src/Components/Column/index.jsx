import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styles from './Column.module.css';
import useColumns from '../CustomHooks/useColumns';
import Card from '../Card';

const Column = (props) => {
  const {data, cards} = props;
  
  return (
    <div className={styles.container}>
      <div onClick={()=>getCards()} className={styles.header}>{data.name}</div>
      <Droppable droppableId={data.name}>
      {(provided) => (
        <div className={styles.task_list} ref={provided.innerRef}
        {...provided.droppableProps}>
          
          {cards && cards.map((el,index)=><Card key={el.id} data={el} index={index}/>)}
          {provided.placeholder}
        </div>
      )}
      </Droppable>
    </div>

  );
};

export default Column;