// Google Cloud Speech-to-Text with API Key
const speech = require('@google-cloud/speech');
const fs = require('fs');

// Initialize client with API key
const client = new speech.SpeechClient({
  apiKey: 'AIzaSyDSopGzHX9ayACuvSvSwtXceb9w_jS5h7A'
});

async function transcribeAudio(audioFile) {
  try {
    const audioBytes = fs.readFileSync(audioFile).toString('base64');
    const request = { 
      audio: { content: audioBytes }, 
      config: { 
        encoding: 'WEBM_OPUS', // Better for web audio
        sampleRateHertz: 48000, 
        languageCode: 'en-US',
        enableAutomaticPunctuation: true,
        model: 'latest_short' // Optimized for short audio
      } 
    };
    const [response] = await client.recognize(request);
    const transcription = response.results.map(result => result.alternatives[0].transcript).join('\n');
    console.log('🎤 Google Cloud Transcription:', transcription);
    return transcription;
  } catch (error) {
    console.error('❌ Google Speech API Error:', error);
    throw error;
  }
}

module.exports = { transcribeAudio };