import React from 'react';

const TodoItem = () => {
  return (
    <ul className='card-wrapper'>
      <li className='card'>
        <button className='card__delete' />
        <h2 className='card__title'>Заголовок</h2>
        <p className='card__description'>Здесь будет описание</p>
        <span className='card__date'>17.11.2022</span>
        <button className='card__compolete'>Текушая задача</button>
      </li>
      <li className='card'>
        <button className='card__delete' />
        <h2 className='card__title'>Заголовок</h2>
        <p className='card__description'>Здесь будет описание Здесь будет описание</p>
        <span className='card__date'>17.11.2022</span>
        <button className='card__compolete'>Текушая задача</button>
      </li>
      <li className='card'>
        <button className='card__delete' />
        <h2 className='card__title'>Заголовок</h2>
        <p className='card__description'>эксклюзивные вакансии в нашей команде для вас и ваших друзей, сотни полезных подборок и карточек на самые разные темы: от контейнеризации и инструментов до дайджеста литературы, компьютерных игр и мультфильмов для IT-команд</p>
        <span className='card__date'>17.11.2022</span>
        <button className='card__compolete'>Текушая задача</button>
      </li>
      <li className='card'>
        <button className='card__delete' />
        <h2 className='card__title'>Заголовок</h2>
        <p className='card__description'>эксклюзивные вакансии в нашей команде для вас и ваших друзей, сотни полезных подборок и карточек на самые разные темы: от контейнеризации и инструментов до дайджеста литературы, компьютерных игр и мультфильмов для IT-команд</p>
        <span className='card__date'>17.11.2022</span>
        <button className='card__compolete'>Текушая задача</button>
      </li>
      <li className='card'>
        <button className='card__delete' />
        <h2 className='card__title'>Заголовок</h2>
        <p className='card__description'>эксклюзивные вакансии в нашей команде для вас и ваших друзей, сотни полезных подборок и карточек на самые разные темы: от контейнеризации и инструментов до дайджеста литературы, компьютерных игр и мультфильмов для IT-команд</p>
        <span className='card__date'>17.11.2022</span>
        <button className='card__compolete'>Текушая задача</button>
      </li>
      <li className='card'>
        <button className='card__delete' />
        <h2 className='card__title'>Заголовок</h2>
        <p className='card__description'>эксклюзивные вакансии в нашей команде для вас и ваших друзей, сотни полезных подборок и карточек на самые разные темы: от контейнеризации и инструментов до дайджеста литературы, компьютерных игр и мультфильмов для IT-команд</p>
        <span className='card__date'>17.11.2022</span>
        <button className='card__compolete'>Текушая задача</button>
      </li>
    </ul>
  )
}

export default TodoItem;
