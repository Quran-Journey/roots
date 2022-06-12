import axios from "axios";

// Let's say the server responds with a 200 status code, then we will hit .done
// and the response object passed into the callback will be the response the server sent us.
//
// If the server responds with an error status code (anything 400+), then we will hit .catch
// and the response the server sent us will be inside err.responseJSON

const API_URL = "http://localhost:3001/api";

export async function apiGET(path) {
    return await axios
        .get(API_URL + path)
        .done((res) => {
            console.log(res);
            return res;
        })
        .catch((err) => {
            console.log(err.responseJSON);
            return err.responseJSON;
        });
    // In both cases you will be returning the response from the actual server
    // (which is what you want if the server responds to everything including errors for you)
}
