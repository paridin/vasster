import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { WebApp } from 'meteor/webapp'

import connectRoute from 'connect-route'

import parse from 'urlencoded-body-parser'
import bodyParser from 'body-parser';

// import { getJson } from './parser'

export const Profiles = new Mongo.Collection('profiles');

Meteor.methods({
    'profiles.insert'({ name, born, gender, phone, bedrooms, bathrooms, hasPets, termsConditionsAccepted }) {
        check(name, String);
        check(born, Date);
        check(gender, String);
        check(phone, String);
        check(bedrooms, Number);
        check(bathrooms, Number);
        check(hasPets, Boolean);
        check(termsConditionsAccepted, Boolean);

 
        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
 
        date = new Date();

        Profiles.insert({
          name: name,
          born: newprofileBornDate,
          gender: newProfileGender,
          phone: newProfilePhone,
          bedrooms: bedrooms,
          bathrooms: bathrooms,
          hasPets: hasPets,
          termsConditionsAccepted: termsConditionsAccepted,
          insertedAt: date,
          updatedAt: date,
          owner: this.userId,
          username: Meteor.users.findOne(this.userId).username,
        });
    },
    'profiles.remove'(profileId) {
        check(profileId, Meteor.Collection.ObjectID);
 
        Profiles.remove(profileId);
    }
});


// -- API
// WebApp.connectHandlers.use("/api", bodyParser.json());

// WebApp.connectHandlers.use('/api/profiles', async (req, res, next) => {
//   const { headers } = req

//   console.info('/hello route - headers\n', headers)

//   // const result = await parse(req).catch(e => {
//   //   console.error('/hello - err catch parsing urlencoded:\n', e)
//   // })

//   console.log(Meteor.users.findOne(this.userId))

//   const response = Profiles.find().fetch();

//   res.writeHead(200)
//   res.end(JSON.stringify(response))
// });


if (Meteor.isServer) {
  WebApp.connectHandlers.use(
    connectRoute(function (router) {
      router.get("/api/profiles",  (req, res, next) => {
    const { headers } = req

    console.info('/hello route - headers\n', headers)

    // const result = await parse(req).catch(e => {
    //   console.error('/hello - err catch parsing urlencoded:\n', e)
    // })

    console.log(Meteor.users.findOne(this.userId))

    const response = Profiles.find().fetch();

    res.writeHead(200)
    res.end(JSON.stringify(response))
  })

  }))
}


/**
 * Additional example using getJson
 *
 * @example
 * // Example using getJson from zeit/micro (renamed from json() there)
 *
 * import { getJson } from './parser'
 *
 * const json = await getJson(req).catch(e => {
 *   console.error('/hello - err catch parsing JSON:\n', e)
 * })
 *
 * console.info('\n\n** getJson parse result:\n', json)
 *
 */