export const formatDate = (date, options) => {
  if (!options) {
    options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  }
  
  return new Date(date).toLocaleDateString('en-US', options);
};
