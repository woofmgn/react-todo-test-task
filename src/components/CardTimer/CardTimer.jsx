import React, { useMemo } from 'react';

import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const CardTimer = ({ endTime, onEditCard, cardData }) => {

const { id, status } = cardData; 

  const handleSetStatus = () => {
    if (status !== 'complete' && status !== 'isdead') {
      onEditCard({ ...cardData, status: 'complete', id: id});
      return;
    } else if (status === 'complete') {
      onEditCard({ ...cardData, status: 'inwork', id: id});
      return;
    }
  }

  useMemo(() => {
    let nowDate = dayjs();
    const deadlineDate = dayjs(endTime, 'DD.MM.YYYY');

    if(nowDate.unix() < deadlineDate.unix()) {
      return;
    } else {
      onEditCard({ ...cardData, status: 'isdead', id: id});
    }

    setInterval(() => {
      if((status !== 'complete') && (nowDate.unix() < deadlineDate.unix())) {
        return;
      } else {
        onEditCard({ ...cardData, status: 'isdead', id: id});
      }
    }, [3600000]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <button 
      className={
        `card__status ${status === 'isdead' && 'card__status_type_isdead'} 
        ${status === 'complete' && 'card__status_type_complete'}`}
        onClick={handleSetStatus}
      >
        {endTime}
      </button>
  )
}

export default CardTimer;
