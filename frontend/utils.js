import axios from "axios";

// Let's say the server responds with a 200 status code, then we will hit .done
// and the response object passed into the callback will be the response the server sent us.
//
// If the server responds with an error status code (anything 400+), then we will hit .catch
// and the response the server sent us will be inside err.responseJSON

export const API_URL = "http://localhost:3001";

export async function apiGET(path) {
    console.log(API_URL + "/api" + path);
    return await axios
        .get(API_URL + "/api" + path)
        .then((res) => {
            console.log(res);
            return res;
        })
        .catch((err) => {
            console.log(err.response);
            return err.response;
        });
    // In both cases you will be returning the response from the actual server
    // (which is what you want if the server responds to everything including errors for you)
}

export async function getRoots(setRoots, verse) {
    let v;
    Number.isInteger(verse) ? (v = verse) : (v = verse.index);
    let roots_res = await apiGET(`/verse/${v}/sentences`)
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
    if (roots_res && roots_res.data) {
        setRoots(roots_res.data.data);
    }
}

export async function copy(text) {
    navigator.clipboard.writeText(text);
}
