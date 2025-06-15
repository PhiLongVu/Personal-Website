import React from 'react'
import Blob from '../models/Blobs';

const HomePageGallery = () => {
    const generateRandomBlobs = (num = 5) => {
        return Array.from({ length: num }, (_, i) => {
            const cx = `${Math.floor(Math.random() * 200)}%`; // 0% to 100% for 100px width
            const cy = `${Math.floor(Math.random() * 90)}%`; // 0% to 100% for full height
            const r = Math.floor(Math.random() * 5) + 5; // 5 to 10 for smaller blobs
            const delay = i; // 0 to 4.5s for 10 blobs
            console.log(`Creating blob ${i + 1}: cx=${cx}, cy=${cy}, r=${r}, delay=${delay}`);
            return { id: i + 1, cx, cy, r, delay };
        });
    };

    const blobs = generateRandomBlobs(300); // 10 blobs
    const word = "Lorem Ipsum"; // Replace this with your word

    const words = Array(8).fill(word); // Create an array with 8 identical words
    const lShapePath = `
 M0,0 L300,700 L0,1000 Z
  `;
    ;
    ;
    return (
        <div className="relative w-full h-[80vh] bg-zinc-950 overflow-hidden">
            <div className="absolute top-100 left-150 w-50 h-12 z-10 bg-black">
                {/* Background Layer 1 */}
                <div className="absolute top-[-20px] left-0 right-0 h-0.5 w-[120%] bg-black z-0" />

                {/* Background Layer 2 */}
                <div className="absolute top-10 left-[-5px] right-[-5px] h-6 bg-white z-[-1]" />

                {/* Background Layer 2 */}
                <div className="absolute top-10 left-0 right-0 h-3 bg-black" />

                <div className="relative z-20 flex items-center justify-center h-full">

                </div>
            </div>
            <div className="absolute top-20 left-60 w-full h-16 z-10">
                <img
                    src="/images/bird.png"
                    className="w-150 h-auto"
                    alt="bird"
                />
            </div>
            <div className="relative flex h-full">
                {/* Black Bar */}
                <div className="w-[300px] bg-zinc-950 relative overflow-hidden">
                    <div className="wrapper">
                        {words.map((item, index) => (
                            <div
                                key={index}
                                className={`item item${index + 1} flex items-center justify-center text-zinc-600 text-xl sm:text-2xl md:text-3xl lg:text-4xl no-wrap-text`}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                    {/* Optional: duplicate the items for continuous loop */}
                </div>


                {/* Image Container */}
                <div className="relative flex-1 h-full flex justify-center items-center overflow-hidden">
                    <img
                        src="/images/maiden.png"
                        className="max-h-none"
                        alt="Maiden"
                    />
                    {/* Black overlay div */}
                    <div className="absolute top-0 left-0 w-full h-16 bg-zinc-950" />                 </div>
                {/* Textured animated blob mask */}
                <div className="absolute top-0 left-[300px] w-[500px] h-full">
                    <svg className="blob-mask w-full h-full">
                        <defs>
                            <mask id="blob-mask">
                                <path d={lShapePath} fill="white" />
                                {blobs.map(blob => (
                                    <Blob
                                        key={blob.id}
                                        {...blob}
                                    />
                                ))}
                            </mask>

                        </defs>

                        <path d={lShapePath} mask="url(#blob-mask)" className='fill-zinc-950 shadow-md shadow-black' />
                    </svg>

                </div>
            </div>
        </div>
    );
}


export default HomePageGallery

// Background image fills parent and scales


// {/* Black overlay block */}
// <div className="absolute top-0 left-0 w-[200px] h-full bg-black" />

