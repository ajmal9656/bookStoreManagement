const generateISBN = () => {
  return `ISBN-${Date.now()}-${Math.floor(
    Math.random() * 1000
  )}`;
};

export default generateISBN;