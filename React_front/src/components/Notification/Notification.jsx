import React from "react";
import * as S from "./Notification.styled";

function Notification({ notificationMessage, handleClick, color }) {
  return (
    <S.Notification color={color}>
      {notificationMessage}
      <S.Button onClick={handleClick} color={color}>
        X
      </S.Button>
    </S.Notification>
  );
}

export default Notification;
