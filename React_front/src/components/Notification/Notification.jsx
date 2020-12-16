import React from "react";
import * as S from "./Notification.styled";
import PropType from "prop-types";

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

Notification.propTypes = {
  handleClick: PropType.func,
  notificationMessage: PropType.string,
  color: PropType.string,
};

export default Notification;
