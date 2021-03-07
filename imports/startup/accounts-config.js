import { Accounts } from 'meteor/accounts-base';


Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

if (Meteor.isServer) {
  Accounts.config({ oauthSecretKey: '/7STG2O3VsMVMNTPeBTn0Q==' });
}