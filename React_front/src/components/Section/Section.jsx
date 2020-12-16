import React from "react";
import * as S from "./Section.styled";
import PropType from "prop-types";

function Section({ background, fullWidth, children }) {
  return (
    <S.SectionBlock background={background}>
      {!fullWidth && <S.ContainerBox>{children}</S.ContainerBox>}
      {fullWidth && children}
    </S.SectionBlock>
  );
}

Section.propTypes = {
  background: PropType.string,
  fullWidth: PropType.bool,
};

export default Section;
