import React from 'react'

const Readings = () => {
  return (
    <>
      <div className="flex justify-center">
        <div className="w-3/4">
          <h1 className="text-5xl font-bold pt-6 pb-12 text-center text-white">My Reading List</h1>
        </div>
      </div>
      <div className='flex justify-center'>
      <div className=' bg-white rounded-lg text-black  m-10 p-5'>
      <ul className=''>
        <li><strong>Foundations of Neural Networks and Optimization</strong>
            <ul className='list-disc pl-5'>
                <li>"Adam: A Method for Stochastic Optimization" (2014) - Kingma & Ba  <input className="ml-1" type="checkbox"></input></li>
                <li>"Stochastic Gradient Descent as Approximate Bayesian Inference" (2017) - Mandt et al. <input className="ml-1" type="checkbox"></input></li>
            </ul>
        </li>
        <br></br>
        <li><strong>Convolutional Neural Networks and Computer Vision</strong>
            <ul className='list-disc pl-5'>
            <li>"Deep Residual Learning for Image Recognition" (2015) - He et al <input className="ml-1" type="checkbox"></input></li>
            <li>"You Only Look Once: Unified, Real-Time Object Detection" (2016) - Redmon et al. <input className="ml-1" type="checkbox"></input></li>
            <li>"Attention Is All You Need" (2017) - Vaswani et al. <input className="ml-1" type="checkbox"></input></li>
            <li>"High-Resolution Image Synthesis with Latent Diffusion Models" (2022) - Rombach et al. <input className="ml-1" type="checkbox"></input></li>
            </ul>
        </li>
        <br></br>
        <li><strong>Transformers and Natural Language Processing (NLP)</strong>
            <ul className='list-disc pl-5'>
            <li>"BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding" (2018) - Devlin et al. <input className="ml-1" type="checkbox"></input></li>
            <li>"LLaMA: Open and Efficient Foundation Language Models" (2023) - Touvron et al. <input className="ml-1" type="checkbox"></input></li>
            <li>"Visual Instruction Tuning" (2023) - Liu et al. <input className="ml-1" type="checkbox"></input></li>
            <li>"LoRA: Low-Rank Adaptation of Large Language Models" (2021) - Hu et al. <input className="ml-1" type="checkbox"></input></li>
            <li>"Retrieval-Augmented Generation for Large Language Models: A Survey" (2023) - Yasunaga et al. <input className="ml-1" type="checkbox"></input></li>
            </ul>
        </li>
        <br></br>
        <li><strong>Generative Models</strong>
            <ul className='list-disc pl-5'>
            <li>"Generative Adversarial Networks (GANs)" (2014) - Goodfellow et al. <input className="ml-1" type="checkbox"></input></li>
            <li>"Auto-Encoding Variational Bayes" (2013) - Kingma & Welling <input className="ml-1" type="checkbox"></input></li>
            <li>"Diffusion Models Beat GANs on Image Synthesis" (2021) - Dhariwal & Nichol <input className="ml-1" type="checkbox"></input></li>
            </ul>
        </li>
        <br></br>
        <li><strong>Reinforcement Learning</strong>
            <ul className='list-disc pl-5'>
            <li>"Playing Atari with Deep Reinforcement Learning" (2013) - Mnih et al. <input className="ml-1" type="checkbox"></input></li>
            <li>"Proximal Policy Optimization Algorithms" (2017) - Schulman et al. <input className="ml-1" type="checkbox"></input></li>
            <li>"Mastering the Game of Go with Deep Neural Networks and Tree Search" (2016) - Silver et al. <input className="ml-1" type="checkbox"></input></li>
            </ul>
        </li>
        <br></br>
        <li><strong>Theoretical Insights and Broad Applications</strong>
            <ul className='list-disc pl-5'>
            <li>"Lottery Ticket Hypothesis: Finding Sparse, Trainable Neural Networks" (2018) - Frankle & Carbin <input className="ml-1" type="checkbox"></input></li>
            <li>"Understanding Deep Learning Requires Rethinking Generalization" (2017) - Zhang et al. <input className="ml-1" type="checkbox"></input></li>
            <li>"Attention Mechanisms in Neural Networks: What is the Fuss About?" (2015) - Bahdanau et al. <input className="ml-1" type="checkbox"></input></li>
            </ul>
        </li>
        <br></br>
        <li><strong>Tools and Practices for Research</strong>
            <ul className='list-disc pl-5'>
            <li>"Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift" (2015) - Ioffe & Szegedy <input className="ml-1" type="checkbox"></input></li>
            <li>"Dropout: A Simple Way to Prevent Neural Networks from Overfitting" (2014) - Srivastava et al. <input className="ml-1" type="checkbox"></input></li>
            <li>"Neural Architecture Search with Reinforcement Learning" (2016) - Zoph & Le <input className="ml-1" type="checkbox"></input></li>
            </ul>
        </li>
        <br></br>
        <li><strong>Additional Topics</strong>
            <ul className='list-disc pl-5'>
            <li>"A Survey of Transformers" (2020) - Khan et al. <input className="ml-1" type="checkbox"></input></li>
            <li>"Self-Supervised Learning: Generative or Contrastive" (2020) - Le-Khac et al. <input className="ml-1" type="checkbox"></input></li>
            <li>"Scaling Laws for Neural Language Models" (2020) - Kaplan et al. <input className="ml-1" type="checkbox"></input></li>
            </ul>
        </li>
        </ul>
        </div>
      </div>
    </>
  )
}

export default Readings