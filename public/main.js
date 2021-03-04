const genreSubmit = (event)=>{
    // prevent default browser submission of form
    // event.preventDefault();

    const values = Array
        .from(document.querySelectorAll('input[type="checkbox"]'))
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);

    const newMovie = {
        genre_id:values
    }
    
        axios.post('/submit-movies', newMovie)
        .then(result=>{
            
            populateMovies();
        })
        .catch(error=>console.log(error));
}

const populateGenres=() =>{
    // Get all genres
    axios.get('/genres')
    .then(results=>{
        const selectList = document.getElementById('filters');
        let count=1;

        results.data.forEach(resultsArray=> {

            let container = document.createElement('div');
            container.className = 'genres-container'
            let newCheckBox = document.createElement('input');
            newCheckBox.type = 'checkbox';
            newCheckBox.id = 'genre-' + count; // need unique Ids!
            newCheckBox.name = 'genre-' + count;
            if(count===1){
                newCheckBox.checked=true
            }
            else {
                newCheckBox.checked=false
            }
            newCheckBox.value = resultsArray.id;

            let newLabel = document.createElement('label');
            newLabel.for = 'genre-' + count;
            const textNode = document.createTextNode(resultsArray.name);

            newLabel.appendChild(textNode);

            container.appendChild(newCheckBox);
            container.appendChild(newLabel);
            selectList.appendChild(container);

            count++;
        });

        let newButton = document.createElement('button');
        newButton.id = 'buttonClicked'
        newButton.type = 'submit'
        const newButtonText = document.createTextNode('Submit');
        newButton.appendChild(newButtonText);
        selectList.appendChild(newButton);
        document.getElementById('buttonClicked').onclick = genreSubmit;
    })
    .catch(error=>{console.log(error)});
}

populateGenres();

const populateMovies=() =>{
    // Get all movies
    axios.get('/movies')
    .then(results=>{
        const selectList = document.getElementById('main-container');

        results.data.forEach(resultsArray=> {
            let container = document.createElement('div');
            container.className = 'image-container'
            let image = document.createElement('img');

            image.src = resultsArray.poster_path;
            container.appendChild(image);
            selectList.appendChild(container);
        });
    })
    .catch(error=>{console.log(error)});
}

populateMovies();