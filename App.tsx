import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';

import React, {useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Formik} from 'formik';
//form validation

import * as Yup from 'yup';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(6, 'Should be min of 6 character')
    .max(12, 'Should be less than 12')
    .required('Length is required '),
});

export default function App() {
  const [password, setPassword] = useState('');
  const [isPassGen, setisPassGen] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePasswordString = (passwordLength: number) => {
    let characterList = '';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChar = '0123456789';
    const specialChar = ' @#$%&*+)(';

    if (upperCase) {
      characterList += upperCaseChars;
    }

    if (lowerCase) {
      characterList += lowerCaseChars;
    }
    if (numbers) {
      characterList += digitChar;
    }
    if (symbols) {
      characterList += specialChar;
    }

    const passwordResult = createPassword(characterList, passwordLength);

    setPassword(passwordResult);

    setisPassGen(true);
  };

  const createPassword = (characters: string, passwordLength: number) => {
    //
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const resetPassword = () => {
    setPassword('');
    setisPassGen(false);
    setLowerCase(true);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={styles.containerapp}>
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.Passheading}>Password Generator</Text>
          <Formik
            initialValues={{passwordLength: ''}}
            validationSchema={PasswordSchema}
            onSubmit={values => {
              console.log(values);
              generatePasswordString(+values.passwordLength);
            }}>
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.headingInfor}>Password Length:</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder="Ex. 8"
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.oke}>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.heading}>Include LowerCase:</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={lowerCase}
                      onPress={() => setLowerCase(!lowerCase)}
                      fillColor="#830A48"
                      style={styles.bouncy}
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.heading}>Include Uppercase:</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={upperCase}
                      onPress={() => setUpperCase(!upperCase)}
                      fillColor="#830A48"
                      style={styles.bouncy}
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.heading}>Include Symbols: </Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={symbols}
                      onPress={() => setSymbols(!symbols)}
                      fillColor="#830A48"
                      style={styles.bouncyles}
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.heading}>Include Numbers:</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={numbers}
                      onPress={() => setNumbers(!numbers)}
                      fillColor="#830A48"
                      style={styles.bouncyles}
                    />
                  </View>
                </View>
                <View style={styles.formActions}>
                  <TouchableOpacity
                    disabled={!isValid}
                    style={styles.GenPass}
                    onPress={handleSubmit}>
                    <Text style={styles.textInfor}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.ResetPass}
                    onPress={() => {
                      handleReset();
                      resetPassword();
                    }}>
                    <Text style={styles.textInfor}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        {isPassGen ? (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Your Password</Text>
            <Text style={styles.description} selectable={true}>
              {password}
            </Text>
            <Text style={styles.generatedPassword}>Long Press to Copy</Text>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#DCABDF',
    height: 105,
    borderTopLeftRadius: 50,
    borderBottomRightRadius: 50,
    marginTop: 92,
  },
  oke: {
    marginTop: 18,
  },
  cardElevated: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subTitle: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    color: '#302F4D',
    fontSize: 32,
    fontWeight: '700',
  },
  generatedPassword: {
    color: '#000000',
  },
  headingInfor: {
    fontSize: 22,
    marginHorizontal: 12,
    marginVertical: 16,
    textAlign: 'center',
  },
  errorText: {
    color: '#B6244F',
    textAlign: 'center',
  },
  Passheading: {
    marginHorizontal: 12,
    fontSize: 32,
    marginVertical: 12,
    fontWeight: 'bold',
  },
  containerapp: {
    backgroundColor: '#1E152A',
  },
  bouncy: {
    marginHorizontal: 16,
  },
  bouncyles: {
    marginHorizontal: 22,
  },
  heading: {
    fontSize: 22,
    marginVertical: 16,
    textAlign: 'center',
  },
  appContainer: {},
  formContainer: {},
  inputWrapper: {
    flex: 1,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  formActions: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputColumn: {},
  inputStyle: {
    backgroundColor: '#4E6766',
    width: 110,
    borderRadius: 42,
    height: 72,
    marginHorizontal: 16,
  },
  GenPass: {
    backgroundColor: '#297373',
    borderRadius: 50,
    width: 152,
    marginTop: 64,
  },
  ResetPass: {
    backgroundColor: '#EE7674',
    borderRadius: 50,
    width: 152,
    marginVertical: 32,
  },
  textInfor: {
    marginHorizontal: 16,
    textAlign: 'center',
    flex: 1,
    flexWrap: 'wrap',
    width: 'auto',
    marginBottom: 10,

    marginTop: 10,
  },
});
