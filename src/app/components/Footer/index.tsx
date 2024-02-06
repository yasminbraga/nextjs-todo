import { PropsWithChildren } from "react";
import styles from "./Footer.module.scss";

interface FooterType {
  itemsLeft: number;
  filter: string;
  deleteCompleted: () => void;
  handleFilter: (status: string) => void;
}

const Footer: React.FC<PropsWithChildren<FooterType>> = ({
  itemsLeft,
  filter,
  handleFilter,
  deleteCompleted,
}) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        <div data-testid="task-count">
          {itemsLeft} {itemsLeft === 1 ? "item" : "items"} left
        </div>

        <div className={styles.footer__buttons}>
          <button
            className={`${styles.footer__btn} ${
              filter === "ALL" ? styles.footer__btnActive : ""
            }`}
            onClick={() => handleFilter("ALL")}
          >
            All
          </button>
          <button
            className={`${styles.footer__btn} ${
              filter === "ACTIVE" ? styles.footer__btnActive : ""
            }`}
            onClick={() => handleFilter("ACTIVE")}
          >
            Active
          </button>
          <button
            className={`${styles.footer__btn}  ${
              filter === "COMPLETED" ? styles.footer__btnActive : ""
            }`}
            onClick={() => handleFilter("COMPLETED")}
          >
            Completed
          </button>
        </div>

        <button className={styles.footer__clearBtn} onClick={deleteCompleted}>
          Clear Completed
        </button>
      </div>
    </footer>
  );
};

export default Footer;
