const publicURL = (fileName) => {
  return process.env.NODE_ENV === "production"
    ? `/public/${fileName}`
    : `http://localhost:8000/public/${fileName}`;
};

export default publicURL;
