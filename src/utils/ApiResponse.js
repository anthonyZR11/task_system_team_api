class ApiResponse {
  static authSuccess({
    res,
    user,
    token,
    expiresIn
  }) {
    return res.status(200).json({
      success: true,
      data: {
        user,
        token,
        expiresIn
      },
      timestamp: new Date().toISOString(),
    });
  }

  static success({
    res,
    data = null,
    message = "get data success",
    meta = {},
  }) {
    return res.status(200).json({
      success: true,
      message,
      data,
      meta,
      timestamp: new Date().toISOString(),
    });
  }

  static badRequest({
    res,
    data = null,
    code = "VALIDATION_ERROR",
    message = "Bad request",
    details = [],
  }) {
    return res.status(400).json({
      success: false,
      data,
      error: {
        code,
        message,
        details,
      },
    });
  }
  static unauthorized({
    res,
    message = "Unauthorized",
  }) {
    return res.status(401).json({
      success: false,
      error: {
        code: "AUTH_ERROR",
        message,
      },
    });
  }
}
export default ApiResponse;
