'use client';

import Tilt from 'react-parallax-tilt';

type Project = {
  index: string;
  name: string;
  description: string;
  tags: string[];
  image: string;
  source_code_link: string;
}

const ProjectCard = ({index, name, description, tags, image, source_code_link}: Project) => {

  return (
    <div >
      <Tilt
        className="col-span-1 p-6 bg-white rounded hover:border-sky-400 border-2 border-black h-full"> 
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
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
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
  const fft: Project = {
    index: "001",
    name: "Reef Habitat Visualiser",
    description: "Collaborated with Flying Fish Technologies to build a Visualisation of Hawaiian Reef Strips within a team.  My focus on was machine learning and computer vision utilising YOLOv8 and Roboflow. ",
    tags: ["NextJS", "Supabase", "YOLOv8"],
    image: "/fft.png",
    source_code_link: "https://fft-ai.vercel.app/app",
  } 

  const OpenStat: Project = {
    index: "002",
    name: "Open Stat",
    description: "I built a web application that visualises and predicts the future lifts of top powerlifters from around the world leveraging there open source data and api.  I attempted to predict using GradientBoosting but now realise a Seq-2-Seq model would have been much better.",
    tags: ["NextJS", "Supabase", "XGBoost"],
    image: "/openstat.png",
    source_code_link: "https://fft-ai.vercel.app/app",
  } 

  const OASIS: Project = {
    index: "003",
    name: "OASIS StyleGAN2",
    description: "Used NVIDIA StyleGAN2 paper to recreate architecture and train on OASIS brain image dataset in order to create realistic generated images of brain scans.  Use of adverseral networks was challenging and I had to learn linux, slurm and training on a HPC.",
    tags: ["Pytorch", "CNN", "GAN"],
    image: "/oasis.png",
    source_code_link: "https://fft-ai.vercel.app/app",
  } 

  const RAGPaper: Project = {
    index: "004",
    name: "RAG Research",
    description: "I performed research with different types of Retrieval Systems and different open source LLM generators from huggingface.  This project exposed me more to utilising AWS compute as well as renting GPUS.  I compared the results using BERT score, METEOR and ROUGE as well as on a per query basis with interesting results. ",
    tags: ["llama", "Huggingface", "AWS"],
    image: "/llama.png",
    source_code_link: "https://fft-ai.vercel.app/app",
  } 

  const thesis: Project = {
    index: "001",
    name: "Multimodal Risk",
    description: "My goal is to research the use of deep learning models in order to classify and jsutify risk classification from an image.  In order to do this I am leveraging, computer vision models such as YOLOv11 as well as NLP generative models such as llama 3.2.  The goal is to test different technqiues and see what works best.",
    tags: ["llama 3.2", "YOLOv11", "CVAT"],
    image: "/thesis.png",
    source_code_link: "https://fft-ai.vercel.app/app",
  } 

  const MLreport: Project = {
    index: "001",
    name: "ML Report",
    description: "I applied a variety of machine learning and feature engineering techniques to a statistical dataset in order to explore and identify possible relationships.  I compared the use of multiple models inclusing Decison Trees, Gradient Boosters as well as Fully Connected Neural Networks in order to see which had the best results on both classification and regression problems for the dataset.",
    tags: ["XGBoost", "Pandas", "Pytorch"],
    image: "/ml-report.png",
    source_code_link: "https://fft-ai.vercel.app/app",
  } 
  const projects: Project[] = [fft, OpenStat, OASIS, RAGPaper, thesis, MLreport]

  return (
    <>
      <div className="flex justify-center">
        <div className="w-3/4">
          <h1 className="text-5xl font-bold pt-6 pb-12 text-center text-white">My Projects</h1>
        </div>
      </div>
      <div className='flex justify-center'>
        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  m-10 gap-10 w-3/4">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
        </div>
      </div>
    </>
  )
}

export default page