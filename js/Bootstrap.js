// https://github.com/rackerlabs/serverless-demo/blob/master/src/system/auth.js

import AWS from 'aws-sdk';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';

import CONFIG from '../config/index';

/**
 * Encode & parse jwt token
 * @returns {object}
 * @throws {Error}
 */
const parseJwtToken = function (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};

////
// id token cache (page refresh etc);
////

const getUserAttributes = function(cognitoUser){
    return new Promise((resolve, reject) => {
        cognitoUser.getUserAttributes((err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        })
    });
};

const getSession = function(cognitoUser) {
    return new Promise((resolve, reject) => {
        cognitoUser.getSession((err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        })
    });
};

const getCurrentUser = function(userPool) {
    return new Promise((resolve, reject) => {
        const result = userPool.getCurrentUser();

        if (!result) {
            reject(new Error('Login required (no user)'));
            return;
        }
        resolve(result);
    });
};


const getUser = function() {

    // init user pool
    const userPool = new CognitoUserPool({
        UserPoolId: CONFIG.aws.userPoolId,
        ClientId: CONFIG.aws.clientId,
    });

    const cognitoUser = userPool.getCurrentUser();
    if (!cognitoUser) {
        return Promise.reject('Login required (no user)');
    }

   return getSession(cognitoUser)
    .then(session => getUserAttributes(cognitoUser))
    .then(attributes => {
        const username = cognitoUser.username;
        const filtered = attributes.filter(item => item.Name === 'email');
        const email = (filtered.length) ? filtered[0].Value : null;

        return {
            username,
            email,
        };
    });

};

const signOut = function() {
    const userPool = new CognitoUserPool({
        UserPoolId: CONFIG.aws.userPoolId,
        ClientId: CONFIG.aws.clientId,
    });

    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
        cognitoUser.signOut();
    }

    return Promise.resolve(true);
}

export {
    getUser,
    signOut,
};
