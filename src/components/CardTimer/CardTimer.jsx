import React, { useMemo, useState } from 'react';

import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const CardTimer = ({ endTime }) => {

  const [statusDeadline, setStatusDeadline] = useState(false);
  const [status, setStatus] = useState(false);

  const handleSetStatus = () => {
    if (!statusDeadline) {
      setStatus(!status);
    }
  }

  useMemo(() => {
    let nowDate = dayjs();
    const deadlineDate = dayjs(endTime, 'DD.MM.YYYY');

    if(nowDate.unix() < deadlineDate.unix()) {
      return;
    } else {
      setStatusDeadline(true);
    }

    setInterval(() => {
      if(!status && nowDate.unix() < deadlineDate.unix()) {
        return;
      } else {
        setStatusDeadline(true);
      }
    }, [3600000]);
    // вот тут нужно подумать насчет зависимостей
  }, [endTime, status])

  return (
    <button 
      className={
        `card__status ${statusDeadline && 'card__status_type_isdead'} 
        ${status && 'card__status_type_complete'}`}
        onClick={handleSetStatus}
      >
        {endTime}
      </button>
  )
}

export default CardTimer;
