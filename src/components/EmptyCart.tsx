import { FC } from "react";

import emptyCartImage from "../assets/img/empty-cart.png";

const EmptyCart: FC = () => {
  return (
    <div className="content">
      <div className="container container--cart">
        <div className="cart cart--empty">
          <h2>
            Корзина пустая <span>😕</span>
          </h2>
          <p>
            Вероятней всего, вы не заказывали ещё пиццу.
            <br />
            Для того, чтобы заказать пиццу, перейди на главную страницу.
          </p>
          <img src={emptyCartImage} alt="Empty cart" />
          <a href="/" className="button button--black">
            <span>Вернуться назад</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
