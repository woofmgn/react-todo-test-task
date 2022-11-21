import React from 'react';

const NewCard = ({ 
  onOpeningPopup, 
  onSendNewTodo, 
  setTitleValue, 
  setDescriptionValue, 
  setDateValue,
  setFileValue,
  onSendNewFile
}) => {

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSendNewTodo();
    onOpeningPopup(false);
  }

  const handleChangeTitle = (evt) => {
    setTitleValue(evt.target.value);
  }

  const handleChangeDescription = (evt) => {
    setDescriptionValue(evt.target.value)
  }

  const handleChangeDate = (evt) => {
    setDateValue(evt.target.value)
  }

  const handleChangeFile = (evt) => {
    setFileValue(evt.target.files[0]);
    // onSendNewFile();
  }

  const handleUploadFile = (evt) => {
    evt.preventDefault();
    onSendNewFile();
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
          className="popup__form" 
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
              onChange={handleChangeFile}
            />
            <button className='popup__upload-button' onClick={handleUploadFile}>Загрузить</button>
            <button 
              className="popup__form-button" 
              type="submit"
            >
              Сохранить
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  )
};

export default NewCard;
