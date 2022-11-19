import React, { useState } from 'react';

const EditCard = ({ onOpeningPopup, editDate, onEditCard }) => {
  const { title, description, date, id } = editDate;

  const [ editTitleValue, setEditTitleValue ] = useState('');
  const [ editDescriptionValue, setEditDescriptionValue ] = useState('');
  const [ editDateValue, setEditDateValue ] = useState('');

  const handleChangeTitle = (evt) => {
    setEditTitleValue(evt.target.value);
  }

  const handleChangeDescription = (evt) => {
    setEditDescriptionValue(evt.target.value);
  }

  const handleChangeDate = (evt) => {
    setEditDateValue(evt.target.value);
  }

  const handleSubmit = (evt, newData) => {
    evt.preventDefault();
    onEditCard(newData)
    onOpeningPopup();
  }

  return (
    <div className="popup popup_active">
      <div className="popup__wrapper">
        <h2 className="popup__title">Просмотр и редактирование</h2>
        <button 
          className="popup__close-button" 
          type="button"
          onClick={() => onOpeningPopup()}
        />
        <form 
          className="popup__form popup__form_type_profile form" 
          name="profile" 
          noValidate
          onSubmit={(evt) => handleSubmit(evt, { 
            title: editTitleValue || title, 
            description: editDescriptionValue || description, 
            date: editDateValue || date, id: id 
          })}
        >
          <fieldset className="popup__input-container">
            <textarea 
              className='card__input card__title' 
              type='text' 
              rows='2'
              value={editTitleValue || title || ''} 
              onChange={handleChangeTitle}
            />
            <textarea 
              className='card__input card__description' 
              type='text' 
              rows='4' 
              value={editDescriptionValue || description || ''}
              onChange={handleChangeDescription}
            />
            <textarea 
              className='card__input card__date' 
              type='text' 
              rows='1'
              value={editDateValue || date || ''}
              onChange={handleChangeDate} 
            />
            <button 
              className="popup__form-button popup__form-button_inactive" 
              type="submit"
              >
                Сохранить
              </button>
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default EditCard;