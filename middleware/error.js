const errorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json({ msg: err.message });
  } else {
    res.status(500).json({ msg: 'Ooops, something went wrong! 500 Internal Server Error.' });
  }
};

export default errorHandler;