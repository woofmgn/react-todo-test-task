import React from 'react';

const NewCard = ({ 
  onOpeningPopup, 
  onSendNewTodo, 
  setTitleValue, 
  setDescriptionValue, 
  setDateValue 
}) => {

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSendNewTodo();
    onOpeningPopup(false);
  }

  const handleChangeTitle = (evt) => {
    setTitleValue(evt.target.value)
  }

  const handleChangeDescription = (evt) => {
    setDescriptionValue(evt.target.value)
  }

  const handleChangeDate = (evt) => {
    setDateValue(evt.target.value)
  }

  return (
    <div className="popup popup_active">
      <div className="popup__wrapper">
        <h2 className="popup__title">Новая задача</h2>
        <button 
          className="popup__close-button" 
          type="button"
          onClick={onOpeningPopup} 
        />
        <form 
          className="popup__form popup__form_type_profile form" 
          name="profile" 
          noValidate
          onSubmit={handleSubmit}
        >
          <fieldset className="popup__input-container">
            <input 
              className="popup__form-item popup__form-item_type_title" 
              id="input-title" 
              type="text" 
              name="formTitle" 
              placeholder="Название" 
              required minLength="2" 
              maxLength="40" 
              onChange={handleChangeTitle}
            />
            <input 
              className="popup__form-item  popup__form-item_type_description" 
              id="input-description" 
              type="text" 
              name="formDescription" 
              placeholder="Описание" 
              required 
              minLength="2" 
              maxLength="200" 
              onChange={handleChangeDescription}
            />
            <input 
              className="popup__form-item  popup__form-item_type_deadline" 
              id="input-deadline" 
              type="text" 
              name="formDescription" 
              placeholder="Дата дедлайна" 
              required 
              minLength="2" 
              maxLength="200" 
              onChange={handleChangeDate}
            />
            <input 
              className="popup__form-item  popup__form-item_type_file" 
              id="input-file" 
              type="file" 
              name="formFile" 
              required 
              minLength="2" 
              maxLength="200" 
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

export default NewCard;
