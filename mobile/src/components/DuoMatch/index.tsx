import React, { useState } from "react";
import {
  View,
  Modal,
  ModalProps,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { CheckCircle } from "phosphor-react-native";
import * as Clipboard from "expo-clipboard";

import { styles } from "./styles";
import { THEME } from "../../theme";
import { Heading } from "../Heading";
interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
  const [isCopy, setIsCopy] = useState(false);

  async function handleCopyDiscordToClipboard() {
    setIsCopy(true);
    await Clipboard.setStringAsync(discord);

    Alert.alert(
      "Discord Copiado!",
      `Usuário copiado para a area de transferência a ser adicionado no discord`
    );
    setIsCopy(false);
  }

  return (
    <Modal {...rest} transparent statusBarTranslucent animationType="fade">
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>
          <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />
          <Heading
            title="Lets play"
            subtitle="Agora e so começar a jogar"
            style={{ alignItems: "center", marginTop: 24 }}
          />
          <Text style={styles.label}>Adicione no discord</Text>
          <TouchableOpacity
            disabled={isCopy}
            style={styles.discordButton}
            onPress={handleCopyDiscordToClipboard}
          >
            <Text style={styles.discord}>
              {isCopy ? (
                <ActivityIndicator color={THEME.COLORS.PRIMARY} />
              ) : (
                discord
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
