import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from 'framer-motion';
const faqData = [
  {
    question: "What is SecureLance?",
    answer: "SecureLance is a decentralized freelancing platform built on Web3 technologies. It aims to provide a secure, transparent, and efficient environment for freelancers and clients to collaborate, leveraging blockchain for smart contracts, escrow services, and on-chain reputation.",
  },
  {
    question: "How does SecureLance ensure security?",
    answer: "Security is paramount. We use smart contracts for agreements, ensuring terms are immutable and automatically enforced. Funds are held in secure escrow until milestones are met and approved by both parties. Your reputation is built on-chain based on completed contracts and reviews, making it tamper-proof.",
  },
  {
    question: "What blockchain does SecureLance use?",
    answer: "SecureLance primarily utilizes Ethereum and compatible Layer 2 solutions for its smart contracts and transactions to balance security, scalability, and cost-effectiveness. Specific network details may vary depending on the contract.",
  },
  {
    question: "How do payments work?",
    answer: "Clients fund contracts by depositing cryptocurrency into a smart contract escrow. Funds are released automatically to the freelancer upon successful completion and approval of milestones or the final project. This eliminates payment delays and disputes.",
  },
  {
    question: "What is on-chain reputation?",
    answer: "Your reputation score and history are recorded directly on the blockchain. This means your track record of successful contracts, disputes (if any), and client feedback is transparent, verifiable, and cannot be altered or censored, providing a trustworthy measure of reliability.",
  },
  {
    question: "How are disputes handled?",
    answer: "While smart contracts minimize disputes, disagreements can still occur. SecureLance incorporates a decentralized dispute resolution mechanism (details may vary, potentially involving community jurors or arbitration protocols) to resolve conflicts fairly based on contract terms and evidence.",
  },
  {
    question: "What technologies are used?",
    answer: "The platform leverages technologies like Ethereum/Solidity for smart contracts, IPFS for decentralized file storage (like work submissions), React for the frontend, Node.js for the backend, and Wagmi for wallet interactions.",
  },
  {
    question: "Do I need a crypto wallet?",
    answer: "Yes, you need a compatible Web3 wallet (like MetaMask) to interact with SecureLance. Your wallet is used to sign transactions, manage funds, and interact with smart contracts.",
  },
  {
    question: "Are there platform fees?",
    answer: "SecureLance may charge a small percentage fee on completed contracts to sustain platform development and maintenance. Gas fees for blockchain transactions (paid by users) also apply.",
  },
];
const FAQ = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-12 md:py-16 max-w-4xl"
    >
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-foreground">
        Frequently Asked Questions
      </h1>
      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqData.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="bg-card border border-border/50 rounded-lg shadow-sm px-6">
            <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pt-2">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.div>
  );
};
export default FAQ;
