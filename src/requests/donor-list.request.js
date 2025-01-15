import { BASE_URL, DEFAULT_NO_OF_LIST_ITEMS } from "../utils";

async function DonorListRequest(pageNo = 1, take = DEFAULT_NO_OF_LIST_ITEMS, isLoggedIn) {
    const API_URL = `${BASE_URL}/donors?page=${pageNo}&limit=${take}&isLoggedIn=${isLoggedIn}`;

    const requestHeaders = new Headers({
        Accept: "*/*",
        "Content-Type": "application/json",
    });

    const options = {
        method: "GET",
        headers: requestHeaders,
        redirect: "follow",
        cache: 'no-store'
    }
    return fetch(API_URL, options);
};

export default DonorListRequest;
