import React from 'react';

const TodoItem = ({ todoData, loading }) => {
  return (
    <ul className='card-wrapper'>
      {
        todoData.map((item, i) => (
          <li className='card' key={i}>
            <button className='card__delete' />
            <h2 className='card__title'>{item.title}</h2>
            <p className='card__description'>{item.description}</p>
            <span className='card__date'>{item.date}</span>
            <button className='card__compolete'>Текушая задача</button>
          </li>
        ))
      }
    </ul>
  )
}

export default TodoItem;
