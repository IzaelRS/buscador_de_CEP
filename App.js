import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Keyboard } from 'react-native'; // O SAFEAREAVIEW, SERVE PARA O VIEW FICA AJUSTADO NA TELA 
import api from './src/services/api.js';

export default function App() {

  const [cep, setCep] = useState('');

  const inputRef = useRef(null);

  const [cepUser, setCepUser] = useState(null);


  async function buscar() {
    if (cep == '') {
      alert('Digite um CEP válido');
      setCep('');
      return; // é preciso dar esse returno senão o código continua evolundo mesmo depois do IF
    }


    // esse try é se dar erro no código ele não trava
    try {
      const response = await api.get(`/${cep}/json`); // é nessário passar essas aspas deitadas para poder colocar uma váriavel dentro
      console.log(response.data);
      setCepUser(response.data);
      Keyboard.dismiss(); // garantir que o teclado ira ser fechado
    } catch (error) {
      console.log('ERROR: ' + error);
    }

  }

  // função de faz o botão limpar depois de apertado, deixa a caixa vazia
  function limpar() {
    setCep('');
    inputRef.current.focus(); // serve para voltar o cursor quando limpar
  }


  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.view2}>

        <Text style={styles.texto}>
          Digite o CEP desejado
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ex:00000000"
          value={cep}
          onChangeText={(texto) => setCep(texto)}
          keyboardType="numeric" // deixa o teclado do app somente numerico
          ref={inputRef}
        />
      </View>


      <View style={styles.view3}>

        <TouchableOpacity style={styles.botao1}
          onPress={buscar}
        >
          <Text style={styles.btntext1}>
            Buscar
          </Text>
        </TouchableOpacity>



        <TouchableOpacity style={styles.botao2}
          onPress={limpar}
        >
          <Text style={styles.btntext2}>
            Limpar
          </Text>
        </TouchableOpacity>

      </View>


      {cepUser &&
        <View style={styles.view4}>
          <Text style={styles.itemtexto}> CEP: {cepUser.cep}</Text>
          <Text style={styles.itemtexto}> Logradouro: {cepUser.logradouro}</Text>
          <Text style={styles.itemtexto}> Bairro:  {cepUser.bairro}</Text>
          <Text style={styles.itemtexto}> Cidade: {cepUser.localidade}</Text>
          <Text style={styles.itemtexto}> Estado: {cepUser.uf}</Text>
        </View>
      }

    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaeaea"
  },
  view2: {
    alignItems: 'center',
  },
  texto: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 5,
    borderColor: '#ddd',
    borderRadius: 8,
    width: '90%',
    padding: 15, // espaçamento interno
    fontSize: 25, // fonte do input
    textAlign: "center",
  },
  view3: {
    alignItems: 'center', // deixar centralizado
    flexDirection: 'row', // deixar um ao lado do outro
    marginTop: 15,
    justifyContent: 'space-around', //deixar um espaçamento entre os botões
  },
  botao1: {
    heigth: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#47554b'
  },
  btntext1: {
    fontSize: 25,
    color: '#fff',
  },
  botao2: {
    heigth: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#761e42'
  },
  btntext2: {
    fontSize: 25,
    color: '#fff',
  },
  view4: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemtexto: {
    fontSize: 22,
  },
})