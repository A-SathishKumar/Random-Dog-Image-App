document.addEventListener('DOMContentLoaded', () => {
    const randomDogBtn = document.getElementById('randomDogBtn');
    const breedSelect = document.getElementById('breedSelect');
    const breedDogBtn = document.getElementById('breedDogBtn');
    const dogImage = document.getElementById('dogImage');

    // Fetch and populate breed list
    fetch('https://dog.ceo/api/breeds/list/all')
        .then(response => response.json())
        .then(data => {
            const breeds = data.message;
            for (const breed in breeds) {
                const option = document.createElement('option');
                option.value = breed;
                option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
                breedSelect.appendChild(option);
            }
        })
        .catch(error => console.error('Error fetching breed list:', error));

    // Show random dog image
    randomDogBtn.addEventListener('click', () => {
        fetch('https://dog.ceo/api/breeds/image/random')
            .then(response => response.json())
            .then(data => {
                dogImage.src = data.message;
            })
            .catch(error => console.error('Error fetching random dog image:', error));
    });

    // Show selected breed dog image
    breedDogBtn.addEventListener('click', () => {
        const selectedBreed = breedSelect.value;
        if (selectedBreed) {
            fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random`)
                .then(response => response.json())
                .then(data => {
                    dogImage.src = data.message;
                })
                .catch(error => console.error(`Error fetching image for breed ${selectedBreed}:`, error));
        } else {
            alert('Please select a breed!');
        }
    });
});
