import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Typewriter from '@/components/Typewriter';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, Draggable, ScrollToPlugin);
}

const Project = (
    {
        projects = []
    }) => {
    const trackRef = useRef(null);
    const navLinksRef = useRef([]);
    const sectionRefs = useRef([]);
    const projectWrapperRef = useRef(null);
    const navRef = useRef(null);

    useEffect(() => {
        if (!trackRef.current || navLinksRef.current.length === 0) return;

        const track = trackRef.current;
        const navLinks = navLinksRef.current;
        const sections = sectionRefs.current;
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

        const lastItemWidth = () => navLinks[navLinks.length - 1].offsetWidth;

        const getDraggableWidth = () =>
            track.offsetWidth * 0.5 - lastItemWidth();

        const getScrollHeight = () => {
            const projectHeight = projectWrapperRef.current.offsetHeight;
            return projectHeight;
        };

        const updatePosition = () => {
            const left = track.getBoundingClientRect().left * -1;
            const width = getDraggableWidth();
            const scrollHeight = getScrollHeight();

            const projectTop = projectWrapperRef.current.offsetTop;
            const scrollY = gsap.utils.mapRange(0, width, 0, scrollHeight, left);

            window.scrollTo({
                top: projectTop + scrollY,
                behavior: 'instant'
            });
        };

        // Creates the actual horizontal movement animation (Moves the project track from left to right as you scroll)
        const tl = gsap.timeline().to(track, {
            x: () => getDraggableWidth() * -1,
            ease: "none", //linear movement (no acceleration/deceleration)
        });

        // Main ScrollTrigger for project animation
        const st = ScrollTrigger.create({
            animation: tl,
            scrub: 0.5,
            trigger: projectWrapperRef.current,
            start: "top top",
            end: () => `+=${getScrollHeight()}`,
            pin: false,
        });

        // ScrollTrigger for showing/hiding project nav
        // Links the horizontal project movement to vertical page scrolling
        ScrollTrigger.create({
            trigger: projectWrapperRef.current,
            start: "top top",
            end: "bottom top",
            onEnter: () => {
                document.body.classList.add("project--active");
            },
            onLeave: () => {
                document.body.classList.remove("project--active");
            },
            onEnterBack: () => {
                document.body.classList.add("project--active");
            },
            onLeaveBack: () => {
                document.body.classList.remove("project--active");
            },
        });

        // Draggable setup
        const draggableInstance = Draggable.create(track, {
            type: "x",
            inertia: true,
            bounds: {
                minX: 0,
                maxX: getDraggableWidth() * -1,
            },
            edgeResistance: 1,
            onDragStart: () => {
                st.disable();
            },
            onDragEnd: () => {
                st.enable();
            },
            onDrag: updatePosition,
            onThrowUpdate: updatePosition,
        });

        // Section animations
        if (!prefersReducedMotion.matches) {
            sections.forEach((section, index) => {
                const heading = section.querySelector("h2");
                const image = section.querySelector(".section__image");

                if (heading && image) {
                    //Initially hides headings and images (opacity: 0)
                    gsap.set(heading, { opacity: 0, y: 50 });
                    gsap.set(image, { opacity: 0, rotateY: 15 });

                    //When each section enters the viewport, animates them in
                    const sectionTl = gsap.timeline({
                        scrollTrigger: {
                            trigger: section,
                            start: "top center",
                            end: () => `+=${window.innerHeight}`,
                            toggleActions: "play reverse play reverse",
                        },
                    });

                    //Image gets a 3D rotation effect with elastic easing (bouncy)
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
                }

                // Active link highlighting (Monitors when each section enters/leaves the viewport center)
                ScrollTrigger.create({
                    trigger: section,
                    start: "top center",
                    end: "bottom center",
                    onEnter: () => navLinks[index]?.classList.add("is-active"),
                    onLeave: () => navLinks[index]?.classList.remove("is-active"),
                    onEnterBack: () => navLinks[index]?.classList.add("is-active"),
                    onLeaveBack: () => navLinks[index]?.classList.remove("is-active"),
                });
            });
        }

        // Click navigation for project links
        navLinks.forEach((link, index) => {
            const handleClick = (e) => {
                e.preventDefault();
                const section = sections[index];
                if (section) {
                    const targetY = section.offsetTop;
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: targetY,
                        ease: "power2.inOut"
                    });
                }
            };

            link.addEventListener("click", handleClick);
        });

        // Cleanup
        return () => {
            st.kill();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            if (draggableInstance && draggableInstance[0]) {
                draggableInstance[0].kill();
            }
        };
    }, []);

    return (
        <>
            <nav className="project-nav" ref={navRef}>
                <div className="marker" />
                <div className="nav__track" ref={trackRef}>
                    <ul className="nav__list">
                        {projects.map((project, index) => (
                            <li key={project.id}>
                                <a
                                    href={`#${project.id}`}
                                    className="nav__link"
                                    data-link
                                    ref={(el) => (navLinksRef.current[index] = el)}
                                >
                                    <span>{project.year}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            <div className="project" ref={projectWrapperRef}>
                <main>
                    {projects.map((project, index) => (
                        <section
                            key={project.id}
                            id={project.id}
                            style={{ backgroundImage: `url(/${project.id}.png)` }}
                            ref={(el) => (sectionRefs.current[index] = el)}
                        >
                            <div className="container text-black bg-[#ce3635]">
                                {/* <p className="font-bold text-xl text-white autoShow">{project.year}</p> */}
                                <h4 className="text-3xl text-white text-center font-bold text-3xl md:text-7xl sm:text-4xl">
                                    <Typewriter
                                        phrases={[project.title]}
                                        typewriterStyle="bg-[#ce3635] "
                                        isBlinking={false}
                                    /></h4>
                            </div>
                        </section>
                    ))}
                </main>
            </div>
        </>
    );
};

export default Project;