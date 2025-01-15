import { BASE_URL } from "../utils";

async function SeekerDetailsRequest(seekerId) {
    const API_URL = `${BASE_URL}/seeker/${seekerId}`;

    const requestHeaders = new Headers({
        Accept: "*/*",
        "Content-Type": "application/json",
    });

    const options = {
        method: "GET",
        headers: requestHeaders,
    }

    return fetch(API_URL, options);
}

export default SeekerDetailsRequest;