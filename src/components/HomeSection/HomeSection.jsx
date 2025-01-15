import React from 'react'
import Marquee from "react-fast-marquee";

export default function HomeSection() {

    const FEEDBACKS = [
        {
            name: "John Doe",
            review:
                "Using this blood donation app has been a life-changing experience. I donated blood for the first time through this platform, and the process was seamless and stress-free. The app provided detailed guidance and connected me to a nearby blood donation center with highly professional staff. Knowing that my donation could save someone's life is deeply fulfilling. I highly recommend this app to anyone considering donating blood—it truly makes a difference.",
            userType: "Donor",
        },
        {
            name: "Jane Smith",
            review:
                "When my friend needed an urgent blood transfusion, this app was a lifesaver. It helped us locate a donor within hours, and the process was incredibly smooth. The app's notifications and updates kept us informed throughout. I've since signed up as a donor myself, and I'm so grateful for this platform that connects people in need with willing donors. This app is a must-have for anyone who wants to make a real impact.",
            userType: "Seeker",
        },
        {
            name: "Alice Johnson",
            review:
                "Donating blood through this app was one of the most rewarding things I've ever done. The app made it so easy to schedule an appointment and find a trusted donation center. The staff at the center were kind and professional, and the process was quick and painless. It's amazing to know that my small act of kindness could save lives. I encourage everyone to join and contribute—it's simple, safe, and impactful.",
            userType: "Donor",
        },
        {
            name: "Bob Brown",
            review:
                "This app has made blood donation incredibly convenient and accessible. As someone who was initially hesitant about donating, the information and support provided by the app gave me the confidence to proceed. The ability to track how my donation has helped others is an amazing feature that keeps me motivated to donate regularly. The platform also has a great community of donors who inspire and encourage one another. Highly recommend it to anyone who wants to make a difference.",
            userType: "Donor",
        },
        {
            name: "Mary Davis",
            review:
                "I recently needed a blood transfusion due to a medical emergency, and this app was a godsend. It quickly connected me with a donor, and the entire process was handled professionally and with great care. The app also provides educational resources about blood health and donation, which I found very informative. I'm so grateful for this platform and the amazing donors who helped me in my time of need. Thank you for making such a difference in people's lives.",
            userType: "Seeker",
        },
        {
            name: "James Wilson",
            review:
                "As a regular blood donor, I've used several platforms, but this app stands out for its ease of use and reliability. Scheduling donations is simple, and the app even reminds me when I'm eligible to donate again. The app's support team is always available to answer questions, and the feedback system ensures continuous improvement. I highly recommend this app to anyone who wants to make their blood donation journey easy and impactful.",
            userType: "Donor",
        },
        {
            name: "Patricia Taylor",
            review:
                "I've used this app both as a donor and as someone helping a friend in need of blood. In both cases, the experience was seamless. The app's user-friendly interface and detailed instructions make it so easy to donate blood or request help. I particularly love the community feature that shares stories of lives saved through donations. It's inspiring to see the difference we can make together. This app is a game-changer for blood donation.",
            userType: "Donor & Seeker",
        },
        {
            name: "Michael Martinez",
            review:
                "The app's group donation drives are fantastic. I joined a workplace blood drive organized through this platform, and it was a wonderful experience. The app made the coordination effortless, and it's rewarding to see how many lives were impacted by our collective efforts. I've also used the app to donate individually and appreciate how it connects donors to those in urgent need. This app is truly a blessing for donors and seekers alike.",
            userType: "Donor",
        },
    ];

    const BLOOD_TYPE_COMPATIBILITY = [
        {
            "type": "A+",
            "canDonateTo": ["AB+", "A+"],
            "canReceiveFrom": ["A+", "A-", "O+", "O-"]
        },
        {
            "type": "A-",
            "canDonateTo": ["A+", "A-", "AB+", "AB-"],
            "canReceiveFrom": ["A-", "O-"]
        },
        {
            "type": "B+",
            "canDonateTo": ["B+", "AB+"],
            "canReceiveFrom": ["B+", "B-", "O+", "O-"]
        },
        {
            "type": "B-",
            "canDonateTo": ["B+", "B-", "AB+", "AB-"],
            "canReceiveFrom": ["B-", "O-"]
        },
        {
            "type": "AB+",
            "canDonateTo": ["AB+"],
            "canReceiveFrom": ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
        },
        {
            "type": "AB-",
            "canDonateTo": ["AB+", "AB-"],
            "canReceiveFrom": ["A-", "B-", "O-", "AB-"]
        },
        {
            "type": "O+",
            "canDonateTo": ["A+", "B+", "O+", "AB+"],
            "canReceiveFrom": ["O+", "O-"]
        },
        {
            "type": "O-",
            "canDonateTo": ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"],
            "canReceiveFrom": ["O-"]
        }
    ];

    /****** Render Functions ******/

    const SECTION_ONE = () => (
        <div className='flex justify-center'>
            <div className='space-y-6 px-8 py-5 sm:max-w-4xl bg-white rounded-md shadow-sm'>
                <div className="text-4xl font-bold text-center">
                    <p>Our Mission</p>
                </div>
                <div>
                    At our core, we are committed to building a world where access to lifesaving blood is seamless and
                    immediate. Our mission is to connect donors with those in need, fostering a network of compassion,
                    care, and community. Through innovative technology and dedicated support, we strive to ensure that
                    every drop counts, saving lives and giving hope to countless families. Together, we can create a
                    healthier and more connected world, one act of kindness at a time.
                </div>
            </div>
        </div>
    )

    const SECTION_TWO = () => (
        <div className='sm:mt-[120px] mt-[100px]'>
            <div className='overflow-x-auto w-full max-w-6xl mx-auto'>
                <p className="text-4xl font-medium text-center text-black pb-6">Blood Type Compatibility</p>
                <table className="table-auto w-full text-left border border-[#A8164D]">
                    <thead>
                        <tr
                            style={{
                                background: "linear-gradient(to right, #B32346, #A8174E, #991747, #6A0B37, #670A37, #610834, #5E0933)",
                            }}
                        >
                            <th className="text-white px-4 py-2">Blood Type</th>
                            <th className="text-white px-4 py-2">Can Donate To</th>
                            <th className="text-white px-4 py-2">Can Receive From</th>
                        </tr>
                    </thead>
                    <tbody>
                        {BLOOD_TYPE_COMPATIBILITY?.map((blood) => (
                            <tr key={blood.type}>
                                <td className="border border-[#A8164D] px-4 py-2 font-semibold">{blood.type}</td>
                                <td className="border border-[#A8164D] px-4 py-2">
                                    {blood.canDonateTo.join(", ")}
                                </td>
                                <td className="border border-[#A8164D] px-4 py-2">
                                    {blood.canReceiveFrom.join(", ")}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const SECTION_THREE = () => (
        <div className="py-10 px-5 mt-[120px] rounded-md"
            style={{
                background: "linear-gradient(to right, #B32346, #A8174E, #991747, #6A0B37, #670A37, #610834, #5E0933)",
            }}>
            <div className="text-4xl font-medium text-center text-white pb-10">
                <p>Smiling Faces</p>
            </div>
            <Marquee pauseOnHover="true" speed={100}>
                <div className="flex overflow-auto w-full">
                    {FEEDBACKS.map((feedback, index) => (
                        <div
                            key={index}
                            className="border-[1px] p-4 min-w-[350px] max-w-[351px] flex flex-col gap-2 bg-secondary rounded-xl text-white hover:bg-transparent hover:text-[#ffcddf] hover:border-[#ffcddf] cursor-default transition mr-4"
                        >
                            <div className="flex flex-row items-center text-2xl gap-2">
                                <h4>{feedback.name}</h4>
                                <p className='text-[16px]'>({feedback.userType})</p>
                            </div>

                            <div>{feedback.review}</div>
                        </div>
                    ))}
                </div>
            </Marquee>
        </div>
    )

    return (
        <div className='px-6 mt-[500px]'>
            {SECTION_ONE()}
            {SECTION_TWO()}
            {SECTION_THREE()}
        </div>
    )
}