import React from "react";
import * as S from "./Button.styled";
import PropType from "prop-types";

function Button({ children, handleClick, color, buttonType }) {
  return (
    <S.Button onClick={handleClick} color={color} type={buttonType}>
      {children}
    </S.Button>
  );
}

Button.propTypes = {
  handleClick: PropType.func,
  color: PropType.string,
  buttonType: PropType.string,
};

export default Button;
