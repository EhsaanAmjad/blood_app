import { BASE_URL } from "../utils";

async function DonorCreateRequest(data) {
    const API_URL = `${BASE_URL}/donor`;

    const requestHeaders = new Headers({
        Accept: "*/*",
        "Content-Type": "application/json",
    });

    const options = {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(data),
        redirect: "follow",
        cache: "no-store",
    };

    return fetch(API_URL, options);
}

export default DonorCreateRequest;
