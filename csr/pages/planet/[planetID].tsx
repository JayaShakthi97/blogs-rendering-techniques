import axios from "axios";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { SERVER_CONFIG } from "../../utils/const";
import styles from "../../styles/Planet.module.css";

interface Planet {
  id: number;
  name: string;
  image: string;
  description: string;
}

const DetailsPage: NextPage = () => {
  const router = useRouter();
  const planetId = router.query.planetID;

  const [planet, setPlanet] = useState<Planet>();

  useEffect(() => {
    axios
      .get(`${SERVER_CONFIG.BASE_URL}/planets/${planetId}`)
      .then((res) => {
        setPlanet(res.data);
      })
      .catch((error) => console.error(error));
  }, [planetId]);

  return (
    <div className={styles.container}>
      <h2>Planet Information</h2>
      {planet && (
        <div className={styles.detailsCard}>
          <Image
            src={planet.image}
            alt={planet.name}
            height={200}
            width={200}
          />
          <h1>{planet.name.toUpperCase()}</h1>
          <p>{planet.description}</p>
        </div>
      )}
      <button
        className={styles.backButton}
        onClick={(event) => {
          event.preventDefault();
          router.push(`/`);
        }}
      >
        Go Back
      </button>
    </div>
  );
};

export default DetailsPage;
