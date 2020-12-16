import React from "react";
import * as S from "./Section.styled";
import PropType from "prop-types";

function Section({ background, center, children }) {
  return (
    <S.SectionBlock center={center} background={background}>
      <S.ContainerBox>{children}</S.ContainerBox>
    </S.SectionBlock>
  );
}

Section.propTypes = {
  background: PropType.string,
  center: PropType.bool,
};

export default Section;
