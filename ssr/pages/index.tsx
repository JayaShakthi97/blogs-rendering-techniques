import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { MouseEvent } from "react";

import { SERVER_CONFIG } from "../utils/const";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

interface Planet {
  id: number;
  name: string;
  image: string;
}

interface HomePageProps {
  planetsList: Planet[]
}

const Home: NextPage<HomePageProps> = ({ planetsList }: HomePageProps) => {
  const router = useRouter();

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

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await axios.get(`${SERVER_CONFIG.BASE_URL}/planets`);
  const planetsList = response.data;

  return {
    props: {
      planetsList,
    },
  };
};

export default Home;
