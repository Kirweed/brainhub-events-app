import { ChangeEvent } from "react";
import Button from "components/Button";
import Input from "components/Input";
import moment from "moment";
import { FormEventHandler, useState } from "react";
import styles from "./FormView.module.scss";

const App = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));

  const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(moment(new Date(e.target.value)).format("YYYY-MM-DD"));
  };

  const submitForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
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
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          required
          type="text"
          placeholder="last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Input
          required
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input type="date" value={date} onChange={onChangeDate} />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default App;
