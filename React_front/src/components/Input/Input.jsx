import React from "react";
import * as S from "./Input.styled";
import PropType from "prop-types";

function Input({
  type,
  placeholder,
  value,
  radio,
  checkbox,
  options,
  handleChange,
  required,
}) {
  switch (type) {
    case "textarea":
      return (
        <S.TextArea
          type="textarea"
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          required={required}
        />
      );
    case "email":
      return (
        <S.Input
          type="email"
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          required={required}
        />
      );
    case "number":
      return (
        <S.Input
          type="number"
          step="0.1"
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          required={required}
        />
      );
    case "password":
      return (
        <S.Input
          type="password"
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          required={required}
        />
      );
    case "dropdown":
      return (
        <S.Select type="dropdown" onChange={handleChange}>
          <option value="">Select your city:</option>

          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.name}
            </option>
          ))}
        </S.Select>
      );
    case "radio":
      return (
        <S.RadioInput>
          {radio.map((r, i) => (
            <S.CheckBox key={i}>
              <S.Radio
                type="radio"
                name="radio"
                id={r.value}
                value={r.value}
                onClick={handleChange}
              />
              <S.Label htmlFor={r.value}>{r.label}</S.Label>
            </S.CheckBox>
          ))}
        </S.RadioInput>
      );

    case "checkbox":
      return (
        <>
          {checkbox.map((c, i) => (
            <S.CheckBox key={i}>
              <S.Radio
                type="checkbox"
                name="checkbox"
                id={c.value}
                value={c.value}
                onClick={handleChange}
              />
              <S.Label htmlFor={c.value}>{c.label}</S.Label>
            </S.CheckBox>
          ))}
        </>
      );
    default:
      return (
        <S.Input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          required={required}
        />
      );
  }
}

Input.propTypes = {
  type: PropType.string,
  placeholder: PropType.string,
  value: PropType.string,
  radio: PropType.array,
  checkbox: PropType.array,
  options: PropType.array,
  handleChange: PropType.func,
};

export default Input;
