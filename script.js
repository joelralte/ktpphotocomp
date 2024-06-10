document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let name = document.getElementById('name').value;
    let age = document.getElementById('age').value;
    let image = document.getElementById('image').files[0];
    
    if (image && name && age) {
        let formData = new FormData();
        formData.append('image', image);

        // Replace 'YOUR_IMGUR_CLIENT_ID' with your actual Imgur client ID
        fetch('https://api.imgur.com/3/image', {
            method: 'POST',
            headers: {
                'Authorization': '6d581cce79da5d0'
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                let imageUrl = data.data.link;
                document.getElementById('status').innerHTML = `
                    <p>Image uploaded successfully!</p>
                    <p>Uploader Name: ${name}</p>
                    <p>Uploader Age: ${age}</p>
                    <p>Image URL: <a href="${imageUrl}" target="_blank">${imageUrl}</a></p>
                `;
            } else {
                document.getElementById('status').innerHTML = '<p>Image upload failed!</p>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('status').innerHTML = '<p>An error occurred!</p>'+ error;
        });
    } else {
        document.getElementById('status').innerHTML = '<p>Please fill in all fields and select an image!</p>';
    }
});
