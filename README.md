# React Native Contacts App
This is a simple React Native app that allows users to view and search through their contacts list on their mobile devices. The app        utilizes various libraries and plugins to interact with the device's contacts, perform search functionality, and enable communication with the contacts.

# Components
The app consists of the following components:
# 1. App
The main component of the application. It contains the logic for fetching and displaying contacts, handling search functionality, and rendering the UI components.

# 2. ContactCard
A reusable component that represents a single contact card in the list. It displays the contact's name, phone number, and provides options to send a text message or make a phone call to the contact.

# 3. ModalContactDetails
A modal component that appears when a contact card is clicked. It displays the contact's name and phone number in a larger view and provides options to send a text message or make a phone call.

# Libraries and Plugins
The app utilizes the following libraries and plugins:

# 1. React
React is a JavaScript library for building user interfaces. It provides the core functionality for creating reusable UI components and managing the application state.

# 2. React Native
React Native is a framework for building native mobile apps using React. It allows developers to write mobile apps using JavaScript and provides native-like performance and user experience.

# 3. react-native-contacts
The 'react-native-contacts' library provides a set of methods to interact with the device's contacts. It allows fetching and filtering contacts based on certain criteria.

# 4. react-native-permissions
The 'react-native-permissions' library is used to request and manage permissions on the device. In this app, it is used to request permission to access the device's contacts.

# 5. react-native-communications
The 'react-native-communications' library provides methods to initiate phone calls, send text messages, and open email clients. It is used in this app to send text messages and make phone calls to contacts.

# How to clone and run :-
 * Clone the repository:
    * git clone https://github.com/amartya895/contact-app.git
 * Install dependencies:
    * cd contact_app
    * npm install
 * Run the app on a simulator or a physical device:
      *npx react-native run-android
      
* Make sure you have the appropriate development environment set up for running React Native apps on your android platform.

# Conclusion
This React Native Contacts app demonstrates how to fetch and display contacts from a mobile device, perform search functionality, and enable communication with contacts using the available libraries and plugins. Feel free to explore and modify the code to suit your needs!
