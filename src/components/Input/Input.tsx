import { InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";
import cx from "classnames";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import PriorityHighRoundedIcon from "@mui/icons-material/PriorityHighRounded";
import { checkInputValid } from "helpers/checkInputValid";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
}

const Input = ({ errorMessage, type, value, ...rest }: InputProps) => (
  <div className={cx(styles.wrapper, type === "date" && styles.dateInput)}>
    <div className={styles.inputWrapper}>
      <input className={styles.input} type={type} value={value} {...rest} />
      {type !== "date" && value && (
        <div className={styles.icon}>
          {checkInputValid(type, value) ? (
            <DoneRoundedIcon color="success" fontSize="large" />
          ) : (
            <PriorityHighRoundedIcon color="error" fontSize="large" />
          )}
        </div>
      )}
    </div>
    {errorMessage && <p className={styles.error}>{errorMessage}</p>}
  </div>
);

export default Input;
