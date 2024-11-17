'use client';
import Tilt from 'react-parallax-tilt';

type Status = {
  name: string;
  color: string;
}

type Project = {
  index: string;
  name: string;
  status: Status;
  description: string;
  tags: string[];
  image: string;
  source_code_link: string;
}

const ProjectCard = ({index, name, status, description, tags, image, source_code_link}: Project) => {

  return (
    <div key={index}>
      <Tilt
        className={`col-span-1 p-6 bg-white rounded-lg  border-2 border-black h-full`}> 
        <div className="relative w-full h-[230px]">
          <img 
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-2xl" 
          />
          <div className="absolute inset-0 flex justify-end m-3 ">
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer">
                <img 
                  src="/github.png"
                  alt="github"
                  width={50}
                  height={50}
                />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h3 className="text-black font-bold text-[24px]">{name}</h3>
          <h4 className={`text-green-400 opacity-75`}>{status.name}</h4>
          <p className="mt-2 text-secondary text-[14px] text-black">{description}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p key={tag} className="text-blue-600 font-bold">
              #{tag}
            </p>
          ))}
        </div>
      </Tilt>
    </div>
  )
}


const page = () => {
  const completed: Status = {
    name: "Completed",
    color: "green"
  }

  const development: Status = {
    name: "In Development",
    color: "orange"
  }

  const planning: Status = {
    name: "Planning",
    color: "gray"
  }

  const myllm: Project = {
    index: "001",
    name: "My LLM",
    status: development,
    description: "My goal for this project is to create an train a small LLM from scratch by reimplementing the attention is all you need paper on transformers and training on google collab.  I will implement it in pytroch and this will give me a lot of insight into the model innerworking and I will fail and learn so much about LLM's. I think a basic seq-2-seq model focusing on text summarization",
    tags: ["Attention", "Pytorch", "transformer"],
    image: "/storm-ai.png",
    source_code_link: "",
  } 

  const stormdrain: Project = {
    index: "001",
    name: "Stormdrain",
    status: development,
    description: "My personal hub, blog and portfolio site, I will constantly be updating and upgrading its capabilities in order to develop my skills in Fullstack Web Development and maybe even add in some AI integrations.  The purpose is to provide a hub to track what I am learning and developing for myself as well as other to see what I am passionate about.",
    tags: ["NextJS", "Supabase", "Tailwind"],
    image: "/storm-drain.png",
    source_code_link: "https://github.com/adamFittlerGit/stormdrain",
  } 

  const FinetuneLLM: Project = {
    index: "001",
    name: "PT LLM",
    status: development,
    description: "Fine tune Llama as a personal trainer and fitness coach to help me further down the line in my own power forge application for creating and tracking my workout training for Tayla and I. I will try to first understand all relevant papers for finetuning the models, the first step will be understanding LORA or low rank adaptation for the finetuning. ",
    tags: ["Attention", "Pytorch", "transformer"],
    image: "/trainer.png",
    source_code_link: "",
  } 

  const TAXRAG: Project = {
    index: "001",
    name: "TAX RAG",
    status: development,
    description: "My Goal is to develop a systemt that leverages a vector database as well as an LLM like LLAMA3.2 3B instruct in order to read in all documents on Australian Tax and provide insights into specific laws allowing users to quickly solve tax problems and align with legislation",
    tags: ["Openai", "PGVector", "Langchain"],
    image: "/happyhg.png",
    source_code_link: "https://github.com/adamFittlerGit/tax-rag",
  } 

  const cnn_from_scratch: Project = {
    index: "001",
    name: "CNN from scratch",
    status: development,
    description: "This is an ambitous project, My goal is to develop a convolutional neural network model from scratch using only numpy and I am not allowed to use pytorch as all.  This will be a true test of my understanding and an amazing project to show off for MLE interviews as wll as data engineering interviews. ",
    tags: ["CNN", "Applied Algebra", "Numpy"],
    image: "/storm-ai.png",
    source_code_link: "",
  } 

  const Powerforge: Project = {
    index: "001",
    name: "Powerforge",
    status: development,
    description: "My goal is to build a fullstack web app powered by AI that allows tayla and I to track our workouts and control them via the application, We should be able to track lifts overtime with metrics and have an AI coach we can customise to help us plana dnd create workouts.",
    tags: ["LLM", "Finetuning", "RAG"],
    image: "/storm-ai.png",
    source_code_link: "",
  } 

  const TadamBlog: Project = {
    index: "001",
    name: "Tadam Blog",
    status: development,
    description: "My goal for this project is to build a fullstack web application that allows tayla and I to upload images and descriptions of our dates, I will also make it so that only her and I are able to login to add dates but anyone can view our dates online if they wanted too! ",
    tags: ["NextJS", "Blog", "Supabase"],
    image: "/date-blog.png",
    source_code_link: "",
  } 

  const stormai: Project = {
    index: "001",
    name: "Storm AI Assistant",
    status: development,
    description: "My goal for this project is to create a personal AI assistant without the use of openai's gpt tokens as I want to have this self hosted to reduce the overall cost and give me more understanding of self hositing a ML model for training and inference.  I want it to be able to learn about me and things I am studying using RAG, for example giving it a textbook and It giving me bitsized lessions on it.  I want it to have ongoing memory and be able to learn over time maybe I need a custom datastructure for it to learn and store and then reload from...",
    tags: ["LLM", "Finetuning", "RAG"],
    image: "/storm-ai.png",
    source_code_link: "",
  } 

  const nvidiaStock: Project = {
    index: "001",
    name: "Nvidia Stock Price Forecaster",
    status: development,
    description: "This project leverages a transformer-based machine learning model to forecast Nvidia’s stock prices, providing insights into potential future trends. By training on historical stock data and technical indicators, the model predicts future price movements, which are then visualized on the frontend using Three.js. The 3D visualization presents actual versus predicted prices in an interactive format, allowing users to explore how well the model captures market trends over time. This blend of advanced forecasting and interactive visualization offers a unique, engaging way to analyze and understand stock market predictions.",
    tags: ["Forecasting", "Transformers", "Quant Finance"],
    image: "/nvidia.png",
    source_code_link: "",
  } 

  const fft: Project = {
    index: "001",
    name: "Reef Habitat Visualiser",
    status: completed,
    description: "Collaborated with Flying Fish Technologies to build a Visualisation of Hawaiian Reef Strips within a team.  My focus on was machine learning and computer vision utilising YOLOv8 and Roboflow. ",
    tags: ["NextJS", "Supabase", "YOLOv8"],
    image: "/fft.png",
    source_code_link: "https://github.com/jarrodmann/DECO3801",
  } 

  const OpenStat: Project = {
    index: "002",
    name: "Open Stat",
    status: completed,
    description: "I built a web application that visualises and predicts the future lifts of top powerlifters from around the world leveraging there open source data and api.  I attempted to predict using GradientBoosting but now realise a Seq-2-Seq model would have been much better.",
    tags: ["NextJS", "Supabase", "XGBoost"],
    image: "/openstat.png",
    source_code_link: "https://github.com/adamFittlerGit/OpenStat",
  } 

  const OASIS: Project = {
    index: "003",
    name: "OASIS StyleGAN2",
    status: completed,
    description: "Used NVIDIA StyleGAN2 paper to recreate architecture and train on OASIS brain image dataset in order to create realistic generated images of brain scans.  Use of adverseral networks was challenging and I had to learn linux, slurm and training on a HPC.",
    tags: ["Pytorch", "CNN", "GAN"],
    image: "/oasis.png",
    source_code_link: "https://github.com/adamFittlerUQ/PatternAnalysis-2023/tree/topic-recognition/recognition/OASIS-Style-GAN2-s4696807",
  } 

  const RAGPaper: Project = {
    index: "004",
    name: "RAG Research",
    status: completed,
    description: "I performed research with different types of Retrieval Systems and different open source LLM generators from huggingface.  This project exposed me more to utilising AWS compute as well as renting GPUS.  I compared the results using BERT score, METEOR and ROUGE as well as on a per query basis with interesting results. ",
    tags: ["llama", "Huggingface", "AWS"],
    image: "/llama3.png",
    source_code_link: "https://github.com/adamFittlerGit/RAG-Multihop",
  } 

  const thesis: Project = {
    index: "001",
    name: "Multimodal Risk Analysis",
    status: development,
    description: "My goal is to research the use of deep learning models in order to classify and jsutify risk classification from an image.  In order to do this I am leveraging, computer vision models such as YOLOv11 as well as VLm models models such as Llava.  The goal is to test different technqiues and see what works best. ",
    tags: ["Finetuning", "YOLOv11", "Llava"],
    image: "/thesis.png",
    source_code_link: "https://github.com/adamFittlerGit/IDM",
  } 

  const MLreport: Project = {
    index: "001",
    name: "ML Report",
    status: completed,
    description: "I applied a variety of machine learning and feature engineering techniques to a statistical dataset in order to explore and identify possible relationships.  I compared the use of multiple models inclusing Decison Trees, Gradient Boosters as well as Fully Connected Neural Networks in order to see which had the best results on both classification and regression problems for the dataset.",
    tags: ["XGBoost", "Pandas", "Pytorch"],
    image: "/ml.png",
    source_code_link: "https://github.com/adamFittlerGit/DataReport",
  } 
  const projects: Project[] = [stormdrain, TAXRAG, thesis, OpenStat, fft, RAGPaper, OASIS, MLreport]

  return (
    <>
      <div className="flex justify-center">
        <div className="w-3/4">
          <h1 className="text-5xl font-bold pt-6 pb-12 text-center text-white">My Projects</h1>
        </div>
      </div>
      <div className='flex justify-center'>
        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-10 gap-10 w-3/4">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
        </div>
      </div>
    </>
  )
}

export default page