import React from "react";
import * as S from "./Section.styled";

function Section({ background, fullWidth, children, border }) {
  return (
    <S.SectionBlock background={background} border={border}>
      {!fullWidth && <S.ContainerBox>{children}</S.ContainerBox>}
      {fullWidth && children}
    </S.SectionBlock>
  );
}

export default Section;
