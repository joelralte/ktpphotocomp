

const firebaseConfig = {
    apiKey: "AIzaSyBfludvnfT2Kn5RWEKNoUUkVuEWaeJiF3Q",
    authDomain: "andrew-pachuau.firebaseapp.com",
    databaseURL: "https://andrew-pachuau.firebaseio.com",
    projectId: "andrew-pachuau",
    storageBucket: "andrew-pachuau.appspot.com",
    messagingSenderId: "739333228844",
    appId: "1:739333228844:web:fa21e1a958cebc47ef4489"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const image1 = document.getElementById('image1').files[0];
    const image2 = document.getElementById('image2').files[0];

    // Upload images to Firebase Storage
    const image1Ref = storage.ref('images/' + image1.name);
    const image2Ref = storage.ref('images/' + image2.name);

    try {
        await image1Ref.put(image1);
        await image2Ref.put(image2);

        const imageUrl1 = await image1Ref.getDownloadURL();
        const imageUrl2 = await image2Ref.getDownloadURL();

        // Save data to Firestore
        await db.collection('uploads').add({
            name: name,
            age: age,
            image1Url: imageUrl1,
            image2Url: imageUrl2,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        alert('Upload successful!');
    } catch (error) {
        console.error('Error uploading files:', error);
        alert('Error uploading files: ' + error.message);
    }
});