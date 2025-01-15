// Packages
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import FeatherIcon from "feather-icons-react";

// APIs
import { SeekerListRequest } from "@/requests";

// Utils
import { getBloodGroupText, showToast } from "@/utils";
import { useAuth } from "@/context";
import { CircularLoader } from "@/components";

export default function FindSeeker() {

    const Router = useRouter();

    const [seekers, _seekers] = useState([]);
    const [page, _page] = useState(1);
    const [total, _total] = useState(0);
    const [loading, _loading] = useState(false);

    const { userInfo } = useAuth();

    useEffect(() => {
        if (userInfo?.id) {
            getSeekers(page);
        }
    }, [userInfo?.id]);

    useEffect(() => {
        getSeekers(page);
    }, [page]);


    const getSeekers = (pageNo) => {
        _loading(true);
        SeekerListRequest(pageNo, 6, Boolean(userInfo?.id))
            .then((res) => res.json())
            .then((data) => {
                if (data?.data) {
                    _seekers((old) => [...old, ...data.data]);
                    _total(data.total);
                } else throw new Error("Failed to fetch seekers");
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
        if (seekers.length < total) {
            _page((oldPage) => oldPage + 1);
        }
    };

    /****** Render Functions ******/

    const SECTION_ONE = () => (
        <div className="space-y-3">
            {seekers?.map((seeker, index) => (
                <div
                    key={seeker?.id || index}
                    className="px-8 py-5 border border-[#cccc] bg-white rounded-md shadow-sm flex justify-between flex-wrap space-y-2 items-start sm:max-w-5xl mx-auto"
                >
                    <div className="">
                        <p className="text-3xl font-bold">{seeker?.name}</p>
                        <p className="text-lg mt-4">
                            <span className="font-bold">Blood Group :</span>{" "}
                            {getBloodGroupText(seeker?.blood_group)}
                        </p>
                        <p className="text-lg">
                            <span className="font-bold">City :</span>{" "}
                            {seeker?.location?.city}
                        </p>
                        <p className="text-lg">
                            <span className="font-bold">Address :</span>{" "}
                            {seeker?.location?.address}
                        </p>
                        <p className="text-lg">
                            <span className="font-bold">Contact Number :</span>{" "}
                            {seeker?.phone}
                        </p>
                        <p className="text-lg">
                            <span className="font-bold">Required Date :</span>{" "}
                            {seeker?.required_date?.split("T")[0]}
                        </p>
                        <p className="text-lg">
                            <span className="font-bold">Reason :</span>{" "}
                            {seeker?.reason}
                        </p>
                    </div>
                    <div className="space-y-1">
                        <button disabled={!userInfo?.id} className={`${!userInfo?.id ? "cursor-not-allowed" : "cursor-pointer"}`}>
                            <a className="primary-blue-button w3-black hover:opacity-75 transition w3-ripple flex flex-row items-center gap-2" target="_blank" href={`https://www.google.com/maps?q=${seeker?.location?.latitude},${seeker?.location?.longitude}`}>
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
            ) : seekers?.length < total ? (
                <button
                    onClick={loadMore}
                    className="primary-blue-button w3-black hover:opacity-75 transition w3-ripple"
                >
                    Load More
                </button>
            ) : (
                <p>No more seekers to load.</p>
            )}
        </div>
    );

    const NOTE_SECTION = () => (
        <div className="text-center bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-6 sm:max-w-5xl mx-auto" role="alert">
            <span className="font-bold">Note:</span> To see detailed contact information and interact with seekers, please ensure you are logged in.
            If you don't have an account, consider registering to access all features.
        </div>
    );


    return (
        <div className="screen-content">
            {!userInfo?.id && seekers.length > 0 && NOTE_SECTION()}
            {SECTION_ONE()}
            {LOAD_MORE_BUTTON()}
        </div>
    );
}
