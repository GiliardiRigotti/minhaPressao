import { Alert, StyleSheet, Text, View } from 'react-native';
import * as Updates from 'expo-updates';
import 'react-native-gesture-handler';
import Routes from './src/routes';
import { useEffect } from 'react';
import { system } from './src/constants/system';

export default function App() {

  useEffect(() => {
    async function availableUpdate() {
      if (!system.isDevice) return;

      const { isAvailable } = await Updates.checkForUpdateAsync();

      if (isAvailable) {
        const { isNew } = await Updates.fetchUpdateAsync();

        if (isNew) {
          Alert.alert(
            'Nova atualização disponível',
            'Uma nova atualização disponível, deseja aplicar agora?',
            [
              {
                text: 'Não',
                onPress: () => { },
                style: 'cancel',
              },
              {
                text: 'Sim',
                onPress: () => Updates.reloadAsync().then(),
              },
            ],
            { cancelable: false },
          );
        }
      }
    }
    availableUpdate();
  }, []);

  return (
    <Routes />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
