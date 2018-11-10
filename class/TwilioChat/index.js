
const TWILIO_Config = require('./config');
const twilio = require('twilio');

class TwilioChat {
    constructor() {
        this.twilioConfig = new TWILIO_Config();
        this.AccessToken = twilio.jwt.AccessToken;
        this.IpMessagingGrant = this.AccessToken.ChatGrant;
    }

    generateToken(identity, deviceId) {
        const appName = 'TwilioChat';

        // Create a unique ID for the client on their current device
        const endpointId = appName + ':' + identity + ':' + deviceId;

        // Create a "grant" which enables a client to use IPM as a given user,
        // on a given device
        const ipmGrant = new this.IpMessagingGrant({
            serviceSid: this.twilioConfig.TWILIO_IPM_SERVICE_SID,
            endpointId: endpointId,
        });

        // Create an access token which we will sign and return to the client,
        // containing the grant we just created
        const token = new this.AccessToken(
            this.twilioConfig.TWILIO_ACCOUNT_SID,
            this.twilioConfig.TWILIO_API_KEY,
            this.twilioConfig.TWILIO_API_SECRET
        );

        token.addGrant(ipmGrant);
        token.identity = identity;

        return token;
    }
}

module.exports = TwilioChat;