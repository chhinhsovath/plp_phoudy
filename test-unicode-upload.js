const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios');

async function testUnicodeUpload() {
  try {
    // Create a test file with Unicode filename
    const testContent = 'This is a test audio file with Unicode filename';
    const testFileName = 'ែ.mp3'; // Khmer character
    fs.writeFileSync(testFileName, testContent);

    // Create form data
    const form = new FormData();
    form.append('audio', fs.createReadStream(testFileName), {
      filename: testFileName,
      contentType: 'audio/mpeg'
    });

    // Upload the file
    const response = await axios.post('http://192.168.1.107:8080/api/v1/upload/audio', form, {
      headers: {
        ...form.getHeaders(),
        'Authorization': 'Bearer YOUR_JWT_TOKEN_HERE' // You'll need to add a valid token
      }
    });

    console.log('Upload Response:', JSON.stringify(response.data, null, 2));
    
    // Check if original_name is preserved
    if (response.data.data && response.data.data.original_name === testFileName) {
      console.log('✅ SUCCESS: Unicode filename preserved correctly!');
    } else {
      console.log('❌ FAILED: Unicode filename was corrupted');
      console.log('Expected:', testFileName);
      console.log('Got:', response.data.data?.original_name);
    }

    // Clean up test file
    fs.unlinkSync(testFileName);

  } catch (error) {
    console.error('Error testing Unicode upload:', error.response?.data || error.message);
  }
}

testUnicodeUpload(); 