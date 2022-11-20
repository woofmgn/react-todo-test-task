import { useEffect, useState } from "react";

import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 } from 'uuid';
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

    const imageRef = ref(storage, `upload/${fileValue.name + v4()}`)
    uploadBytes(imageRef, fileValue).then((res) => {
      console.log('файл загружен')
      console.log(res);
      console.log(res.metadata.fullPath);
      setFileValue(null);
      setFilePath(res.metadata.fullPath);
    })
  }

  const handleDownloadFile = (refFile) => {
    const storage = getStorage();
    getDownloadURL(ref(storage, refFile))
      .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();

        const img = document.getElementById('myimg');
        img.setAttribute('src', url);
  })
  .catch((error) => {
    // Handle any errors
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
          setTitleValue={setTitleValue}
          setDescriptionValue={setDescriptionValue}
          setDateValue={setDateValue}
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
