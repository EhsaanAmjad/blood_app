// Packages
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import FeatherIcon from "feather-icons-react";

// APIs
import { DonorListRequest } from "@/requests";

// Utils
import { getBloodGroupText, showToast } from "@/utils";
import { useAuth } from "@/context";
import { CircularLoader } from "@/components";

export default function FindBlood() {

    const Router = useRouter();

    const [donors, _donors] = useState([]);
    const [page, _page] = useState(1);
    const [total, _total] = useState(0);
    const [loading, _loading] = useState(false);

    const { userInfo } = useAuth();

    useEffect(() => {
        if (userInfo?.id) {
            getDonors(page);
        }
    }, [userInfo?.id]);

    useEffect(() => {
        getDonors(page);
    }, [page]);

    const getDonors = (pageNo) => {
        _loading(true);
        DonorListRequest(pageNo, 6, Boolean(userInfo?.id))
            .then((res) => res.json())
            .then((data) => {
                if (data?.data) {
                    _donors((old) => [...old, ...data.data]);
                    _total(data.total);
                } else throw new Error("Failed to fetch donors");
            })
            .catch((err) => {
                showToast(err.message);
                console.error(err);
            })
            .finally(() => {
                _loading(false);
            });
    };

    /****** Handler Functions ******/

    const loadMore = () => {
        if (donors.length < total) {
            _page((oldPage) => oldPage + 1);
        }
    };

    /****** Render Functions ******/

    const SECTION_ONE = () => (
        <div className="space-y-3">
            {donors?.map((donor, index) => (
                <div
                    key={donor?.id || index}
                    className="px-8 py-5 border border-[#cccc] bg-white rounded-md shadow-sm flex justify-between flex-wrap space-y-2 items-start sm:max-w-5xl mx-auto"
                >
                    <div className="">
                        <p className="text-3xl font-bold">{donor?.name}</p>
                        <p className="text-lg mt-4">
                            <span className="font-bold">Blood Group :</span>{" "}
                            {getBloodGroupText(donor?.blood_group)}
                        </p>
                        <p className="text-lg">
                            <span className="font-bold">City :</span>{" "}
                            {donor?.location?.city}
                        </p>
                        <p className="text-lg">
                            <span className="font-bold">Address :</span>{" "}
                            {donor?.location?.address}
                        </p>
                        <p className="text-lg">
                            <span className="font-bold">Contact Number :</span>{" "}
                            {donor?.phone}
                        </p>
                    </div>
                    <div className="space-y-1">
                        <button disabled={!userInfo?.id} className={`${!userInfo?.id ? "cursor-not-allowed" : "cursor-pointer"}`}>
                            <a className="primary-blue-button w3-black hover:opacity-75 transition w3-ripple flex flex-row items-center gap-2" target="_blank" href={`https://www.google.com/maps?q=${donor?.location?.latitude},${donor?.location?.longitude}`}>
                                <FeatherIcon size={22} icon="map-pin" />
                                <p>Location</p>
                            </a>
                        </button>

                        <button disabled={!userInfo?.id} className={`${!userInfo?.id ? "cursor-not-allowed" : "cursor-pointer hover:opacity-75 transition w3-ripple"} primary-blue-button w3-green flex flex-row items-center gap-2`}>
                            <FeatherIcon size={22} icon="message-circle" />
                            <p>Chat Now</p>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

    const LOAD_MORE_BUTTON = () => (
        <div className="text-center mt-5">
            {loading ? (
                <CircularLoader />
            ) : donors?.length < total ? (
                <button
                    onClick={loadMore}
                    className="primary-blue-button w3-black hover:opacity-75 transition w3-ripple"
                >
                    Load More
                </button>
            ) : (
                <p>No more donors to load.</p>
            )}
        </div>
    );

    const NOTE_SECTION = () => (
        <div className="text-center bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-6 sm:max-w-5xl mx-auto" role="alert">
            <span className="font-bold">Note:</span> To see detailed contact information and interact with donors, please ensure you are logged in.
            If you don't have an account, consider registering to access all features.
        </div>
    );


    return (
        <div className="screen-content">
            {!userInfo?.id && donors?.length > 0 && NOTE_SECTION()}
            {SECTION_ONE()}
            {LOAD_MORE_BUTTON()}
        </div>
    );
}
