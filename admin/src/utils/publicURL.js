const publicURL = (fileName) => {
  return process.env.NODE_ENV === "production"
    // ? `/api/public/${fileName}`
    // : `http://localhost:8000/api/public/${fileName}`;
    ? `/public/${fileName}`
    : `http://localhost:8000/public/${fileName}`;
};

export default publicURL;
