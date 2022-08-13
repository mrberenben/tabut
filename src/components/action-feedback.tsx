import React from "react";
import styles from "@styles/components/action-feedback.module.css";

type ActionFeedbackProps = {
  type: "loading" | "error";
};
const ActionFeedback: React.FC<ActionFeedbackProps> = ({
  type
}: ActionFeedbackProps) => {
  return (
    <div className={styles.preloader}>
      {type === "loading"
        ? "Loading"
        : "Error while loading data, please refresh the page."}
    </div>
  );
};

export default ActionFeedback;
