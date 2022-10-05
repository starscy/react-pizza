
import classes from "./NotFoundBlock.module.scss";
import notFoundPageGif from "../../assets/img/404.gif";

const NotFoundBlock = () => {
  return (
    <>
      <div className={classes.root}>
        <h2>Страница не найдена</h2>
        <img src={notFoundPageGif} />
      </div>
    </>
  );
};

export default NotFoundBlock;
