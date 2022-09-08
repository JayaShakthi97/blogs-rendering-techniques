import axios from "axios";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

import { SERVER_CONFIG } from "../../utils/const";
import styles from "../../styles/Planet.module.css";

interface Planet {
  id: number;
  name: string;
  image: string;
  description: string;
}

interface DetailsPageProps {
  planet: Planet;
}

const DetailsPage: NextPage<DetailsPageProps> = ({
  planet,
}: DetailsPageProps) => {
  const router = useRouter();

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

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axios.get(`${SERVER_CONFIG.BASE_URL}/planets`);
  const planetsList: Planet[] = response.data;

  const paths = planetsList.map((planet) => ({
    params: { planetID: planet.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const planetId = context.params?.planetID;

  const response = await axios.get(
    `${SERVER_CONFIG.BASE_URL}/planets/${planetId}`
  );
  const planet = response.data;

  return {
    props: {
      planet,
    },
  };
};

export default DetailsPage;
