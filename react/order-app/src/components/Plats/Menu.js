import styles from "./Menu.module.css";
import { Card } from "../UI/Card";
import { Plat } from "./Plat";

const CLASSIC_PLATS = [
  {
    id: "d1",
    name: "大饼",
    description: "用面团烘烤而成的干点",
    price: 2.6,
  },
  {
    id: "d2",
    name: "油条",
    description: "油炸的细长面团",
    price: 3.5,
  },
  {
    id: "d3",
    name: "粢饭团",
    description: "一种糯米包油条的特色小吃",
    price: 3.2,
  },
  {
    id: "d4",
    name: "豆浆",
    description: "黄豆磨成粉末加水煮成的一种饮料",
    price: 2.9,
  },
];

const plats = CLASSIC_PLATS.map((plat) => (
  <Plat key={plat.id} id={plat.id} plat={plat}></Plat>
));

export const Menu = () => {
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
