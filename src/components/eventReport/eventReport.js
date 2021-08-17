import axios from 'axios';
import React from 'react';
import { Button, Card, Image, Text } from 'react-native-elements';
import { ScrollView, StyleSheet, FlatList } from "react-native";

const App = (props) => {
  const report = props.route.params;
  console.log(report);
  return (
    <ScrollView>
      <Card>
        <Card.Title style={{flexDirection: 'row'}}>
          <Image source={require('../../assets/scout.png')}
            style={{width:200, height:60}} />
          <Image source={require('../../assets/logo.png')}
            style={{width:70, height:70}} />
        </Card.Title>
        <Card.Divider/>
        <Text h3 style={{textAlign:'center'}}> { report.title } {'\n'} </Text>
        <Text> <Text style={styles.boldText}> Centru: </Text> <Text style={styles.text}>  {report.center} {'\n'} </Text> </Text>
        <Text> <Text style={styles.boldText}> Tip eveniment: </Text> <Text style={styles.text}> {report.eventType} {'\n'} </Text> </Text>
        <Text> <Text style={styles.boldText}> Participanți: </Text> <Text style={styles.text}> {report.members} {'\n'} </Text> </Text>
        <Text> <Text style={styles.boldText}> Descrierea evenimentului:{'\n'} </Text> <Text style={styles.text}> {report.description} {'\n'} </Text> </Text>
        <Text> <Text style={styles.boldText}> Loc de desfășurare: </Text> <Text style={styles.text}> {report.location} {'\n'} </Text> </Text>
        <Text> <Text style={styles.boldText}> Data de început: </Text> <Text style={styles.text}> {report.beginingDate} {'\n'} </Text> </Text>
        <Text> <Text style={styles.boldText}> Data de sfârșit: </Text> <Text style={styles.text}> {report.endDate} {'\n'} </Text> </Text>
        <Text> <Text style={styles.boldText}> Raport realizat de: </Text> <Text style={styles.text}> {report.username} {'\n'} </Text> </Text>
        <Card.Divider/>
        <Button
          onPress={() => props.navigation.navigate('EditEventReport', report)}
          title="Editează"
        />
        <Button
          onPress={() => axios.delete('http://192.168.1.9:8000/api/eventReport/' + report.id + '/')
              .then(response => {
                props.navigation.navigate('Home');
              }).catch(error => console.log(error))
          }
          title="Șterge"
        />
      </Card>
    </ScrollView>
  );
}

export default App;

const styles = StyleSheet.create({
  text : {
      fontSize: 18,
  },
  boldText : {
      fontSize: 18,
      fontWeight: 'bold',
  }
})
