import { ChangeEvent } from "react";
import Button from "components/Button";
import Input from "components/Input";
import moment from "moment";
import { FormEventHandler, useState } from "react";
import styles from "./FormView.module.scss";
import { isEmailValid } from "utils/isEmailValid";
import { isTextInputValid } from "utils/isTextInputValid";
import { isDateValid } from "utils/isDateValid";
import axios from "axios";
import { BASE_URL } from "constant";

const FormView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    firstName: "",
    lastName: "",
    email: "",
    date: "",
    backend: "",
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

    if (!isFormValid) return;

    setIsLoading(true);
    axios
      .post(`${BASE_URL}event`, {
        firstName,
        lastName,
        email,
        date: new Date(date),
      })
      .then(() => {
        setIsLoading(false);
        setIsSubmitted(true);
        setFirstName("");
        setLastName("");
        setEmail("");
        setDate("");
      })
      .catch(({ response }) => {
        setIsLoading(false);
        setErrorMessages((prev) => ({ ...prev, backend: response.data }));
      });
  };

  return (
    <div className={styles.formWrapper}>
      {isSubmitted ? (
        <>
          <h1 className={styles.summary}>Thanks for submmiting!</h1>
          <Button type="button" onClick={() => setIsSubmitted(false)}>
            Add another event
          </Button>
        </>
      ) : (
        <>
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
            {errorMessages.backend && (
              <p className={styles.error}>{errorMessages.backend}</p>
            )}
            <Button type="submit" disabled={isLoading}>
              Submit
            </Button>
          </form>
        </>
      )}
    </div>
  );
};

export default FormView;
