import React from 'react'

const Contact = () => {
    const handleEmailClick = () => {
        // Define the email details
        const email = 'vuphilong2605@gmail.com'; // Replace with your desired recipient email
        const subject = 'Getting in Touch';

        // Create the mailto link
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}}`;

        // Open the email client
        window.location.href = mailtoLink;
    };
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="w-[400px] rounded-xl shadow-md p-6">
                <div className="bg-orange-400 rounded-t-lg font-mono flex dark:border-x-2 dark:border-t-2 text-white dark:text-black text-xl top-0 left-0 px-6 py-3" role="button" tabIndex={0} aria-disabled="false" aria-roledescription="draggable" aria-describedby="contact">
                    <div className="flex grow flex-row justify-between">
                        contact
                        {/* <button class="font-mono flex items-center justify-center text-white text-xl right-0 dark:text-black
    duration-100 hover:scale-110 active:scale-80 z-10">[x]</button> */}
                        <button>[x]</button>


                    </div></div>
                <div className="flex flex-col items-center bg-white dark:bg-secondary-dark border-2 border-gray-300 dark:border-gray-600 rounded-b-lg shadow-lg p-6 w-full">
                    <div className="text-black w-full h-full flex flex-col items-center p-6 md:p-7 bg-lighter rounded-b-lg"><h2 className="font-mono font-semibold text-xl md:text-2xl mb-3">Mail! Hooray!</h2><p className="text-center text-base">The best way to reach me is by email, I don't often check social media messages</p>
                        <div className="text-center">
                            <img
                                alt="Contact Me"
                                draggable={false}
                                loading="lazy"
                                decoding="async"
                                width="315"
                                height="315"
                                src="/images/contact_me.png"
                            />

                            <button
                                onClick={handleEmailClick}
                                className="text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                                >
                                Let's Get In Touch!
                            </button>
                            <p className="text-gray-600 text-sm">
                                Feel free to reach out if you have any questions, ideas, or just want to connect.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    )
}

export default Contact
