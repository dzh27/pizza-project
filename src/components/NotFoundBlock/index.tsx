import { FC } from "react";
 
import Styles from "./NotFounBlock.module.scss"

const NotFoundBlock: FC = () => {
  return (
      <h1 className={Styles.root}>
        <span>😔</span>
        <br />
        <h1>Мы не смогли ничего найти</h1>
      </h1>
  );
};

export default NotFoundBlock;
