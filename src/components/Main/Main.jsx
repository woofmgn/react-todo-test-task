import { useEffect, useState } from "react";

import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase";
 
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
  const [fileValue, setFileValue] = useState(null);
  const [filePath, setFilePath] = useState('');

  const sendNewTodo = async () => {

    await addDoc(collection(db, 'cards'), {
      title: titleValue,
      description: descriptionValue,
      date: dateValue,
      status: '',
      file: filePath,
    })
  }

  const handleOpenAddPopup = () => {
    setPopupAddOpen(!popupAddOpen);
    setFilePath('');
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

  const handleUploadFile = () => {
    if (fileValue === null) {
      return;
    }

    const imageRef = ref(storage, `upload/${fileValue.name}`)
    uploadBytes(imageRef, fileValue).then((res) => {
      console.log('файл загружен')
      console.log(res);
      setFileValue(null);
      setFilePath(res.metadata.fullPath);
    })
  }

  const handleDownloadFile = (fileLink) => {
    const fileRef = ref(storage, fileLink)
    getDownloadURL(fileRef)
      .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.open('GET', url);
        xhr.send();
      })
      .catch((error) => {
        console.log(error.message)
      });
  }

  return (
  <>
    <section className="page">
      <button 
        className="new-card-button"
        onClick={handleOpenAddPopup} 
      />
      {
        <TodoItem 
          onOpeningPopup={handleOpenEditPopup}
          todoData={valueTodo}
          onDeleteCards={handleDeleteCards}
          onEditCard={handleEditCard}
          onDownloadFile={handleDownloadFile}
        />
      }
      {
        popupAddOpen && (
          <NewCard 
            onOpeningPopup={handleOpenAddPopup} 
            onSendNewTodo={sendNewTodo}
            onSendNewFile={handleUploadFile} 
            setTitleValue={setTitleValue}
            setDescriptionValue={setDescriptionValue}
            setDateValue={setDateValue}
            setFileValue={setFileValue}
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
