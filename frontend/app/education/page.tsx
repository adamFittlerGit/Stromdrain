'use client';
import Tilt from 'react-parallax-tilt';


type Course = {
  index: string;
  name: string;
  provider: string,
  description: string;
  image: string;
  achieved:string;
  completed: boolean;
}

const CourseCard = ({index, name, provider, description, achieved, completed, image}: Course) => {

  return (
    <div key={index}>
      <Tilt
        className={`col-span-1 p-6 m-4 bg-white rounded-lg  border-2 border-black h-full`}> 
        <div className="flex justify-center relative w-full">
          <img 
            src={image}
            alt={name}
            width={100}
            height={100}
            className="object-cover rounded-2xl" 
          />
        </div>
        <div className="mt-5">
          <h3 className="text-black font-bold text-[24px]">{name}</h3>
          <h4 className={`text-gray-400 opacity-75`}>{provider}</h4>
          <p className="mt-2 text-secondary text-[14px] text-black">{description}</p>
          <br></br>
          <p><span className='font-bold'>Result: </span><span className={`text-green-500 opacity-70`}>{achieved}</span></p>
        </div>
      </Tilt>
    </div>
  )
}


const Education = () => {
  const AZUREDATAENG: Course = {
    index: "001",
    name: "Azure Certified Data Engineer",
    provider: "Microsoft Azure",
    description: "This certification prepares Azure data engineers to build and optimize secure data pipelines, integrating and transforming data for analytics using tools like Azure Data Factory and Synapse. Key skills include data storage design, processing, and troubleshooting, applying modern architectures such as data warehouses and lakehouses, with a focus on SQL, Python, and Scala.",
    image: "/azure-data-engineer.png",
    achieved: "In Progress",
    completed: true
  } 

  const REIT4842: Course = {
    index: "001",
    name: "REIT4842: Research Methods",
    provider: "University of Queensland",
    description: "This course introduces research methodologies fundamental to conducting academic and industry research, focusing on both qualitative and quantitative analysis. Students learn data collection techniques, statistical analysis, and how to approach research questions critically. Emphasis is also placed on ethical research practices and the documentation of findings in an academic format. ",
    image: "/uq2.png",
    achieved: "In Progress",
    completed: true
  } 

  const COMP4703: Course = {
    index: "001",
    name: "COMP4703: Natural Language Processing",
    provider: "University of Queensland",
    description: "This course covers foundational and advanced topics in natural language processing (NLP), including tokenization, parsing, sentiment analysis, and machine translation. Students also explore neural language models, embeddings, and language understanding frameworks. Applications span computational linguistics, AI-driven text processing, and human-computer interaction. ",
    image: "/uq2.png",
    achieved: "Competed",
    completed: true
  } 

  const DECO3801: Course = {
    index: "001",
    name: "DECO3801: Software Build Project",
    provider: "University of Queensland",
    description: "This capstone project allows students to apply their engineering knowledge by working in teams to design, develop, and deliver a fully functional software application. The project mimics real-world software development processes, requiring students to handle project management, version control, and product testing.",
    image: "/uq2.png",
    achieved: "Completed",
    completed: true
  } 

  const COMS4507: Course = {
    index: "001",
    name: "COMS4507: Advanced Security and Blockchain",
    provider: "University of Queensland",
    description: "This course dives deep into advanced cybersecurity and blockchain topics, focusing on smart contracts, cryptographic protocols, and consensus mechanisms. Topics include blockchain structure, decentralized applications, and ethical considerations in security practices, providing students with knowledge relevant to emerging technologies.",
    image: "/uq2.png",
    achieved: "Completed",
    completed: true
  } 

  const COMP4702: Course = {
    index: "001",
    name: "COMS4702: Machine Learning",
    provider: "University of Queensland",
    description: "This introductory machine learning course explores core concepts such as supervised and unsupervised learning, classification, regression, and clustering techniques. The course emphasizes model evaluation, error measurement, and data preprocessing, equipping students with fundamental skills for machine learning applications.",
    image: "/uq2.png",
    achieved: "Completed",
    completed: true
  } 

  const ENGG4901: Course = {
    index: "001",
    name: "ENGG4901: Professional Engineering",
    provider: "University of Queensland",
    description: "This course focuses on professional and ethical responsibilities of engineers, including project management, workplace safety, and legal responsibilities. Students learn how to manage engineering projects effectively while considering social impacts, fostering a commitment to professionalism.",
    image: "/uq2.png",
    achieved: "Completed",
    completed: true
  } 

  const COMP3710: Course = {
    index: "001",
    name: "COMP3710: Pattern Recognition and Analysis",
    provider: "University of Queensland",
    description: "Focusing on deep learning and image processing, this course introduces concepts in pattern recognition and machine learning models used for classification and analysis of visual data. Topics include convolutional neural networks, feature extraction, and image segmentation, with practical applications in image processing.",
    image: "/uq2.png",
    achieved: "Completed",
    completed: true
  } 

  const CSSE3200: Course = {
    index: "001",
    name: "CSSE3200: Design, Implement, Test",
    provider: "University of Queensland",
    description: "In this course, students participate in a large-scale project with around 100 students, focusing on developing a ticket tracking system using Git for version control. Emphasis is placed on collaboration, version management, and organizing large codebases, simulating real-world software development and collaboration.",
    image: "/uq2.png",
    achieved: "Completed",
    completed: true
  } 

  const CYBR3000: Course = {
    index: "001",
    name: "CYBR3000: Introduction to Cyber Security",
    provider: "University of Queensland",
    description: "This course introduces students to cybersecurity principles, including threat analysis, network security, and cryptography. Topics include data encryption, security protocols, and risk assessment, providing a foundation for protecting systems and networks. Key Takeaways: Basic understanding of cybersecurity threats, cryptographic methods, and approaches to maintaining secure networks.",
    image: "/uq2.png",
    achieved: "Completed",
    completed: true
  } 

  const COMP3506: Course = {
    index: "001",
    name: "COMP3506: Algorithms and Data Structures",
    provider: "University of Queensland",
    description: "This course covers fundamental algorithms and data structures essential for efficient computation, including arrays, linked lists, trees, and graphs. Students analyze algorithm complexity and apply optimization techniques to problem-solving. ",
    image: "/uq2.png",
    achieved: "Completed",
    completed: true
  } 

  const COMP3400: Course = {
    index: "001",
    name: "COMP3400: Functional and Logic Programming",
    provider: "University of Queensland",
    description: "Students delve into functional and logic programming concepts, learning how to solve problems using functional constructs and logical rules rather than procedural commands. The course highlights functional languages like Haskell and logical languages like Prolog.",
    image: "/uq2.png",
    achieved: "Completed",
    completed: true
  } 

  const CSSE3012: Course = {
    index: "001",
    name: "CSSE3012: The Software Process",
    provider: "University of Queensland",
    description: "This course delves into software process models, with a focus on Agile methodologies, user story creation, requirements elicitation, and code testing. Students learn to apply agile practices to manage and streamline software development, emphasizing iterative feedback and collaboration.",
    image: "/uq2.png",
    achieved: "Completed",
    completed: true
  } 

  const STAT2003: Course = {
    index: "001",
    name: "STAT2003: Applied Statistics",
    provider: "University of Queensland",
    description: "An introduction to statistics with applications in scientific fields, covering probability, hypothesis testing, and regression analysis. Students learn to analyze scientific data using statistical software.",
    image: "/uq2.png",
    achieved: "Completed",
    completed: true
  } 

  const DECO2500: Course = {
    index: "001",
    name: "DECO2500: Human Centered Computing",
    provider: "University of Queensland",
    description: "This course examines the design and evaluation of user interfaces, with a focus on usability and user-centered design principles. Topics include interface prototyping, user testing, and designing for accessibility. ",
    image: "/uq2.png",
    achieved: "Completed",
    completed: true
  } 

  const STAT2001: Course = {
    index: "001",
    name: "STAT2001: Intro to Statistics",
    provider: "University of Queensland",
    description: "An introductory course on statistics, focusing on data visualization, probability, and statistical inference. Students learn how to summarize data and draw conclusions through basic statistical techniques. ",
    image: "/uq2.png",
    achieved: "Completed",
    completed: true
  } 

  const CSSE2310: Course = {
    index: "001",
    name: "COMP2310: Computer System Principles",
    provider: "University of Queensland",
    description: "This course introduces the fundamentals of computer systems, including operating systems, memory management, and computer architecture. Students learn about low-level programming and system efficiency. ",
    image: "/uq2.png",
    achieved: "Completed",
    completed: true
  } 

  const MATH2010: Course = {
    index: "001",
    name: "MATH2010: Applied Calculus",
    provider: "University of Queensland",
    description: "This course covers advanced calculus topics applied to engineering problems, including multivariable calculus, differential equations, and integrals. The focus is on solving real-world engineering problems.",
    image: "/uq2.png",
    achieved: "Completed",
    completed: true
  } 

  const MECH2210: Course = {
    index: "001",
    name: "MECH2210: Engineering Mechanics",
    provider: "University of Queensland",
    description: "Engineering Mechanics introduces fundamental mechanics principles, covering static equilibrium, force systems, and material deformation. The course applies physics and engineering principles to analyze structural systems.",
    image: "/uq2.png",
    achieved: "Completed",
    completed: true
  } 

  const MATH2001: Course = {
    index: "001",
    name: "MATH2001: Advanced Linear Algebra",
    provider: "University of Queensland",
    description: "This course covers linear algebra topics, including vector spaces, matrices, and transformations. Applications in engineering and science are emphasized. ",
    image: "/uq2.png",
    achieved: "Completed",
    completed: true
  } 

  const ELEC2300: Course = {
    index: "001",
    name: "ELEC2300: Signals and Systems",
    provider: "University of Queensland",
    description: " This course introduces signal processing concepts, including Fourier analysis, signal filtering, and time-frequency analysis. Students apply these principles to communication and control systems.",
    image: "/uq2.png",
    achieved: "Completed",
    completed: true
  } 

  const CSSE2002: Course = {
    index: "001",
    name: "CSSE2002: Programming in the Large",
    provider: "University of Queensland",
    description: "This course focuses on software engineering principles for building large-scale systems, including modular design, testing, and maintenance. Students develop robust applications through rigorous programming standards.",
    image: "/uq2.png",
    achieved: "Completed",
    completed: true
  } 

  const CSSE2010: Course = {
    index: "001",
    name: "CSSE2010: Digitial System Design",
    provider: "University of Queensland",
    description: "Digital System Design covers logic circuits, binary arithmetic, and hardware design using VHDL. Students gain hands-on experience designing digital circuits. ",
    image: "/uq2.png",
    achieved: "Completed",
    completed: true
  }

  const CSSE1001: Course = {
    index: "001",
    name: "CSSE1001: Intro to Software Engineering",
    provider: "University of Queensland",
    description: "An introductory course in software engineering, covering programming basics, data structures, and algorithm design. Students learn Python and the principles of structured programming.",
    image: "/uq2.png",
    achieved: "Completed",
    completed: true
  } 

  const MATH1052: Course = {
    index: "001",
    name: "MATH1052: Multivariate Calculus and Linear Algebra",
    provider: "University of Queensland",
    description: "This course covers both multivariable calculus and linear algebra, essential for advanced engineering applications. Topics include gradients, partial derivatives, and vector fields.",
    image: "/uq2.png",
    achieved: "Completed",
    completed: true
  } 

  const MATH1061: Course = {
    index: "001",
    name: "MATH1061: Discrete Mathematics",
    provider: "University of Queensland",
    description: "Discrete Mathematics introduces combinatorics, graph theory, and logic, with applications in computer science and engineering. Emphasis is on problem-solving using discrete structures.",
    image: "/uq2.png",
    achieved: "Completed",
    completed: true
  } 

  const ENGG1700: Course = {
    index: "001",
    name: "ENGG1700: Statics for Civil and Mechanical",
    provider: "University of Queensland",
    description: "This course focuses on statics principles in civil and mechanical engineering, covering equilibrium, force analysis, and structural stability.",
    image: "/uq2.png",
    achieved: "Completed",
    completed: true
  } 

  const ENGG1100: Course = {
    index: "001",
    name: "ENGG1100: Intro to Engineering",
    provider: "University of Queensland",
    description: "This introductory course teaches engineering problem-solving methodologies, focusing on design thinking, teamwork, and foundational engineering concepts.",
    image: "/uq2.png",
    achieved: "Completed",
    completed: true
  } 

  const MATH1071: Course = {
    index: "001",
    name: "MATH1071: Advanced Calculus and Linear Algebra",
    provider: "University of Queensland",
    description: "This course introduces students to calculus and linear algebra with applications in engineering and physical sciences. Topics include differentiation, integration, vectors, matrices, and linear transformations. Emphasis is on understanding these mathematical concepts and applying them to model and solve engineering and scientific problems. ",
    image: "/uq2.png",
    achieved: "Completed",
    completed: true
  } 

  const INFS1200: Course = {
    index: "001",
    name: "INFS1200: Intro to Infomation Systems",
    provider: "University of Queensland",
    description: "This course explores the role of information systems within organizations, covering topics like database management, information system design, and data analysis. Students learn about the lifecycle of information systems, from planning and analysis to implementation and maintenance, with a focus on aligning information systems with business strategies. ",
    image: "/uq2.png",
    achieved: "Completed",
    completed: true
  } 

  const ENGG1300: Course = {
    index: "001",
    name: "ENGG1300: Intro to Electrical Systems",
    provider: "University of Queensland",
    description: "This course provides a foundational overview of electrical engineering principles, covering topics such as circuit analysis, electrical power, and basic electronic components. Students learn to analyze electrical circuits, work with various circuit elements, and understand the principles governing electrical systems. Practical lab sessions help students apply theoretical knowledge to real-world electrical problems. ",
    image: "/uq2.png",
    achieved: "Completed",
    completed: true
  } 


  const projects: Course[] = [AZUREDATAENG, REIT4842, COMP4703, DECO3801, COMS4507, COMP4702, ENGG4901, COMP3506, COMP3710, CSSE3200, CYBR3000, CSSE3012, COMP3400, STAT2003, DECO2500, MECH2210, MATH2010, STAT2001, CSSE2310, CSSE2010, MATH2001, ELEC2300, CSSE2002, CSSE1001, MATH1052, MATH1061, ENGG1700, ENGG1100, MATH1071, INFS1200, ENGG1300]

  return (
    <>
      <div className="flex justify-center">
        <div className="w-3/4">
          <h1 className="text-5xl font-bold pt-6 pb-12 text-center text-white">My Education</h1>
        </div>
      </div>
      <div className='flex justify-center mb-12'>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3  w-3/4">
            {projects.map((project, index) => (
              <CourseCard key={index} {...project} />
            ))}
        </div>
      </div>
    </>
  )
}

export default Education