import * as Dialog from "@radix-ui/react-dialog";
import * as CheckBox from "@radix-ui/react-checkbox";
import * as Select from "@radix-ui/react-select";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import TimePicker from "react-time-picker";
import { Check, GameController } from "phosphor-react";
import { Input } from "./Form/Input";
import { FormEvent, useEffect, useState } from "react";
import { api } from "../services/api";
import { SelectGamesInput } from "./Form/SelectGameInput";

interface Game {
  id: string;
  title: string;
}

interface CreateAdModal {
  games: Game[];
  setDialogIsOpened: (value: boolean) => void;
}

export function CreateAdModal({ games, setDialogIsOpened }: CreateAdModal) {
  // const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);
  const [gameSelected, setGameSelected] = useState("");

  // useEffect(() => {
  //   async function loadGames() {
  //     const response = await api.get("/games");
  //     setGames(response.data.games);
  //   }

  //   loadGames();
  // }, []);
  console.log("games", games);
  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    try {
      if (!gameSelected) {
        alert("something is wrong");
        return;
      }
      const response = await api.post(`/games/${gameSelected}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel,
      });
      alert("Anuncio criado com sucesso");
      setDialogIsOpened(false);
    } catch (err) {
      console.log(err);
      alert("Error ao criar o anuncio");
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black-25/0">
        <Dialog.Title className="text-3xl font-black">
          Publique um anuncio
        </Dialog.Title>

        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              {" "}
              Qual o game?
            </label>

            <SelectGamesInput
              gameSelected={gameSelected}
              games={games}
              setGameSelected={setGameSelected}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name"> Seu nome(ou nickname)</label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Como te chamar no game?"
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
              <Input
                type="number"
                id="yearsPlaying"
                name="yearsPlaying"
                placeholder="Tudo bem ser ZERO"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual o seu Discord?</label>
              <Input
                type="text"
                id="discord"
                name="discord"
                placeholder="Usuario#000"
              />
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>

              <div className="flex flex-col gap-2 flex-1">
                <ToggleGroup.Root
                  type="multiple"
                  className="grid grid-cols-4 gap-2"
                  value={weekDays}
                  onValueChange={setWeekDays}
                >
                  <ToggleGroup.Item
                    value="0"
                    title="Domingo"
                    className={`w-8 h-8 rounded bg-zinc-900 ${
                      weekDays.includes("0") && "bg-violet-500"
                    }`}
                  >
                    D
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="1"
                    title="Segunda"
                    className={`w-8 h-8 rounded bg-zinc-900 ${
                      weekDays.includes("1") && "bg-violet-500"
                    }`}
                  >
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    title="Terça"
                    value="2"
                    className={`w-8 h-8 rounded bg-zinc-900 ${
                      weekDays.includes("2") && "bg-violet-500"
                    }`}
                  >
                    T
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="3"
                    title="Quarta"
                    className={`w-8 h-8 rounded bg-zinc-900 ${
                      weekDays.includes("3") && "bg-violet-500"
                    }`}
                  >
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="4"
                    title="Quinta"
                    className={`w-8 h-8 rounded bg-zinc-900 ${
                      weekDays.includes("4") && "bg-violet-500"
                    }`}
                  >
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="5"
                    title="Sexta"
                    className={`w-8 h-8 rounded bg-zinc-900 ${
                      weekDays.includes("5") && "bg-violet-500"
                    }`}
                  >
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="6"
                    title="Sábado"
                    className={`w-8 h-8 rounded bg-zinc-900 ${
                      weekDays.includes("6") && "bg-violet-500"
                    }`}
                  >
                    S
                  </ToggleGroup.Item>
                </ToggleGroup.Root>
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual horário do dia?</label>
              <div className="grid grid-cols-2 gap-1">
                <Input
                  type="time"
                  id="hourStart"
                  name="hourStart"
                  placeholder="De"
                />

                <Input
                  type="time"
                  id="hourEnd"
                  name="hourEnd"
                  placeholder="Até"
                />
              </div>
            </div>
          </div>

          <label className="mt-2 flex gap-2 text-sm items-center">
            <CheckBox.Root
              className="w-6 h-6 p-1 rounded bg-zinc-900"
              onCheckedChange={(checked) => {
                checked == true
                  ? setUseVoiceChannel(true)
                  : setUseVoiceChannel(false);
              }}
              checked={useVoiceChannel}
            >
              <CheckBox.Indicator>
                <Check className="w-4 h4 text-emerald-400" />
              </CheckBox.Indicator>
            </CheckBox.Root>
            Costumo me conectar ao chat voz
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close
              type="button"
              className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
            >
              Cancelar
            </Dialog.Close>
            <button
              type="submit"
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
            >
              <GameController className="w-6 h-6" />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}