import { useEffect, useState } from "react";

import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase";
 
import EditCard from "../EditCard/EditCard";
import NewCard from "../NewCard/NewCard";
import TodoItem from "../TodoItem/TodoItem";

const Main = () => {

/**стейт открытия попапа добавления карточки
* @property {boolean} 0 - попап закрыт
* @property {func} - изменения состояния попапа
*/
  const [popupAddOpen, setPopupAddOpen] = useState(false);

/**стейт открытия попапа редактирования карточки
* @property {boolean} 0 - попап закрыт
* @property {func} - изменения состояния попапа
*/
  const [popupEditOpen, setPopupEditOpen] = useState(false);

/**массив объектов todo
* @property {Array} // массив
* @property {func}  // изменения массива
*/
  const [valueTodo, setValueTodo] = useState([]);

/**объект с данными для редактирования карточки
* @property {object} // объект с данными
* @property {func}   // изменение объекта с данными
*/

  const [editDate, setEditDate] = useState({});
/**
* @property {string} // заголовок todo
* @property {func} // изменение заголовка todo
*/
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
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
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
          setTitleValue={setTitleValue}
          setDescriptionValue={setDescriptionValue}
          setDateValue={setDateValue}
          onEditCard={handleEditCard}
          onDownloadFile={handleDownloadFile}
          filePath={filePath}
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
