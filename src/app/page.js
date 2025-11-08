"use client"
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Typewriter from '@/components/Typewriter';
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";


export default function Home() {

  const projectEvents = [
    { id: "event1", year: "2023", title: "E-Commerce Website Project" },
    { id: "event2", year: "2024", title: "FYP - Integrating Digital Identities with Blockchain Technology" },
    { id: "event3", year: "2025", title: "Magazine Website" },
    { id: "event4", year: "2025", title: "Joined FDM Group" },
    { id: "event5", year: "2025", title: "Coming Soon" },
  ]

  const timelineEvents = [
    { id: "1", year: "2023", firm: "Firm A", title: "IT Trainee Intern", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
    { id: "2", year: "2024", firm: "Firm B", title: "Frontend Engineer Intern", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
    { id: "3", year: "2025", firm: "The Chinese University of Hong Kong", title: "Graduate", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation" },
    { id: "4", year: "2025", firm: "ABC Group", title: "Developer", content: "until now" },
  ]

  return (
    <div className="">
      <nav className="flex justify-between items-center py-12">
        <svg className="ml-15" xmlns="http://www.w3.org/2000/svg" width="33" height="34" viewBox="0 0 33 34" fill="none">
          <path d="M9.98721 33.9511C7.95369 33.9511 6.16616 33.6739 4.62462 33.1194C3.11588 32.5324 1.57434 31.7659 0 30.8201C0.196792 29.5808 0.311588 28.3415 0.344387 27.1022C0.409984 25.8628 0.442783 24.7866 0.442783 23.8734C0.803569 23.7755 1.22995 23.7103 1.72193 23.6777C2.21391 23.6125 2.6731 23.5799 3.09948 23.5799C3.19788 25.2432 3.49306 26.6782 3.98505 27.8849C4.50983 29.059 5.31339 29.9722 6.39575 30.6245C7.51091 31.2767 8.93765 31.6029 10.676 31.6029C12.9391 31.6029 14.5462 31.1137 15.4974 30.1353C16.4814 29.1242 16.9733 27.9175 16.9733 26.5151C16.9733 25.0801 16.5798 23.906 15.7926 22.9928C15.0054 22.047 13.9887 21.248 12.7423 20.5957C11.496 19.9434 10.1676 19.3074 8.75726 18.6878C7.37971 18.0681 6.06776 17.3506 4.82141 16.5353C3.57506 15.7199 2.5583 14.7089 1.77113 13.5022C0.983962 12.2628 0.590377 10.6974 0.590377 8.80576C0.590377 6.97938 0.983962 5.41391 1.77113 4.10935C2.5911 2.77218 3.73906 1.76115 5.215 1.07626C6.69094 0.358753 8.44567 0 10.4792 0C11.6271 0 12.7095 0.0978424 13.7263 0.293527C14.7758 0.48921 15.727 0.750121 16.5798 1.07626C17.4325 1.4024 18.1377 1.76115 18.6953 2.15252C18.6953 3.09832 18.7117 4.19089 18.7445 5.43022C18.7773 6.66955 18.8593 7.7295 18.9905 8.61007C18.6297 8.74053 18.1869 8.85468 17.6621 8.95252C17.1701 9.01775 16.6946 9.05036 16.2354 9.05036C15.9074 7.15875 15.481 5.72374 14.9562 4.74533C14.4314 3.76691 13.7919 3.09832 13.0375 2.73957C12.2831 2.3482 11.414 2.15252 10.43 2.15252C8.69166 2.15252 7.33052 2.5765 6.34655 3.42446C5.36259 4.27242 4.87061 5.46283 4.87061 6.99568C4.87061 8.4307 5.2642 9.62111 6.05137 10.5669C6.83853 11.5127 7.8553 12.3281 9.10165 13.013C10.348 13.6978 11.6599 14.3664 13.0375 15.0187C14.415 15.6384 15.727 16.3559 16.9733 17.1712C18.2197 17.954 19.2365 18.9324 20.0236 20.1065C20.8108 21.2806 21.2044 22.7645 21.2044 24.5583C21.2044 26.189 20.8108 27.7218 20.0236 29.1568C19.2365 30.5918 18.0229 31.7496 16.383 32.6302C14.743 33.5108 12.6111 33.9511 9.98721 33.9511Z" fill="white" />
          <path d="M29.5069 34C28.4574 34 27.6374 33.7065 27.047 33.1194C26.4567 32.5324 26.1615 31.7823 26.1615 30.8691C26.1615 29.9559 26.4895 29.1731 27.1454 28.5209C27.8342 27.8686 28.7034 27.5424 29.7529 27.5424C30.7697 27.5424 31.5569 27.8849 32.1144 28.5698C32.7048 29.2221 33 29.8907 33 30.5755C33 31.7496 32.6392 32.6139 31.9176 33.1683C31.2289 33.7228 30.4253 34 29.5069 34Z" fill="white" />
        </svg>
        <div className="flex gap-10 mr-20 uppercase">
          <span>About</span>
          <span>Portfolio</span>
          <span>Contact</span>
        </div>
      </nav>
      <main className="flex flex-col gap-[100px] row-start-2 items-center sm:items-start">
        <section className="relative h-[750px] w-full overflow-hidden">
          <div className="absolute inset-0 z-0">
            <p className="w-[30%] leading-[1.2] absolute left-10 top-15 sm:left-25 sm:top-15 z-10 font-medium sm:font-normal">I create high-quality digital solutions, with experience working with startups and enterprise web applications.</p>
            <img src="intro_bg1.png" className="absolute right-0 top-0 w-100 "></img>
            <img src="intro_bg2.png" className="absolute left-0 bottom-0 w-100"></img>
            <div className="bg-white text-black w-auto p-1.5 z-10 absolute font-semibold text-[28px] right-30 bottom-10">Hi, I am Sylvia</div>
          </div>
          <div className="absolute inset-0 flex items-center jusity-center z-10">
            <h1 id="project-protfolio" className=" z-10 leading-[0.7] text-8xl ml-10">Project Portfolio</h1>
          </div>
        </section>

        <section className="h-full py-90 sm:pt-80 w-full gap-80 md:gap-100 flex flex-col ">
          <div className=" text-center font-bold text-3xl md:text-7xl sm:text-4xl pb-30 mx-auto">
            <Typewriter
              phrases={["Welcome to my portfolio", "I build apps", "I love design", "Scroll down for more"]}
              observe={true}
              typewriterStyle="bg-[#ce3635] "
            />
          </div>
          <div >
            <div className="w-[70%] lg:w-[30%] sm:w-[60%] gap-10 flex flex-col m-auto">
              <p className="autoShow" >Hi! I am a recent graduate from The Chinese University of Hong Kong, where I majored in Systems Engineering and Engineering Management.</p>
              <p className="autoShow">I'm a motivated developer passionate about building clean and user-focused web applications. With practical experience in the IT industry, I bring a collaborative mindset and a strong desire to keep learning. </p>
              <p className="autoShow">I'm currently seeking full-time opportunities to grow and contribute as a web developer.</p>
            </div>
          </div>

          <div className="">
            <h3 className="text-3xl m-auto pt-20 pb-50 text-center ">
              <Typewriter
                phrases={["Timeline"]}
                isBlinking={false}
              />
            </h3>
            <Timeline
              events={timelineEvents}
            />

          </div>

        </section>
        <section className="flex flex-col gap-80 md:gap-90 m-auto">
          <h3 className="text-3xl m-auto">
            <Typewriter
              phrases={["Tech Stack"]}
              isBlinking={false}
            /></h3>

          <div className="w-8/10 m-auto flex flex-col gap-15 ">
            <div className="autoShow text-center text-xl underline decoration-[#ce3635] underline-offset-3 "> Web Development</div>
            <div className="autoShow flex gap-20">
              <div className="flex flex-col gap-10">
                <div className="flex gap-10 ">
                  <span className="font-bold">Frontend</span>
                  <span>Vue.js, Nuxt.js, Next.js, React.js, Angular.js, JavaScript, HTML5, CSS, Bootstrap.css, Buefy,css, Bulma.css, Tailwind.css</span>
                </div>
                <div className="flex gap-10">
                  <span className="font-bold">Backend</span>
                  <span>Node.js, MySQL, MongoDB, Nginx</span>
                </div>

              </div>
            </div>
            <div className="autoShow mt-5 text-center text-xl underline decoration-[#ce3635] underline-offset-3"> Other Languages & Platforms</div>
            <div className="autoShow flex gap-10">
              <div>
                <div>Python, Java, AWS EC2, Azure, GitHub, Figma</div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full">
          <h2 className="text-5xl m-auto text-center"> <Typewriter
            phrases={["Portfolio"]}
            isBlinking={false}
          /></h2>

          <Projects
            events={projectEvents}
          />


          <p>Check out more on my GitHub↗ </p>
        </section>


        <section className="m-auto pb-30 w-full">
          <h2 className="text-5xl text-center">Contact...</h2>
          <h3 className="text-4xl mb-20 md:mb-35 text-center" ><Typewriter
            phrases={["Let's Get In Touch!"]}
            isBlinking={false}
          /></h3>
          <div className="text-2xl md:text-3xl text-left m-auto w-fit flex flex-col gap-5 md:gap-8 ">
            <span ><Typewriter
              phrases={["LinkedIn↗"]}
              isBlinking={false}
            /></span>
            <span ><Typewriter
              phrases={["Gmail↗"]}
              isBlinking={false}
            /></span>
            <span><Typewriter
              phrases={["GitHub↗"]}
              isBlinking={false}
            /></span>
          </div>

        </section>



      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          designed, developed by Sylvia Wu
        </a>

      </footer>
    </div>
  );
}
