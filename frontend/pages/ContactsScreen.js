import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ContactsScreen = () => {
  const [editingContact, setEditingContact] = useState(null); // Track the contact being edited
  const [contacts, setContacts] = useState([
    { id: 1, icon: 'shield', name: 'Police', number: '10 111' },
    { id: 2, icon: 'person', name: 'Michael', number: '081-234-5678' },
    { id: 3, icon: 'person', name: 'Fillemon', number: '081-234-5678' },
    { id: 4, icon: 'person', name: 'Bra G', number: '081-234-5678' },
    { id: 5, icon: 'person', name: 'John', number: '081-234-5678' },
  ]);

  // Function to handle editing the phone number
  const handleEditPhoneNumber = (contactId, newPhoneNumber) => {
    const updatedContacts = contacts.map((contact) => {
      if (contact.id === contactId) {
        return { ...contact, number: newPhoneNumber };
      }
      return contact;
    });

    setContacts(updatedContacts);
    setEditingContact(null); // Clear the editing state
  };

  // Function to handle making a phone call
  const handleCallContact = (phoneNumber) => {
    const url = `tel:${phoneNumber}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        }
        throw new Error('Phone app is not available');
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency Contacts</Text>
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          contact={contact}
          editingContact={editingContact}
          setEditingContact={setEditingContact}
          handleEditPhoneNumber={handleEditPhoneNumber}
          handleCallContact={handleCallContact}
        />
      ))}
    </View>
  );
};

const ContactItem = ({ contact, editingContact, setEditingContact, handleEditPhoneNumber, handleCallContact }) => {
  const { id, icon, name, number } = contact;

  const isEditing = editingContact === id;
  const [editedPhoneNumber, setEditedPhoneNumber] = useState(number);

  const startEditing = () => {
    setEditingContact(id);
    setEditedPhoneNumber(number);
  };

  const cancelEditing = () => {
    setEditingContact(null);
    setEditedPhoneNumber(number);
  };

  const savePhoneNumber = () => {
    handleEditPhoneNumber(id, editedPhoneNumber);
  };

  const callContact = () => {
    handleCallContact(number);
  };

  return (
    <TouchableOpacity style={styles.contactContainer} onPress={startEditing}>
      <View style={styles.iconContainer}>
        <Icon name={icon} size={20} color="#888888" style={styles.icon} />
      </View>
      <View style={styles.contactTextContainer}>
        <Text style={styles.contactName}>{name}</Text>
        {isEditing ? (
          <View style={styles.editContainer}>
            <TextInput
              style={styles.phoneNumberInput}
              value={editedPhoneNumber}
              onChangeText={setEditedPhoneNumber}
            />
            <TouchableOpacity style={styles.saveButton} onPress={savePhoneNumber}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={cancelEditing}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.contactNumber}>{number}</Text>
            <TouchableOpacity style={styles.callButton} onPress={callContact}>
              <Text style={styles.buttonText}>Call</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </TouchableOpacity>
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
  iconContainer: {
    marginRight: 10,
  },
  icon: {
    fontSize: 20,
    color: '#888888',
  },
  contactTextContainer: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactNumber: {
    fontSize: 16,
    color: '#888888',
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  phoneNumberInput: {
    flex: 1,
    height: 30,
    borderWidth: 1,
    borderColor: '#888888',
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  saveButton: {
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#888888',
    borderRadius: 5,
  },
  cancelButton: {
    marginLeft: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#888888',
    borderRadius: 5,
  },
  callButton: {
    marginLeft: 200,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#888888',
    width: 100,
    height: 40,
    borderRadius: 20,
    borderColor: '#3C71E1',
  },
  buttonText: {
    color: '#FFFFFF',
    
  },
});

export default ContactsScreen;
