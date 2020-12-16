import React, { useState } from "react";
import { Button, Input } from "../";
import PropType from "prop-types";

function FormTemplate({ fields, callback, buttonText, buttonType }) {
  const [fieldValues, setFieldValues] = useState({});

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        callback(fieldValues);
      }}
    >
      {fields.map((field) => (
        <Input
          type={field.type}
          key={field.name}
          name={field.name}
          placeholder={field.placeholder}
          required={field.required}
          handleChange={(e) =>
            setFieldValues({ ...fieldValues, [field.name]: e.target.value })
          }
        />
      ))}

      <Button buttonType={buttonType}>{buttonText}</Button>
    </form>
  );
}

FormTemplate.propTypes = {
  fields: PropType.array,
  callback: PropType.func,
};

export default FormTemplate;
