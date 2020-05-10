const functions = require('firebase-functions');
const speech = require('@google-cloud/speech');
const admin = require('firebase-admin');
admin.initializeApp();

 exports.transcribe = functions.runWith({timeoutSeconds: 360}).https.onCall((data,context)=>{
    
   const client = new speech.SpeechClient();
   const gcsUri = data.file;
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
    async function time() {

        try{
            const [operation] = await client.longRunningRecognize(request);
            const [response] = await operation.promise();
            const transcription = response.results
                .map(result => result.alternatives[0].transcript)
                .join('\n');
                console.log(transcription)
            return transcription;
        }
        catch (e) {
            return e;
        }
    }
    time().then((transcription)=>{
        return admin.firestore().collection('sermons').doc(data.file).set({text: transcription})
    })
    .catch(()=>{
        return { text: "error" }
    })
   
  
 })
    