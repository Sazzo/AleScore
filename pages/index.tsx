import { ArrowRight, Github, Twitter } from "@styled-icons/bootstrap";
import Head from "next/head";
import { useEffect, useState } from "react";
import api from "../services/API";

interface Anime {
  node: {
    id: string;
    title: string;
    main_picture: {
      medium: string;
      large: string;
    };
  };
  list_status: {
    status: "completed" | "dropped" | "on_hold" | "plan_to_watch";
    score: number;
    num_episodes_watched: number;
    is_rewatching: boolean;
    updated_at: string;
  };
}

export default function Home() {
  const [lastChanges, setLastChanges] = useState<Anime>({
    node: {
      id: "",
      title: "",
      main_picture: {
        medium: "",
        large: "",
      },
    },
    list_status: {
      status: "plan_to_watch",
      score: 0,
      num_episodes_watched: 0,
      is_rewatching: false,
      updated_at: "",
    },
  });
  const [beforeChanges, setBeforeChanges] = useState<Anime>({
    node: {
      id: "",
      title: "",
      main_picture: {
        medium: "",
        large: "",
      },
    },
    list_status: {
      status: "plan_to_watch",
      score: 0,
      num_episodes_watched: 0,
      is_rewatching: false,
      updated_at: "",
    },
  });

  useEffect(() => {
    api.get("changes").then((res) => {
      setLastChanges(res.data.lastChanges);
      setBeforeChanges(res.data.beforeChanges);
    });
  });

  return (
    <div className="main">
      <div className="container">
        <Head>
          <title>AleScore</title>
          <link rel="icon" href="/neferpitou.ico" />
        </Head>
        <img
          className="cover"
          src={
            lastChanges.node
              ? lastChanges.node.main_picture.medium
              : "/neferpitou.png"
          }
        ></img>
        <h1 className="msg">
          {lastChanges.node
            ? `O Alexandre alterou a nota de ${lastChanges.node.title}:`
            : "O Alexandre ainda não alterou nenhuma nota."}
        </h1>
        {lastChanges.node ? (
          <div className="changes">
            <h1>
              <span className="score before">
                {beforeChanges.list_status.score}
              </span>
              <ArrowRight width="48px" className="arrow" />
              <span className="score after">
                {lastChanges.list_status.score}
              </span>
            </h1>
          </div>
        ) : (
          ""
        )}
        <footer>
          <p>
            oi, esse site é open-source |{" "}
            <a className="icon" href="https://twitter.com/FelipeSazz">
              <Twitter width="18px" />
            </a>
            <a className="icon" href="https://github.com/Sazzo/Alescore">
              <Github width="18px" />
            </a>
          </p>
        </footer>
        <p className="updated_at">
          Nota atualizada em:{" "}
          {lastChanges.node ? lastChanges.list_status.updated_at : "2077"} |
          Pode demorar até 20 segundos para atualizar
        </p>
      </div>
    </div>
  );
}
