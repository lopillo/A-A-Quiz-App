import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Button,
  Surface,
  Text,
  Menu,
  TextInput,
  Dialog,
  Portal,
} from 'react-native-paper';
import { RootStackParamList } from '../types/navigation';
import { t } from '../i18n';
import { useLanguage } from '../i18n/LanguageContext';
import { availableLanguages } from '../i18n';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { language, setLanguage } = useLanguage();
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [playerName, setPlayerName] = React.useState('');
  const [dialogVisible, setDialogVisible] = React.useState(false);

  const handleStartPress = () => setDialogVisible(true);

  const handleSubmitName = () => {
    if (playerName.trim()) {
      setDialogVisible(false);
      navigation.navigate('Selection', { playerName });
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/icon.png')} // bright background (can be your own)
      style={styles.background}
      resizeMode="cover"
      accessibilityLabel={t('colorfulBackground')}
    >
      <SafeAreaView style={styles.safeArea}>
        <Surface style={styles.overlay} elevation={4}>
          {/* Cartoon mascot image */}
          <Image
            source={require('../../assets/images/adaptive-icon.png')}
            style={styles.logo}
            accessibilityLabel={t('mascotLogo')}
          />

          {/* Colorful header */}
          <Text variant="headlineMedium" style={styles.title}>
            {t('title')}
          </Text>

          {/* Start button */}
          <Button mode="contained" onPress={handleStartPress}>
            {t('startQuiz')}
          </Button>

          <Portal>
            <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
              <Dialog.Title>{t('enterName')}</Dialog.Title>
              <Dialog.Content>
                <TextInput
                  label={t('enterName')}
                  value={playerName}
                  onChangeText={setPlayerName}
                  style={styles.input}
                  testID="playerNameInput"
                />
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={handleSubmitName} disabled={!playerName.trim()}>
                  {t('continue')}
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>


          <View style={styles.langMenu}>
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <Button mode="outlined" onPress={() => setMenuVisible(true)}>
                  {t('language')}: {language.toUpperCase()}
                </Button>
              }
            >
              {availableLanguages.map((lang) => (
                <Menu.Item
                  key={lang}
                  onPress={() => {
                    setLanguage(lang);
                    setMenuVisible(false);
                  }}
                  title={lang.toUpperCase()}
                />
              ))}
            </Menu>
          </View>
        </Surface>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 20,
    borderRadius: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    marginBottom: 16,
  },
  langMenu: {
    marginTop: 16,
  },
});
