const response = (statusCode, message, datas, res) => {
    res.status(statusCode).json({
      status_code: statusCode,
      message: message,
      datas: datas || [],
    });
  };
  
export default response;
  