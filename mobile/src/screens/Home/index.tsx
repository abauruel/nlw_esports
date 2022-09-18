import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import logoImg from "../../assets/logo-nlw-esports.png";
import { Heading } from "../../components/Heading";
import { GameCard, GameCardProps } from "../../components/GameCard";
import { FlatList } from "react-native";
import { api } from "../../services/api";
import { Background } from "../../components/Background";

export function Home() {
  const navigation = useNavigation();
  const [games, setGames] = useState<GameCardProps[]>([]);
  useEffect(() => {
    async function loadGames() {
      const response = await api.get("/games");
      console.log(response.data.games);
      setGames(response.data.games);
    }

    loadGames();
  }, []);

  function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
    navigation.navigate("game", { id, title, bannerUrl });
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />
        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />
        {games.length > 0 && (
          <FlatList
            contentContainerStyle={styles.contentList}
            data={games}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <GameCard data={item} onPress={() => handleOpenGame(item)} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
      </SafeAreaView>
    </Background>
  );
}
