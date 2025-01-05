const errorMessage2 = {
  pageMessage: "The page was not found. Check your spelling or link and try again.",
}

const errorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).render('404', errorMessage2);
  } else {
    res.status(500).json({ msg: 'Ooops, something went wrong! 500 Internal Server Error.' });
  }
};

export default errorHandler;