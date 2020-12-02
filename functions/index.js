const functions = require('firebase-functions');
const speech = require('@google-cloud/speech');
const admin = require('firebase-admin');
admin.initializeApp();

exports.transcribe = functions.runWith({
  timeoutSeconds: 360
}).https.onCall(async (data, context) => {

  const client = new speech.SpeechClient();
  const gcsUri = data.file;
  const contentType = data.contentType;
  const uuid = String(data.uuid);
  const encoding = 'mp3';
  const sampleRateHertz = 16000;
  const languageCode = 'en-US';
  const config = {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
  };
  const audio = {
    uri: gcsUri,
  };
  const request = {
    config: config,
    audio: audio,
  };


  try {
    if (contentType !== 'audio/mpeg') { throw new Error("Non audio file")};
    let document = await admin.firestore().collection('sermons').doc(uuid).get();
    if (document !== null || document.exists) { throw new Error("Doc exists")};
    const [operation] = await client.longRunningRecognize(request);
    const [response] = await operation.promise();
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    await admin.firestore().collection('sermons').doc(uuid).set({ text: transcription })
    console.log('success');
    return 'success';
  } 
  catch (err) {
    console.log(err);
    return err;
  }
})


