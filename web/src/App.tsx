import "./styles/main.css";

import logoImage from "./assets/nlw_logo.svg";
import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { api } from "./services/api";
import { CreateAdModal } from "./components/CreateAdModal";

const games1 = [
  {
    title: "League of Legends",
    bannerUrl: "/image1.png",
    adsCount: 4,
  },
  {
    title: "League of Legends",
    bannerUrl: "/image2.png",
    adsCount: 4,
  },
  {
    title: "League of Legends",
    bannerUrl: "/image3.png",
    adsCount: 4,
  },
  {
    title: "League of Legends",
    bannerUrl: "/image4.png",
    adsCount: 4,
  },
  {
    title: "League of Legends",
    bannerUrl: "/image5.png",
    adsCount: 4,
  },
  {
    title: "League of Legends",
    bannerUrl: "/image6.png",
    adsCount: 4,
  },
];

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}
function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [dialogIsOpened, setDialogIsOpened] = useState(false);

  useEffect(() => {
    async function loadGames() {
      const response = await api.get("/games");
      setGames(response.data.games);
    }

    loadGames();
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImage} alt="" />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{" "}
        esta aqui.
      </h1>
      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.length > 0 &&
          games.map((game) => (
            <GameBanner
              key={game.id}
              title={game.title}
              bannerUrl={game.bannerUrl}
              adsCount={game._count.ads}
            />
          ))}
      </div>
      {games.length > 0 && (
        <Dialog.Root open={dialogIsOpened} onOpenChange={setDialogIsOpened} >
          <CreateAdBanner />
          <CreateAdModal setDialogIsOpened={setDialogIsOpened} games={games} />
        </Dialog.Root>
      )}
    </div>
  );
}

export default App;
