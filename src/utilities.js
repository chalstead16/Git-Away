const helperFunctions = {
  show(element) {
    element.classList.remove('hidden');
  },

  hide(element) {
    element.classList.add('hidden');
  },

  getToday() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    let newToday = `${yyyy}/${mm}/${dd}/`;
    return newToday;
  }
};


export default helperFunctions;
