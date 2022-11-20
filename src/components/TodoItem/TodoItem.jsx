import { Link } from 'react-router-dom';
import CardTimer from "../CardTimer/CardTimer";

const TodoItem = ({ todoData, onDeleteCards, onOpeningPopup, onEditCard, onDownloadFile }) => {

  return (
    <ul className='card-wrapper'>
      {
        todoData.map((item) => (
          <li className='card' key={item.id}>
            <button className='card__delete' onClick={() => onDeleteCards(item.id)}/>
            <h2 className='card__title'>{item.title}</h2>
            <p className='card__description'>{item.description}</p>
            {
              item.file !== '' && 
              <Link
                className='card__file-link' 
                to={item.file} 
                onClick={() => onDownloadFile(item.file)}
              >
                <div></div>
                <span>скачать файл</span>
              </Link>
            }
            <div className='card__wrapper'>
              <CardTimer 
                endTime={item.date} 
                onEditCard={onEditCard}
                cardData={{ 
                  title: item.title, 
                  description: item.description, 
                  date: item.date,
                  id: item.id,
                  status: item.status,
                  file: item.file, 
                }}
              />
              <button 
                className='card__edit-button' 
                onClick={() => onOpeningPopup({ 
                  title: item.title, 
                  description: item.description, 
                  date: item.date,
                  id: item.id,
                  status: item.status, 
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
