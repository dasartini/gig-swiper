import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { StyleSheet } from 'react-native';
import { auth } from '../config/Config';
import Error from './Error';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false)
  function handleSignUp() {
    if (email && password) {
      return createUserWithEmailAndPassword(auth, email, password).then((data)=>{console.log("logged in")})
        .catch((err) => {
          setError(true)

        })
    }

  }

if(error){
  return ( <Error/>)
}

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={value => { setEmail(value) }}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={value => { setPassword(value) }}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Sign Up Mate" onPress={handleSignUp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default SignUp;