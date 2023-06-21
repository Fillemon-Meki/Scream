import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SafetyTips = () => {
  const safetyTips = [
    {
      title: 'Be aware of your surroundings',
      description: 'Pay attention to the people and activities around you. Avoid distractions like using your phone excessively or wearing headphones, as they can make you an easy target.',
      icon: 'eye-outline',
    },
    {
      title: 'Trust your instincts',
      description: 'If something or someone feels suspicious, trust your gut feeling and take necessary precautions. It\'s better to be safe than sorry.',
      icon: 'alert-circle-outline',
    },
    {
      title: 'Stay in well-lit areas',
      description: 'Stick to well-lit streets and avoid poorly lit or isolated areas, especially at night. Visibility is crucial for maintaining awareness and deterring potential robbers.',
      icon: 'sunny-outline',
    },
    {
      title: 'Avoid displaying valuables',
      description: 'Keep expensive jewelry, electronics, or other valuable items hidden from plain sight. Displaying them can attract unwanted attention and make you a target.',
      icon: 'cash-outline',
    },
    {
      title: 'Use secure bags and wallets',
      description: 'Choose bags or backpacks with secure closures, such as zippers or clasps. Keep your wallet or purse close to your body, preferably in a front pocket or a crossbody bag.',
      icon: 'briefcase-outline',
    },
    {
      title: 'Don\'t carry large amounts of cash',
      description: 'Minimize the amount of cash you carry and opt for electronic payment methods whenever possible. If you need to withdraw cash, do so from well-lit and secure ATMs.',
      icon: 'card-outline',
    },
    {
      title: 'Walk confidently and purposefully',
      description: 'Maintain a confident posture while walking, even if you\'re unfamiliar with the area. Walk with purpose, showing that you\'re alert and aware of your surroundings.',
      icon: 'walk-outline',
    },
    {
      title: 'Stay in groups or well-populated areas',
      description: 'Whenever possible, walk with a companion or stay in areas where there are other people around. Robbers are less likely to target individuals in groups.',
      icon: 'people-outline',
    },
    {
      title: 'Keep important contacts handy',
      description: 'Save emergency contact numbers, such as local law enforcement or helplines, on your phone. In case of any suspicious activity or emergency, you can quickly seek assistance.',
      icon: 'call-outline',
    },
    {
      title: 'Trust official sources',
      description: 'Be cautious of strangers offering unsolicited help or information. If you\'re lost or need assistance, approach a trusted authority figure or seek help from official establishments like police stations or information centers.',
      icon: 'information-circle-outline',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Safety Tips</Text>
      {safetyTips.map((tip, index) => (
        <View key={index} style={styles.tipContainer}>
          <View style={styles.iconContainer}>
            <Icon name={tip.icon} size={24} color="#3C71E1" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.tipTitle}>{tip.title}</Text>
            <Text style={styles.tipDescription}>{tip.description}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EDEDEC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3C71E1',
    marginBottom: 8,
  },
  tipDescription: {
    fontSize: 16,
    color: '#888',
  },
});

export default SafetyTips;
