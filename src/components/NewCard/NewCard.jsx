import React from 'react';

const NewCard = () => {
  return (
    <div className="popup popup_active">
      <div className="popup__wrapper">
        <h2 className="popup__title">Новая задача</h2>
        <button className="popup__close-button" type="button"></button>
        <form className="popup__form popup__form_type_profile form" name="profile" noValidate>
          <fieldset className="popup__input-container">
            <input className="popup__form-item popup__form-item_type_title" id="input-title" type="text" name="formTitle" placeholder="Название" required minLength="2" maxLength="40" />
            <input className="popup__form-item  popup__form-item_type_description" id="input-description" type="text" name="formDescription" placeholder="Описание" required minLength="2" maxLength="200" />
            <input className="popup__form-item  popup__form-item_type_deadline" id="input-deadline" type="text" name="formDescription" placeholder="Дата дедлайна" required minLength="2" maxLength="200" />
            <input className="popup__form-item  popup__form-item_type_file" id="input-file" type="file" name="formFile" required minLength="2" maxLength="200" />
            <button className="popup__form-button popup__form-button_inactive" type="submit">Сохранить</button>
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default NewCard;
