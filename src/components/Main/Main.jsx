import { useEffect, useState } from "react";

import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

import EditCard from "../EditCard/EditCard";
import NewCard from "../NewCard/NewCard";
import TodoItem from "../TodoItem/TodoItem";

const Main = () => {
  const [popupAddOpen, setPopupAddOpen] = useState(false);
  const [popupEditOpen, setPopupEditOpen] = useState(false);

  const [valueTodo, setValueTodo] = useState([]);

  const [editDate, setEditDate] = useState({});

  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [dateValue, setDateValue] = useState('');

  const sendNewTodo = async () => {
    await addDoc(collection(db, 'cards'), {
      title: titleValue,
      description: descriptionValue,
      date: dateValue,
      status: '',
    }) 
  }

  const handleOpenAddPopup = () => {
    setPopupAddOpen(!popupAddOpen);
  }

  const handleOpenEditPopup = (editDate) => {
    setPopupEditOpen(!popupEditOpen);
    setEditDate(editDate);
  }

  useEffect(() => {
    const q = query(collection(db, 'cards'));
    const unsub = onSnapshot(q, (querySnapshots) => {
      let todosArray = [];
      querySnapshots.forEach((doc) => {
        todosArray.push({...doc.data(), id: doc.id});
      });
      setValueTodo(todosArray);
    });
    return () => unsub();
  }, [])

  const handleEditCard = async (editData) => {
    await updateDoc(doc(db, 'cards', editData.id), { 
      title: editData.title, 
      description: editData.description, 
      date: editData.date,
      status: editData.status, 
    });
  }

  const handleDeleteCards = async (id) => {
    await deleteDoc(doc(db, 'cards', id));
  };

  return (
    <>
    <section className="page">
      <button 
        className="new-card-button"
        onClick={handleOpenAddPopup} />
      {
        <TodoItem 
          onOpeningPopup={handleOpenEditPopup}
          todoData={valueTodo}
          onDeleteCards={handleDeleteCards}
          setTitleValue={setTitleValue}
          setDescriptionValue={setDescriptionValue}
          setDateValue={setDateValue}
          onEditCard={handleEditCard}
        />
      }
      {
        popupAddOpen && (
          <NewCard 
            onOpeningPopup={handleOpenAddPopup} 
            onSendNewTodo={sendNewTodo} 
            setTitleValue={setTitleValue}
            setDescriptionValue={setDescriptionValue}
            setDateValue={setDateValue}
          />
        )
      }
      {
        popupEditOpen && (
          <EditCard 
            onOpeningPopup={handleOpenEditPopup}
            onEditCard={handleEditCard} 
            editDate={editDate}
          />
        )
      }
    </section>
    </>
  )
}

export default Main;
