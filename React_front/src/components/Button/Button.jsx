import React from "react";
import * as S from "./Button.styled";
import PropType from "prop-types";

function Button({ children, handleClick, color, sticky, size, buttonType }) {
  return (
    <S.Button
      onClick={handleClick}
      color={color}
      sticky={sticky}
      size={size}
      type={buttonType}
    >
      {children}
    </S.Button>
  );
}

Button.propTypes = {
  handleClick: PropType.func,
  color: PropType.string,
  size: PropType.string,
  buttonType: PropType.string,
  sticky: PropType.bool,
};

export default Button;
