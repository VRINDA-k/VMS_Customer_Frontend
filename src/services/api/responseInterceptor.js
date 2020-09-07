import { removeStore as removeSession } from "../storage";

export function onResponse(response) {
  const customResponse = response;
  if (
    response.data.status &&
    response.data.status !== 200 &&
    response.data.status !== true
  ) {
    const errorResponse = {
      ...response,
      data: {
        ...response.data,
        error: ["Something went wrong. Please try after some time"],
      },
      status: response.data.status,
    };
    const error = {
      request: errorResponse.request,
      config: errorResponse.config,
      response: errorResponse,
      message: "Something went wrong. Please try after some time",
    };
    return onResponseError(error);
  }
  customResponse.data = response.data.data;
  return customResponse;
}

export function onResponseError(error) {
  const customError = { ...error };
  if (error.response) {
    const status = error.response.headers.status || error.response.status;
    customError.status = status;

    if (status === 401) {
      removeSession();
      window.location.reload("/login");
    }

    if (status === 500) {
      customError.response.data = {
        error: ["Service unavailable. Please try after some time."],
      };
    }

    if (typeof error.response.data !== typeof {}) {
      customError.response.data = {
        error: [`${error.response.statusText}. Check network.`],
      };
    }

    if (status === 400) {
      const errorData = error.response.data.error[0];
      if (typeof errorData === typeof {}) {
        const errors = [{}];
        let key = "";

        error.response.data.error.forEach(({ field, error_message }) => {
          if (!field) {
            field = "__all__";
          }

          key =
            field.toString().length && field.toString() !== "__all__"
              ? field.toString()
              : "GENERAL";
          errors[0][key] = error_message;
        });

        if (Object.keys(errors[0]).length === 1 && key === "GENERAL") {
          errors[0] = errors[0][key];
        }
        customError.response.data.error = errors;
      } else if (typeof errorData === typeof "") {
        customError.errorText = errorData;
      }
    }
  }

  return Promise.reject(customError);
}
