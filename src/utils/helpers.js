import Toastify from 'toastify-js';

const showToast = (message, options = {}) => {
    Toastify({
        text: message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        backgroundColor: '#1B77F2',
        className: 'w3-medium',
        ...options,
    }).showToast();
}

function getBloodGroupText(value) {
    switch (value) {
        case "a_positive":
            return "A+";
        case "a_negative":
            return "A-";
        case "b_positive":
            return "B+";
        case "b_negative":
            return "B-";
        case "ab_positive":
            return "AB+";
        case "ab_negative":
            return "AB-";
        case "o_positive":
            return "O+";
        case "o_negative":
            return "O-";
        default:
            return "Invalid Blood Group";
    }
}

const fetchUserCoordinates = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve({ latitude: latitude.toString(), longitude: longitude.toString() });
                },
                (error) => {
                    console.error("Error fetching coordinates:", error.message);
                    reject(new Error("Unable to fetch location. Please enable location services."));
                }
            );
        } else {
            reject(new Error("Geolocation is not supported by your browser."));
        }
    });
};


export {
    showToast,
    getBloodGroupText,
    fetchUserCoordinates
}