exports.handler = async (event) => {
    // Ensure rawPath and httpMethod exist
    const path = event.rawPath || event.path || "/";
    const method = event.httpMethod || "UNKNOWN";
 
    let response;
    if (path === "/hello" && method === "GET") {
        response = {
            statusCode: 200,
            body: JSON.stringify({ statusCode: 200, message: "Hello from Lambda" }),
            headers: { "content-type": "application/json" }
        };
    } else {
        response = {
            statusCode: 400,
            body: JSON.stringify({
                statusCode: 400,
                message: "Bad request syntax or unsupported method. Request path: /cmtr-41cac6d3. HTTP method: GET"
            }),
            headers: { "content-type": "application/json" }
        };
    }
 
    return response;
};