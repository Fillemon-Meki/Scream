import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  ActionSheetIOS,
  Linking,
  Platform,
  Alert,
} from 'react-native';
import * as Contacts from 'expo-contacts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SMS from 'expo-sms';
import _ from 'lodash';

const ContactsScreen = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [showAllContactsModalVisible, setShowAllContactsModalVisible] = useState(false);
  const [error, setError] = useState(null);
  const [loadedSelectedContacts, setLoadedSelectedContacts] = useState([]);

  useEffect(() => {
    loadSelectedContacts();
    fetchAllContacts();
  }, []);

  const loadSelectedContacts = async () => {
    try {
      const savedContacts = await AsyncStorage.getItem('selectedContacts');
      if (savedContacts) {
        setLoadedSelectedContacts(JSON.parse(savedContacts));
      }
    } catch (error) {
      console.log('Error loading selected contacts:', error);
    }
  };

  const saveSelectedContacts = async () => {
    try {
      await AsyncStorage.setItem('selectedContacts', JSON.stringify(selectedContacts));
    } catch (error) {
      console.log('Error saving selected contacts:', error);
    }
  };

  const handleContactSelection = (phoneNumber) => {
    const isContactSelected = selectedContacts.some((contact) => contact.phoneNumber === phoneNumber);

    if (isContactSelected) {
      setSelectedContacts((prevSelectedContacts) =>
        prevSelectedContacts.filter((contact) => contact.phoneNumber !== phoneNumber)
      );
    } else {
      if (selectedContacts.length >= 5) {
        setError('You can only select up to 5 contacts.');
        return;
      }

      setError(null);

      const selectedContact = contacts.find((contact) => contact.phoneNumber === phoneNumber);
      setSelectedContacts((prevSelectedContacts) => [...prevSelectedContacts, selectedContact]);
    }

    setContacts((prevContacts) => prevContacts.filter((contact) => contact.phoneNumber !== phoneNumber));
  };

  const handleDeleteContact = (phoneNumber) => {
    setSelectedContacts((prevSelectedContacts) => prevSelectedContacts.filter((contact) => contact.phoneNumber !== phoneNumber));
    setDeleteModalVisible(false);
    saveSelectedContacts();
  };

  const handleDeleteConfirmation = (phoneNumber) => {
    const contact = selectedContacts.find((contact) => contact.phoneNumber === phoneNumber);
    setSelectedContacts([contact]);
    setDeleteModalVisible(true);
  };

  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
  };

  const handleSendDistressSMS = async (numbers) => {
    if (numbers.length === 0) {
      setError('Please select at least one contact to send the distress SMS.');
      return;
    }

    setError(null);

    const message = 'Help! I am in distress!';

    try {
      const { result } = await SMS.sendSMSAsync(numbers, message);
      if (result) {
        console.log('Distress SMS sent successfully');
      } else {
        setError('Error sending distress SMS. Please try again.');
      }
    } catch (error) {
      setError('Error sending distress SMS. Please try again.');
    }
  };

  const handleContactAction = (phoneNumber) => {
    const options = ['Call', 'Send SMS', 'Cancel'];

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex: options.length - 1,
        },
        (buttonIndex) => {
          switch (buttonIndex) {
            case 0:
              if (phoneNumber) {
                Linking.openURL(`tel:${phoneNumber}`);
              }
              break;
            case 1:
              if (phoneNumber) {
                handleSendDistressSMS([phoneNumber]);
              }
              break;
            default:
              break;
          }
        }
      );
    } else {
      Alert.alert(
        'Contact Action',
        'Choose an action:',
        [
          {
            text: 'Call',
            onPress: () => {
              if (phoneNumber) {
                Linking.openURL(`tel:${phoneNumber}`);
              }
            },
          },
          {
            text: 'Send Distress SMS',
            onPress: () => handleSendDistressSMS([phoneNumber]),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        { cancelable: true }
      );
    }
  };

  const ContactItem = ({ contact }) => {
    const isContactSelected = selectedContacts.some((c) => c.phoneNumber === contact.phoneNumber);

    return (
      <TouchableOpacity
        style={[styles.contactContainer, isContactSelected && styles.selectedContactContainer]}
        onPress={() => handleContactSelection(contact.phoneNumber)}
        onLongPress={() => handleDeleteConfirmation(contact.phoneNumber)}
        onPressOut={() => handleContactAction(contact.phoneNumber)}
      >
        <Text style={styles.contactName}>{contact.name}</Text>
        <Text style={styles.contactNumber}>{contact.phoneNumber}</Text>
      </TouchableOpacity>
    );
  };

  const AllContactsItem = ({ contact }) => {
    const isContactSelected = selectedContacts.some((c) => c.phoneNumber === contact.phoneNumber);

    return (
      <TouchableOpacity
        style={[styles.allContactsItem, isContactSelected && styles.selectedContactContainer]}
        onPress={() => handleContactSelection(contact.phoneNumber)}
      >
        <Text style={styles.allContactsName}>{contact.name}</Text>
        <Text style={styles.allContactsNumber}>{contact.phoneNumber}</Text>
      </TouchableOpacity>
    );
  };

  const fetchAllContacts = async () => {
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        });

        // Filter out contacts without phone numbers
        const formattedContacts = data
          .filter((contact) => contact.phoneNumbers && contact.phoneNumbers.length > 0)
          .map((contact) => ({
            id: contact.id,
            name: contact.name,
            phoneNumber: contact.phoneNumbers[0].number,
          }));

        setContacts(formattedContacts);
      }
    } catch (error) {
      console.log('Error fetching contacts:', error);
    }
  };

  const handleShowAllContacts = async () => {
    try {
      await fetchAllContacts();
      setShowAllContactsModalVisible(true);
    } catch (error) {
      console.log('Error fetching all contacts:', error);
    }
  };

  const chosenContacts = _.take(contacts, 5);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency Contacts</Text>

      {selectedContacts.length === 0 && loadedSelectedContacts.length > 0 ? (
        <FlatList
          data={loadedSelectedContacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ContactItem contact={item} />}
        />
      ) : selectedContacts.length === 0 ? (
        <View style={styles.noContactsContainer}>
          <Text style={styles.noContactsText}>No emergency contacts selected.</Text>
        </View>
      ) : (
        <FlatList
          data={chosenContacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ContactItem contact={item} />}
        />
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal visible={deleteModalVisible} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to delete this contact?</Text>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => handleDeleteContact(selectedContacts[0].phoneNumber)}
              >
                <Text style={styles.modalButtonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleCancelDelete}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.showAllContactsButton} onPress={handleShowAllContacts}>
        <Text style={styles.showAllContactsButtonText}>Show All Contacts</Text>
      </TouchableOpacity>

      <Modal visible={showAllContactsModalVisible} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.allContactsContainer}>
            <Text style={styles.allContactsTitle}>All Contacts</Text>
            <FlatList
              data={contacts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <AllContactsItem contact={item} />}
            />
            <TouchableOpacity style={styles.closeAllContactsButton} onPress={() => setShowAllContactsModalVisible(false)}>
              <Text style={styles.closeAllContactsButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 10,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contactNumber: {
    fontSize: 16,
    color: '#888888',
  },
  // Styles for the delete confirmation modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#E31818',
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedContactContainer: {
    backgroundColor: '#3C71E1',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  // Styles for the show all contacts button
  showAllContactsButton: {
    marginTop: 20,
    backgroundColor: '#3C71E1',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  showAllContactsButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Styles for the pop-up with all contacts
  allContactsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  allContactsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  allContactsItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  allContactsName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  allContactsNumber: {
    fontSize: 16,
    color: '#888888',
  },
  closeAllContactsButton: {
    marginTop: 20,
    backgroundColor: '#E31818',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  closeAllContactsButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noContactsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noContactsText: {
    fontSize: 18,
    color: '#888888',
  },
});

export default ContactsScreen;
