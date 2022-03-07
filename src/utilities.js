const helperFunctions = {
  show(element) {
    element.classList.remove('hidden');
  },

  hidden(element) {
    element.classList.add('hidden')
  }
};


export default helperFunctions;
