import httpStatus from "http-status";

const DEFAULT_FIELDS = ["id", "createdAt", "updatedAt"];

function respond(res, status, data, code) {
  res.status(code).json({
    status,
    ...data,
  });
}

export function respondWithSuccess(
  res,
  data,
  status = httpStatus.OK,
  nest = true
) {
  if (nest) {
    respond(res, "ok", { data }, status);
  } else {
    respond(res, "ok", data, status);
  }
}

export function respondWithError(
  res,
  data,
  code = httpStatus.INTERNAL_SERVER_ERROR
) {
  respond(res, "error", data, code);
}

export function filterResponse(response, filterSchema) {
  const data =
    typeof response.toJSON === "function" ? response.toJSON() : response;

  const schema = DEFAULT_FIELDS.concat(filterSchema);

  return Object.keys(data).reduce((acc, key) => {
    if (schema.includes(key)) {
      acc[key] = data[key];
    }

    return acc;
  }, {});
}

export function filterResponseAll(arr, schema) {
  return arr.map((data) => {
    return filterResponse(data, schema);
  });
}
