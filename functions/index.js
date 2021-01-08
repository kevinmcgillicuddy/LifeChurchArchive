const functions = require('firebase-functions');
const speech = require('@google-cloud/speech').v1p1beta1; //beta version needed until stable supports mp3 encoding - https://cloud.google.com/speech-to-text/docs/reference/rest/v1p1beta1/RecognitionConfig#AudioEncoding
const admin = require('firebase-admin');
admin.initializeApp();

exports.transcribe = functions.runWith({
  timeoutSeconds: 360
}).https.onCall((data, context) => {
  
  const client = new speech.SpeechClient();
  const gcsUri = data.file;
  const uuid = data.uuid;
  const encoding = 'MP3'
  const sampleRateHertz = 16000;
  const languageCode = 'en-US';


  
  const config = {
    encoding,
    sampleRateHertz,
    languageCode,
  };
  
  const audio = {
    uri: gcsUri,
  };
  
  const request = {
    config,
    audio
  };

  async function time() {

    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated', 
        'only authenticated users can vote up requests'
      );
    }
    //view 
    const user = admin.firestore().collection('users-list').doc(context.auth.uid)
    user.update({
      textRequests: admin.firestore.FieldValue.increment(1)
    })
    
     let docExists = await admin.firestore().collection('sermons').doc(uuid).get()
      if (!docExists.exists) throw new Error('The UUID exists');
      const [operation] = await client.longRunningRecognize(request);
      const [response] = await operation.promise();
      const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
        return transcription;
}

  time().then((transcription) => {
    return admin.firestore().collection('sermons').doc(uuid).set({
    text: transcription
  },{ merge: true })
})
.catch((err) => {
  console.log('err' + err)
  return {
    text: err
  }
})
 
})