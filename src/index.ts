import express from 'express';
import config from './config';
import roomsRouter from './routes/room'; /* NEW */
import { Twilio } from 'twilio';

// Initialize Twilio client
const getTwilioClient = () => {
  if (!config.TWILIO_ACCOUNT_SID || !config.TWILIO_API_KEY || !config.TWILIO_API_SECRET) {
    throw new Error(`Unable to initialize Twilio client`);
  }
  return new Twilio(config.TWILIO_API_KEY, config.TWILIO_API_SECRET, { accountSid: config.TWILIO_ACCOUNT_SID })
}

export const twilioClient = getTwilioClient();

const app = express();

app.use(express.json());

// Forward requests for the /rooms URI to our rooms router
app.use('/rooms', roomsRouter); /* NEW */

app.listen(5000, () => {
  console.log('Express server listening on port 5000');
});
