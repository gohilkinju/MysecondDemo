import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, PermissionsAndroid, Platform, Alert } from 'react-native';
import Voice from '@react-native-voice/voice';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const SpeechToText = () => {
  const [text, setText] = useState('');

  // Request microphone permission (Android only)
  const requestMicPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'App needs access to your microphone for speech recognition.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true; // iOS handles it via Info.plist
  };

  useEffect(() => {
    Voice.onSpeechResults = (e) => {
      if (e.value && e.value.length > 0) {
        setText(e.value[0]);
      }
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startListening = async () => {
    const hasPermission = await requestMicPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Microphone access is required to use speech recognition.');
      return;
    }
    await Voice.start('en-US');
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Speak something..."
        placeholderTextColor='#2C0E55'
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginBottom: 20,
        }}
      />
      <Button title="Start Speaking" onPress={startListening} />
    </View>
  );
};

export default SpeechToText;
