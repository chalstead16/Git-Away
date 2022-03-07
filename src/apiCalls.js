const fetchData = (extension) => {
  return fetch(`http://localhost:3001/api/v1/${extension}`)
    .then(response => response.json())
    .catch(err => console.log(err));
};

const postData = (data) => {
  return fetch('http://localhost:3001/api/v1/trips', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  })
  .then(response => {
    if(!response.ok) {
      throw new Error ('Please fill out fields in the form.')
    } else {
      alert ('Your request has been recieved! Please wait for the agent to approve.')
      return response.json()
    }
  })
};

export {fetchData, postData};
