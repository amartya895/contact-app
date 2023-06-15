/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Contact from 'react-native-contacts';
import {TouchableOpacity} from 'react-native';
import {Linking} from 'react-native';
import Communications from 'react-native-communications';

export default function App() {
  const [filteredContact, setFilteredContact] = useState<Contact[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(false);
  const [searchResult , setSearchResult] = useState(true)
  const [selectedContactName, setSelectedContactName] = useState<string>('');
  const [selectedContactNumber, setSelectedContactNumber] =
    useState<string>('');
  useEffect(() => {
    getPermission();
  }, []);

  interface Contact {
    phoneNumbers: any;
    displayName: String;
  }

  const getPermission = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    }).then(res => {
      if (res == 'granted') {
        Contact.getAll()
          .then(con => {
            // work with contacts
            console.log(con);
            setContacts(con);
            setFilteredContact(con);
          })
          .catch(e => {
            console.log(e);
          });
      }
    });
  };

  const searchContact = (text: string) => {
    if (text) {
      const newData = contacts.filter(item => {
        const itemData = item.displayName
          ? item.displayName.toUpperCase()
          : ''.toUpperCase();

        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredContact(newData);
      setSearch(text);
      setSearchResult(newData.length > 0);
    } else {
      setFilteredContact(contacts);
      setSearch(text);
      setSearchResult(true);
    }
  };

  const updateModal = (name: string, number: string) => {
    setShow(true);
    setSelectedContactName(name);
    setSelectedContactNumber(number);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f5ffff', padding: 15}}>
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 30,
          marginBottom: 5,
          fontWeight: 'bold',
        }}>
        Contactss
      </Text>

      {/* search-section */}

      <TextInput
        placeholder="Search"
        clearButtonMode="always"
        style={styles.searchbox}
        autoCapitalize="none"
        autoCorrect={false}
        value={search}
        onChangeText={text => searchContact(text)}
      />

      {/* Contact-fetched section */}

      <FlatList
  data={filteredContact}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          updateModal(
            item.displayName.toString(),
            item.phoneNumbers[0].number.toString(),
          );
        }}
        style={styles.contactCard}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('./src/images/user.png')}
            style={styles.image}
          />
          <View style={{padding: 10}}>
            <Text style={styles.textName}>{item.displayName}</Text>
            <Text style={styles.textPhone}>
              {item.phoneNumbers[0].number}
            </Text>
          </View>
        </View>

        {/* Messaging  section */}

        <View style={{flexDirection: 'row', paddingRight: 15}}>
          <TouchableOpacity
            onPress={() => {
              const url = Communications.text(
                item.phoneNumbers[0].number,
              );
            }}>
            <Image
              source={require('./src/images/message.png')}
              style={{
                width: 30,
                height: 30,
                tintColor: 'orange',

                marginRight: 20,
              }}
            />
          </TouchableOpacity>

          {/* Calling   section */}

          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`tel:${item.phoneNumbers[0].number}`);
            }}>
            <Image
              source={require('./src/images/call.png')}
              style={{width: 30, height: 30, tintColor: 'green'}}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }}
  ListEmptyComponent={() => (
    <View style={styles.noContactsContainer}>
      <Text style={styles.noContactsText}>No contacts found.</Text>
    </View>
  )}
/>


      {/* contact-data Card end */}

      {/* Dismissable Popup section  */}

      <Modal visible={show} transparent={true} animationType="slide">
        <View style={{backgroundColor: '#000000aa', flex: 1}}>
          <View style={styles.modalView}>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-end',
                marginEnd: 30,
                marginTop: 20,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setShow(false);
                }}>
                <Image
                  source={require('./src/images/cancel.png')}
                  style={{width: 30, height: 30, tintColor: 'red'}}
                />
              </TouchableOpacity>
            </View>

            <Image
              source={require('./src/images/user.png')}
              style={{width: 100, height: 100, marginBottom: 20}}
            />

            <Text style={{fontSize: 20, color: 'black', marginBottom: 8}}>
              {selectedContactName}
            </Text>
            <Text style={{fontSize: 22, marginBottom: 50}}>
              {selectedContactNumber}
            </Text>

            <View style={styles.modalContact}>
              <TouchableOpacity
                onPress={() => {
                  const url = Communications.text(
                    `${0 + selectedContactNumber}`,
                  );
                }}>
                <Image
                  source={require('./src/images/message.png')}
                  style={{width: 50, height: 50, tintColor: 'orange'}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`tel:${0 + selectedContactNumber}`);
                }}>
                <Image
                  source={require('./src/images/call.png')}
                  style={{width: 50, height: 50, tintColor: 'green'}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* dismissiable popup section Over */}
    </SafeAreaView>
  );
}

// Styles of the screen

const styles = StyleSheet.create({
  searchbox: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 18,
  },

  contactCard: {
    width: '100%',
    height: 70,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#daeded',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10,
  },
  modalContact: {
    flexDirection: 'row',
    alignSelf: 'center',
    padding: 10,
    width: '85%',
    height: 70,
    justifyContent: 'space-around',
    borderWidth: 1,
    borderRadius: 8,
  },
  modalView: {
    width: '90%',
    height: 400,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    marginTop: 100,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#daeded',
  },
  textName: {
    fontSize: 17,

    fontWeight: '600',
    color: 'black',
    marginBottom: 3,
  },
  textPhone: {
    fontSize: 14,

    color: 'grey',
  },
  noContactsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  noContactsText: {
    fontSize: 18,
    color: 'grey',
  },
  
});
