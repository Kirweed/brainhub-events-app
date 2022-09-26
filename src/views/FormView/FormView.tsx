import { ChangeEvent } from "react";
import Button from "components/Button";
import Input from "components/Input";
import moment from "moment";
import { FormEventHandler, useState } from "react";
import styles from "./FormView.module.scss";
import { isEmailValid } from "utils/isEmailValid";
import { isTextInputValid } from "utils/isTextInputValid";
import { isDateValid } from "utils/isDateValid";

const FormView = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [errorMessages, setErrorMessages] = useState({
    firstName: "",
    lastName: "",
    email: "",
    date: "",
  });

  const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(moment(new Date(e.target.value)).format("YYYY-MM-DD"));
  };

  const submitForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const validationMapper = [
      {
        key: "firstName",
        variable: firstName,
        errorMessage: "Enter your real first name",
        validator: isTextInputValid,
      },
      {
        key: "lastName",
        variable: lastName,
        errorMessage: "Enter your real last name",
        validator: isTextInputValid,
      },
      {
        key: "email",
        variable: email,
        errorMessage: "Enter correct email",
        validator: isEmailValid,
      },
      {
        key: "date",
        variable: date,
        errorMessage: "Enter correct date",
        validator: isDateValid,
      },
    ];
    let isFormValid = true;
    validationMapper.forEach(({ key, variable, errorMessage, validator }) => {
      if (validator(variable)) {
        setErrorMessages((prev) => ({ ...prev, [key]: "" }));
      } else {
        isFormValid = false;
        setErrorMessages((prev) => ({
          ...prev,
          [key]: errorMessage,
        }));
      }
    });
  };

  return (
    <div className={styles.formWrapper}>
      <header className={styles.heading}>
        <h2 className={styles.headingText}>Create event</h2>
      </header>
      <form className={styles.form} onSubmit={submitForm}>
        <Input
          required
          type="text"
          placeholder="first name"
          errorMessage={errorMessages.firstName}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          required
          type="text"
          placeholder="last name"
          errorMessage={errorMessages.lastName}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Input
          required
          type="email"
          placeholder="email"
          errorMessage={errorMessages.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="date"
          value={date}
          onChange={onChangeDate}
          errorMessage={errorMessages.date}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default FormView;
