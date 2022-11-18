const TodoItem = ({ todoData, onDeleteCards, onOpeningPopup }) => {

  return (
    <ul className='card-wrapper'>
      {
        todoData.map((item) => (
          <li className='card' key={item.id}>
            <button className='card__delete' onClick={() => onDeleteCards(item.id)}/>
            <h2 className='card__title'>{item.title}</h2>
            <p className='card__description'>{item.description}</p>
            <span className='card__date'>{item.date}</span>
            <div className='card__wrapper'>
              <button className='card__compolete'>Текушая задача</button>
              <button 
                className='card__edit-button' 
                onClick={() => onOpeningPopup({ 
                  title: item.title, 
                  description: item.description, 
                  date: item.date,
                  id: item.id, 
                })}
                />
            </div>
          </li>
        ))
      }
    </ul>
  )
}

export default TodoItem;
