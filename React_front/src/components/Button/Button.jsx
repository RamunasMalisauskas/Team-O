import React from "react";
import * as S from "./Button.styled";

function Button({ children, handleClick, color, buttonType }) {
  return (
    <S.Button onClick={handleClick} color={color} type={buttonType}>
      {children}
    </S.Button>
  );
}

export default Button;
