fetch('http://localhost:8082/tracks')
    .then(
        function (response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }


            response.json().then(function (data) {
                console.log(data);
                console.log(data._embedded);
                console.log(data._embedded.artists);
                console.log(data._embedded.artists[0]);

                document.getElementById("main").innerHTML =  `
                ${data._embedded.artists.map(artistTemplate).join('')}
                `     



                        

            });
        }
    )
    .catch(function (err) {
        console.log('Fetch Error :-S', err);
    });


function artistTemplate(artist) {

    return    `
                <div id="test" class ="tracks" tagName="testing">
                <h1>${artist.id}</h1>    
                <h2>${artist.name}</h2>
                <h3>Duration: ${artist.duration}</h3>
                <h4>Lyrics: ${artist.lyrics}</h4>  
                <button onclick="deleteByid(${artist.id})">Delete</button>
                <input type="button" onclick="location.href='track.html?id='+${artist.id};" value="View real" />
                
                       
                </div> 
                `
                
}


function deleteByid(id){
    fetch("http://localhost:8082/tracks/"+id, {
        method: 'delete',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
      })
      
      
    }
    
    var nametrack = document.querySelector('#Name');
    var duration = document.querySelector('#Duration');
    var lyrics = document.querySelector('#Lyrics');
    var albumid = document.querySelector('#albumid');
    var genreid = document.querySelector('#genreid');
    var playlistid = document.querySelector('#playlistid');


    document.getElementById("create").onclick = function() {myFunction()};

    function myFunction() {

    
        let data = {
            "name" :  nametrack.value,
            "duration": duration.value,
            "lyrics": lyrics.value,
            "album": {
                "id": albumid.value
            }
        }
             
          console.log("Data to post",data)         
            console.log("Data to post",data)
            sendData(data)
            
  
      }

      function sendData(data){
        fetch("http://localhost:8082/tracks", {
            method: 'post',
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            },
            body:JSON.stringify(data)
          })
          .then(function (data) {
            console.log('Request succeeded with JSON response', data);
          })
          .catch(function (error) {
            console.log('Request failed', error);
          });
          location.reload()
        }

