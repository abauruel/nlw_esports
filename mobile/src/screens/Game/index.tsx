import React, { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Background } from "../../components/Background";
import { styles } from "./styles";
import { GameParams } from "../../@types/navigation";
import { FlatList, Image, TouchableOpacity, View, Text } from "react-native";

import { Entypo } from "@expo/vector-icons";
import logoImg from "../../assets/logo-nlw-esports.png";
import { THEME } from "../../theme";
import { Heading } from "../../components/Heading";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";
import { api } from "../../services/api";
import { DuoMatch } from "../../components/DuoMatch";

export function Game() {
  const navigation = useNavigation();
  const route = useRoute();
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const game = route.params as GameParams;
  const [discordDuoSelected, setDiscordDuoSelected] = useState("");
  useEffect(() => {
    async function loadGameAd() {
      const response = await api.get(`/games/${game.id}/ads`);
      setDuos(response.data);
    }

    loadGameAd();
  }, []);

  function handleGoBack() {
    navigation.goBack();
  }

  async function getDiscordUser(adsId: string) {
    const response = await api.get(`/ads/${adsId}/discord`);
    setDiscordDuoSelected(response.data.discord);
  }
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>
          <Image source={logoImg} style={styles.logo} />
          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />
        <Heading title={game.title} subtitle="Conecte-se para jogar" />
        {duos && (
          <FlatList
            data={duos}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <DuoCard data={item} onConnect={() => getDiscordUser(item.id)} />
            )}
            horizontal
            contentContainerStyle={[
              duos.length > 0 ? styles.contentList : styles.emptyListContent,
            ]}
            showsHorizontalScrollIndicator={false}
            style={styles.containerList}
            ListEmptyComponent={() => (
              <Text style={styles.emptyListText}>
                Não há anuncios publicados
              </Text>
            )}
          />
        )}
        <DuoMatch
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
          onClose={() => setDiscordDuoSelected("")}
        />
      </SafeAreaView>
    </Background>
  );
}
