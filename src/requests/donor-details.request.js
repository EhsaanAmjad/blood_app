import { BASE_URL } from "../utils";

async function DonorDetailsRequest(donorId) {
    const API_URL = `${BASE_URL}/donor/${donorId}`;

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

export default DonorDetailsRequest;
