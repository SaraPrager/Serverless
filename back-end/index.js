exports.handler = async (event) => {

  // a wrapper for JSON.parse method, returns false instead of exception
  function parseJson(obj) {
    try {
        return JSON.parse(obj);
    } catch (e) {
        return false;
    }
  }

  // returns a standard error response
  function formatErrorResponse(msg) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', "Access-Control-Allow-Headers": "*", "Access-Control-Allow-Methods": "*" },
      body: JSON.stringify({ 'err': msg })
    }; 
  }

  // returns a standard valid response
  function formatValidResponse(output) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', "Access-Control-Allow-Headers": "*", "Access-Control-Allow-Methods": "*" },
      body: JSON.stringify({ 'output': output })
    };
  }

  // extracts and validates the input
  const body = event && event.body && parseJson(event.body);
  if (!body) {
    return formatErrorResponse('invalid_request_body_err');
  }
  const input = body.input;
  if (!input) {
    return formatErrorResponse('missing_input_err');
  }
  if (typeof input !== 'string') {
    return formatErrorResponse('invalid_input_err');
  }

  // returns the response
  const output = `Hello ${input}`;
  return formatValidResponse(output);
};