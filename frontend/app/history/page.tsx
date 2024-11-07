'use client';

import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { useInView } from "react-intersection-observer";


const History = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  return (
    <>
      <div className="flex justify-center">
        <div className="w-3/4">
          <h1 className="text-5xl font-bold pt-6 pb-12 text-center text-white">Work History</h1>
        </div>
      </div>
      <div className='flex justify-center'>
        <div>
          <VerticalTimeline>
            <VerticalTimelineElement
              className="m-10"
              contentArrowStyle={{ borderRight: '7px solid white' }}
              date="August - November 2024"
              dateClassName="mx-4 text-white text-lg"
              iconStyle={{ background: 'gray', color: '#fff' }}
              icon={<div className='flex justify-center pt-1'><img src="/ul.png" width={50} height={50} className='rounded-full'/></div>}
            >
              <h3 className="text-xl text-black">Computer Vision Engineer</h3>
              <h4 className="text-md text-gray-400">Flying Fish Technologies</h4>
              <p className='text-sm text-black'>
                Labelling image data and training YOLOv11 models on underwater object detection and habitat classification. I finetuned the Ultralytics models in order to track and detect multiple fish and coral species in the Hawaii area.
                <br/><br/>
                In order to perform the labelling I leveraged the SAM2 integration in Roboflow to make labelling efficient and trained by renting A100 GPU's on Google Collab.
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="m-10"
              contentArrowStyle={{ borderRight: '7px solid white' }}
              date="August - October 2024"
              dateClassName="mx-4 text-white text-lg"
              iconStyle={{ background: 'gray', color: '#fff' }}
              icon={<div className='flex justify-center p-1'><img src="/gr.png" width={50} height={50} className='rounded-full'/></div>}
            >
              <h3 className="text-xl text-black">Sales Leader</h3>
              <h4 className="text-md text-gray-400">Growth Rocket</h4>
              <p className='text-sm text-black'>
                I worked on behalf of clients such as RSLQ, Surf Lifesavers and Deaf Lottery in order to provide ongoing value and support to their causes.  <br/><br/> I worked in direct face to face event sales, focusing on creating connections with customers and applying effective communciation techniques in order to help them decide on their level on support. 
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="m-10"
              contentArrowStyle={{ borderRight: '7px solid white' }}
              date="March - July 2024"
              dateClassName="mx-4 text-white text-lg"
              iconStyle={{ background: 'gray', color: '#fff' }}
              icon={<div className='flex justify-center p-1'><img src="/uq2.png" width={50}  className='rounded-full'/></div>}
            >
              <h3 className="text-xl text-black">Software Process Tutor</h3>
              <h4 className="text-md text-gray-400">University of Queensland</h4>
              <p className='text-sm text-black'>
                I worked with the UQ academic team in order to provide support and guidence to students through running practicals, answering discussion board questions and resolving team conflicts.  <br/><br/>I was also responsible for marking of assignments and exams as well as providing support for these assessment items.  The course covered the software engineering process, user testing, user stories and use case diagrams.
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="m-10"
              contentArrowStyle={{ borderRight: '7px solid white' }}
              date="November 2023 - Feburary 2024"
              dateClassName="mx-4 text-white text-lg"
              iconStyle={{ background: 'gray', color: '#fff' }}
              icon={<div className='flex justify-center p-1'><img src="/rmd.png" width={50}  className='rounded-full'/></div>}
            >
              <h3 className="text-xl text-black">Software Engineer Intern</h3>
              <h4 className="text-md text-gray-400">Rheinmetall Defence Australia</h4>
              <p className='text-sm text-black'>
               I worked on developing a similation program used in defence applications for tradeshows to demo the capabilities of the vehicle software systems.  During the 3 month internship I got exposure to working in a real software engineering team. <br/><br/>
               I got experience in c++ and python programming, as well as refining my knowledge of git and github.  We also got more exposure to VLAN and virtual networks as well as refining my networking knowledge. <br/><br/>
               I was also able to run my own small student intern team of two member running daily standups as well as performing weekly demos in order to show my progress. We made maticulous use of JIRA for task management and tracking as well as confluence for high level diagraming and code documentation. 
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="m-10"
              contentArrowStyle={{ borderRight: '7px solid white' }}
              date="Feburary 2023 - November 2023"
              dateClassName="mx-4 text-white text-lg"
              iconStyle={{ background: 'gray', color: '#fff' }}
              icon={<div className='flex justify-center pt-1'><img src="/gyw.png" width={50}  className='rounded-full'/></div>}
            >
              <h3 className="text-xl text-black">Web Developer and Data Entry</h3>
              <h4 className="text-md text-gray-400">Grow Your Wealth</h4>
              <p className='text-sm text-black'>
                I provided ongoing IT Support as well as making updates to both the grow your wealth as well as the Happy Tax websites in order to ensure the designs matched the companies desires <br/><br/>
                Furthermore, I performed daily data entry, sourcing data from various sources about specific stocks depending on market conditions as well as writing reports on the data found. <br/> <br/>
                I was also responsible for setting up emailing lists as well as configuring and adding pages to the website, as well as sending out automated emails to customers in order to notify them of new company newsletters
              </p>
            </VerticalTimelineElement>
          </VerticalTimeline>
        </div>
      </div>
    </>
    
  )
}

export default History