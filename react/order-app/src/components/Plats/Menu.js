import { useState, useEffect } from "react";
import styles from "./Menu.module.css";
import { Card } from "../UI/Card";
import { Plat } from "./Plat";

export const Menu = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchMenu = async () => {
      const resp = await fetch(
        "https://react-921c9-default-rtdb.europe-west1.firebasedatabase.app/menu.json",
      );
      if (!resp.ok) {
        throw new Error("Error occured: " + resp.status);
      }

      const data = await resp.json();

      const rsltList = [];
      for (const key in data) {
        rsltList.push({ id: key, plat: data[key] });
      }
      setList(rsltList);
    };

    fetchMenu().catch((e) => {
      setError(e.message);
    });
    setLoading(false);
  }, []);

  if (loading) {
    return <p className={styles.loading}>Loading ... </p>;
  }

  if (error) {
    return (
      <p
        className={styles.error}
      >{`Error occurred while loading the menu: ${error}`}</p>
    );
  }

  const plats = list.map((item) => (
    <Plat key={item.id} id={item.id} plat={item.plat}></Plat>
  ));

  return (
    <>
      <section className={styles.summary}>
        <h2>四大金刚，好吃不贵</h2>
        <p>30欧起送，不免运费</p>
      </section>
      <section className={styles.menu}>
        <Card>
          <ul>{plats}</ul>
        </Card>
      </section>
    </>
  );
};
