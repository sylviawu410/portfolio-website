import React, { useEffect, useState, useRef } from 'react';


const Timeline = ({
    events = [],
}) => {

    return (
        <div className="timeline">
            <div className="w-fit m-auto">
                {events.map((event, index) => (
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-15 justify-center autoShow my-20">
                        <div className=' flex-col '>
                            <div className='text-5xl sm:text-6xl md:text-7xl font-bold mt-2 '>{event.year}</div>
                            <div></div>
                        </div>
                        <div className="w-75/100 md:w-4/10 lg:w-3/10">
                            <p className='text-[#ad5c5c] mb-2'>{event.firm}</p>
                            <h4 className="text-3xl md:text-4xl font-semibold">{event.title}</h4>
                            <p className='mt-7 text-[#baabab]'>{event.content} </p>
                        </div>
                    </div>
                        ))}
            </div>


        </div>

    );
};

export default Timeline;