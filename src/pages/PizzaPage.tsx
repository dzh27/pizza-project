import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const PizzaPage: FC = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizzaPage() {
      try {
        const { data } = await axios.get(
          "https://64383bd71b9a7dd5c94d085f.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Ошибка");
        navigate("/");
      }
    }

    fetchPizzaPage();
  }, []);

  if (!pizza) {
    return <>Загружаем пиццу...</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
};

export default PizzaPage;
