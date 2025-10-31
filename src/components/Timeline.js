import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import throttle from "lodash.throttle";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, Draggable);
}

const Timeline = () => {
    const trackRef = useRef(null);
    const navLinksRef = useRef([]);
    const sectionRefs = useRef([]);
    const scrollContainerRef = useRef(null);
    const timelineWrapperRef = useRef(null);

    useEffect(() => {
        if (!trackRef.current || navLinksRef.current.length === 0) return;

        const track = trackRef.current;
        const navLinks = navLinksRef.current;
        const sections = sectionRefs.current;
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

        const lastItemWidth = () => navLinks[navLinks.length - 1].offsetWidth;
        const getUseableHeight = () => {
            if (!timelineWrapperRef.current) return 0;
            return timelineWrapperRef.current.offsetHeight - window.innerHeight;
        };
        const getDraggableWidth = () =>
            track.offsetWidth * 0.5 - lastItemWidth();

        const updatePosition = () => {
            const left = track.getBoundingClientRect().left * -1;
            const width = getDraggableWidth();
            const useableHeight = getUseableHeight();
            const y = gsap.utils.mapRange(0, width, 0, useableHeight, left);
            st.scroll(y);
        };

        const tl = gsap.timeline().to(track, {
            x: () => getDraggableWidth() * -1,
            ease: "none",
        });

        //scroll trigger for animation
        const st = ScrollTrigger.create({
            animation: tl,
            scrub: 0,
            trigger: timelineWrapperRef.current,
            start: "top top",
            end: () => {
                if (!timelineWrapperRef.current) return 0;
                return timelineWrapperRef.current.offsetHeight;
            },
            });

        //a new ScrollTrigger instance specifically for toggling the visibility of the timeline (nav) 
        ScrollTrigger.create({
            trigger: timelineWrapperRef.current,
            start: "top center",   // when the top of the timeline hits center of viewport
            end: "bottom center",  // until the bottom of the timeline hits center
            toggleClass: {
                targets: document.body,
                className: "timeline--active",
            },
        });


        Draggable.create(track, {
            type: "x",
            inertia: true,
            bounds: {
                minX: 0,
                maxX: getDraggableWidth() * -1,
            },
            edgeResistance: 1,
            onDragStart: () => st.disable(),
            onDragEnd: () => st.enable(),
            onDrag: updatePosition,
            onThrowUpdate: updatePosition,
        });

        // Section animations
        if (!prefersReducedMotion.matches) {
            sections.forEach((section, index) => {
                const heading = section.querySelector("h2");
                const image = section.querySelector(".section__image");

                gsap.set(heading, { opacity: 0, y: 50 });
                gsap.set(image, { opacity: 0, rotateY: 15 });

                const sectionTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top center",
                        end: () => `+=${window.innerHeight}`,
                        toggleActions: "play reverse play reverse",
                    },
                });

                sectionTl
                    .to(image, {
                        opacity: 1,
                        rotateY: -5,
                        duration: 6,
                        ease: "elastic",
                    })
                    .to(
                        heading,
                        { opacity: 1, y: 0, duration: 2 },
                        0.5
                    );

                gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top 20px",
                        end: "bottom top",
                        toggleActions: "play none play reverse",
                        onToggle: ({ isActive }) => {
                            const sectionLink = navLinks[index];
                            if (isActive) {
                                sectionLink.classList.add("is-active");
                            } else {
                                sectionLink.classList.remove("is-active");
                            }
                        },
                    },
                });
            });
        }

        // Keyboard navigation
        // track.addEventListener("keyup", (e) => {
        //     const id = e.target.getAttribute("href");
        //     if (!id || e.key !== "Tab") return;
        //     const section = document.querySelector(id);
        //     const y = section.getBoundingClientRect().top + window.scrollY;
        //     st.scroll(y);
        // });

        
    }, []);

    const years = ["2023", "2024", "2025"];
    const events = [
        { id: "event1", year: "2023", title: "Internship at ABC Corp" },
        { id: "event2", year: "2023", title: "Freelance Project" },
        { id: "event3", year: "2024", title: "Graduation" },
        { id: "event4", year: "2024", title: "Joined XYZ Ltd." },
        { id: "event5", year: "2025", title: "Promotion to Lead Developer" },
    ];

    return (
        <div className="timeline" ref={timelineWrapperRef}>
            <nav>
                <div className="marker" />
                <div className="nav__track" ref={trackRef}>
                    <ul className="nav__list">
                        {events.map((event, index) => (
                            <li key={event.id}>
                                <a
                                    href={`#${event.id}`}
                                    className="nav__link"
                                    data-link
                                    ref={(el) => (navLinksRef.current[index] = el)}
                                >
                                    <span>{event.year}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            <main>
                {events.map((event, index) => (
                    <section
                        key={event.id}
                        id={event.id}
                        style={{ "--i": index }}
                        ref={(el) => (sectionRefs.current[index] = el)}
                    >
                        <div className="container">
                            <h2 className="section__heading">
                                <span>{event.year}</span>
                                <span>{event.title}</span>
                            </h2>
                            <div className="section__image">
                                <img
                                    src={`https://via.placeholder.com/1200x800?text=${event.title}`}
                                    alt={event.title}
                                />
                            </div>
                        </div>
                    </section>
                ))}
            </main>
        </div>
    );
};

export default Timeline;