const fetchData = (extension) => {
  return fetch(`http://localhost:3001/api/v1/${extension}`)
    .then(response => response.json())
    .catch(err => console.log(err));
};

const postData = (extension, data) => {
  return fetch(`http://localhost:3001/api/v1/${extension}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .catch(err => console.log(err));
}

export {fetchData, postData};
