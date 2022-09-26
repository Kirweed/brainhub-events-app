import { InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";
import cx from "classnames";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import PriorityHighRoundedIcon from "@mui/icons-material/PriorityHighRounded";
import { checkInputValid } from "helpers/checkInputValid";

const Input = ({
  type,
  value,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) => (
  <div className={styles.inputWrapper}>
    <input
      className={cx(styles.input, type === "date" && styles.dateInput)}
      type={type}
      value={value}
      {...rest}
    />
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
);

export default Input;
