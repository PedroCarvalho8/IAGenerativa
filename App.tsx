import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, ActivityIndicator, BackHandler, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { TextInput } from 'react-native-paper';
import Markdown from 'react-native-markdown-display';



export default function App() {  

  const [message, setMessage] = useState("Nenhuma");
  const [tamanhoFont, setTamanhoFont] = useState(13);
  const [tamanhoLoad, setTamanhoLoad] = useState(0);

  const [prompt, onChangePrompt] = useState('');

  const [focusedPrompt, setFocusedPrompt] = useState(false)

  const apiKey = process.env.EXPO_PUBLIC_GEMINIAPIKEY!
  const genAI = new GoogleGenerativeAI(apiKey)

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro"});

  async function run(command: string) {
    setTamanhoFont(0)
    setTamanhoLoad(20)
    const prompt = command
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    setMessage(text)
    setTamanhoFont(13)
    setTamanhoLoad(0)
  }

  function Botao() {
    return(
    <Pressable onPress={() => run(prompt)}
    style={{backgroundColor: '#8A39D6', width: '100%', alignItems: 'center', height: 40, justifyContent: 'center', borderRadius: 20}}>
      <Text style={{fontSize: tamanhoFont, color: 'white'}}>Gerar</Text>
      <ActivityIndicator size={tamanhoLoad} color={'white'}/>
    </Pressable>
    );
  }

  useEffect(() => {
    console.log(apiKey)
  },[message])


  return(
    <View style={{flex: 1, alignItems:'center', justifyContent: 'center', margin: 20, gap: 20, marginTop: 50}}>
      <ScrollView style={styles.container}>
        <Markdown>{message}</Markdown>
      </ScrollView>
      <View style={{width: '100%', gap: 10}}>
        <View style={{ width:'100%', borderRadius: 20}}>
        <TextInput style={{width: "100%"}}
                                onFocus={() => {setFocusedPrompt(true)}}
                                onBlur={() => {setFocusedPrompt(false)}}
                                outlineStyle={{borderRadius: 10}}
                                activeOutlineColor={'#8A39D6'}
                                label="Prompt"
                                mode='outlined'
                                placeholder='Digite o seu prompt'
                                onChangeText={onChangePrompt}
                            />
        </View>
      </View>
      
      <Botao/>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: '#FDFAFE',
    height: 'auto',
    padding: 10,
    borderRadius: 20,
    width: '100%'
  },
})
