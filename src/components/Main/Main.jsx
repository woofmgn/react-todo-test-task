import { useState } from "react";

import { addDoc, collection } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from "../../firebase";

import NewCard from "../NewCard/NewCard";
import TodoItem from "../TodoItem/TodoItem";

const Main = () => {
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  // const [valueTodo, setValueTodo] = useState({});

  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [dateValue, setDateValue] = useState('');

  const [todoData, loading] = useCollectionData(
    collection(db, 'cards')
  );

  const sendNewTodo = async () => {
    await addDoc(collection(db, 'cards'), {
      title: titleValue,
      description: descriptionValue,
      date: dateValue,
    }) 
  }

  const handleOpeningPopup = () => {
    setPopupIsOpen(!popupIsOpen);
  }

  return (
    <>
    <section className="page">
      <button 
        className="new-card-button"
        onClick={handleOpeningPopup} />
      {
       !loading && <TodoItem todoData={todoData} loading={loading}/>
      }
      {
        popupIsOpen && (
          <NewCard 
            onOpeningPopup={handleOpeningPopup} 
            onSendNewTodo={sendNewTodo} 
            setTitleValue={setTitleValue}
            setDescriptionValue={setDescriptionValue}
            setDateValue={setDateValue}
          />
        )
      }
    </section>
    </>
  )
}

export default Main;
