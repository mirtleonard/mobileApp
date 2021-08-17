import axios from 'axios';
import { Formik } from 'formik';
import FormData from 'form-data';
import React, { useState } from 'react';
import DatePicker from 'react-native-datepicker';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, Card, Text, Input, Image } from 'react-native-elements';

const options = {
  selectionLimit: 0,
  mediaType: 'photo',
}

function getValue(x) {
  const {id, ...y} = x;
  return y;
}

const App = (props) => {
  const form = new FormData();
  const data = props.route.params ? getValue(props.route.params) : {
        username: 'admin',
        branch: 'Lupișori',
        areas: 'intelectuală',
        title: '',
        location: '',
        duration: '',
        participants: '',
        materials: '',
        goals: '',
        date: new Date(Date.now()),
        description: '',
        strengths: '',
        weaknesses: '',
        improvements: '',
    }
  console.log(data, 'aici');
  return(
    <Formik
       initialValues={data}
       onSubmit={(values) => {
        axios.post('http://192.168.1.9:8000/api/activityReport/', values)
        .then(response => {
          if (form._parts[0]) {
            form.append('type', 'activity');
            form.append('id', response.data.id);
            axios.post('http://192.168.1.9:8000/api/file/',  form, {
              'Content-Type': 'multipart/form-data'})
              .then(response => {
                console.log(response);
              }).catch(error => console.log(error));
          }
        let parent = props.navigation.getParent();
        console.log(parent.getParent());
        if (parent) {
          //parent =  parent.getParent()
          parent.jumpTo('Profile');
        } else
          props.navigation.navigate('Meniu');
        }).catch(error => {
          console.log(error);
          Alert.alert("Eroare", "Nu ați introdus toate datele!");
        });
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <ScrollView>
          <Card>
            <Card.Title style={{flexDirection: 'row'}}>
              <Image source={require('../../assets/scout.png')}
                style={{width:200, height:60}} />
              <Image source={require('../../assets/logo.png')}
                style={{width:70, height:70}} />
            </Card.Title>
            <Card.Divider/>
            <Picker
              onValueChange={handleChange('branch')}
              selectedValue={values.branch}
              label = 'Ramură'
            >
              <Picker.Item label="Lupișori" value="Lupișori" />
              <Picker.Item label="Temerari" value="Temerari" />
              <Picker.Item label="Exploratori" value="Exploratori" />
              <Picker.Item label="Seniori" value="Seniori" />
            </Picker>

            <Picker
              onValueChange={handleChange('areas')}
              selectedValue={values.areas}
              label = 'Arie de dezvoltare'
              style={{

              }}
            >
              <Picker.Item label="intelectuală" value="intelectuală" />
              <Picker.Item label="spirituală" value="spirituală" />
              <Picker.Item label="caracter" value="caracter" />
              <Picker.Item label="afectivă" value="afectivă" />
              <Picker.Item label="socială" value="socială" />
              <Picker.Item label="fizică" value="fizică" />
            </Picker>

            <Input
               onChangeText={handleChange('title')}
               value={values.title}
               label='Titlu'
            />
            <Text style={{
              marginLeft: 10,
              fontWeight: 'bold',
              color: '#a19594',
            }}>
              Data:
            </Text>
            <DatePicker
              date={values.date}
              mode="date"
              placeholder="Data"
              onDateChange={handleChange('date')}
            />
            <Input
               onChangeText={handleChange('location')}
               value={values.location}
               label="Locație"
            />
            <Input
               onChangeText={handleChange('duration')}
               value={values.duration}
               label="Durată"
            />
            <Input
               onChangeText={handleChange('participants')}
               value={values.participants}
               label="Participanți"
               multiline
            />
            <Input
               onChangeText={handleChange('materials')}
               value={values.materials}
               label="Materiale necesare"
               multiline
            />
            <Input
               onChangeText={handleChange('goals')}
               value={values.goals}
               label="Obiective"
               multiline
            />
            <Input
               onChangeText={handleChange('description')}
               value={values.description}
               label="Descriere"
               multiline
            />
            <Input
               onChangeText={handleChange('strengths')}
               value={values.strengths}
               label="Puncte tari"
               multiline
            />
            <Input
               onChangeText={handleChange('weaknesses')}
               value={values.weaknesses}
               label="Puncte slabe"
               multiline
            />
            <Input
               onChangeText={handleChange('improvements')}
               value={values.improvements}
               label="Îmbunătățiri"
               multiline
            />
            <Button
            title='choose image'
            onPress={() => ImagePicker.launchImageLibrary(options, (response) => {
                for (const x in response.assets)
                    form.append('files', {
                      'uri' : response.assets[x].uri,
                      'name' : response.assets[x].fileName,
                      'type' : response.assets[x].type,
                    });
            })}
            />
            <Button
                onPress={handleSubmit}
                title = "Adaugă Raport"
            />
          </Card>
        </ScrollView>
      )}
    </Formik>
  );
}

export default App;
