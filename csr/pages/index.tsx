import axios from "axios";
import type { NextPage } from "next";
import Image from "next/image";
import { MouseEvent, useEffect, useState } from "react";

import { SERVER_CONFIG } from "../utils/const";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

interface Planet {
  id: number;
  name: string;
  image: string;
}

const Home: NextPage = () => {
  const router = useRouter();

  const [planetsList, setPlanetsList] = useState<Planet[]>([]);

  useEffect(() => {
    axios
      .get(`${SERVER_CONFIG.BASE_URL}/planets`)
      .then((res) => {
        setPlanetsList(res.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const onCardClicked = (e: MouseEvent, id: number) => {
    e.preventDefault();

    router.push(`planet/${id}`);
  };

  return (
    <div className={styles.container}>
      <h1>Planets in the Solar System</h1>
      <div className={styles.grid}>
        {planetsList?.map((planet: Planet) => (
          <div
            key={planet.id}
            className={styles.card}
            onClick={(event) => onCardClicked(event, planet.id)}
          >
            <Image
              src={planet.image}
              alt={planet.name}
              height={200}
              width={200}
            />
            <div className={styles.title}>{planet.name.toUpperCase()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
