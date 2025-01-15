import { BASE_URL } from "../utils";

async function DonorUpdateRequest(donorId, data) {
    const API_URL = `${BASE_URL}/donor/${donorId}`;

    const requestHeaders = new Headers({
        Accept: "*/*",
        "Content-Type": "application/json",
    });

    const options = {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: requestHeaders,
        redirect: "follow",
        cache: 'no-store'
    }
    return fetch(API_URL, options);
};

export default DonorUpdateRequest;
