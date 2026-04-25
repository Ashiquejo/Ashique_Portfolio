import { PageTransition } from "../components/layout/PageTransition";
import { motion } from "motion/react";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import { useState, useRef } from "react";
import emailjs from 'emailjs-com';

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;
    
    setStatus("loading");

    // Replace these placeholders with your actual EmailJS credentials
    emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', form.current, 'PUBLIC_KEY')
      .then((result) => {
          console.log(result.text);
          setStatus("success");
          setName("");
          setEmail("");
          setSubject("");
          setMessage("");
          alert("Message sent successfully!");
      }, (error) => {
          console.log(error.text);
          setStatus("error");
          alert("Failed to send the message. Please try again.");
      });
  };

  return (
    <PageTransition className="flex-1 w-full max-w-4xl mx-auto flex flex-col pt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full">
        <section className="space-y-8">
          <div>
             <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold tracking-tighter mb-4"
             >
              Let's <br/>Connect.
             </motion.h2>
             <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-text-muted text-lg"
             >
              Whether you have a complex system to build or just want to discuss the future of AI interfaces, my inbox is open.
             </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex gap-4"
          >
            <a href="https://github.com/Ashiquejo" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-surface hover:text-g-blue transition-all">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/ashique-p-jo-5681a6334" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-surface hover:text-g-blue transition-all">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://x.com/ashiquejo1" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-surface hover:text-g-blue transition-all">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </a>
          </motion.div>
        </section>

        <motion.section 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#0E131A] border border-slate-800/80 rounded-2xl p-8 shadow-2xl"
        >
          <form ref={form} className="space-y-6" onSubmit={handleSend}>
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium font-mono text-text-muted">Name Sequence</label>
              <input 
                id="name"
                name="name"
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-background border-b border-slate-800 py-2 px-0 focus:outline-none focus:border-g-blue transition-colors text-white placeholder:text-text-muted/50 bg-transparent"
                placeholder="Enter your name"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium font-mono text-text-muted">Return Address</label>
              <input 
                id="email"
                name="email"
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border-b border-slate-800 py-2 px-0 focus:outline-none focus:border-g-blue transition-colors text-white placeholder:text-text-muted/50 bg-transparent"
                placeholder="joashique@gmail.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium font-mono text-text-muted">Subject</label>
              <input 
                id="subject"
                name="subject"
                type="text" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="w-full border-b border-slate-800 py-2 px-0 focus:outline-none focus:border-g-blue transition-colors text-white placeholder:text-text-muted/50 bg-transparent"
                placeholder="Project Inquiry"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium font-mono text-text-muted">Payload</label>
              <textarea 
                id="message"
                name="message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full border-b border-slate-800 py-2 px-0 focus:outline-none focus:border-g-blue transition-colors text-white placeholder:text-text-muted/50 bg-transparent resize-none"
                placeholder="Initialize communication..."
              />
            </div>

            <button disabled={status === "loading"} type="submit" className="group flex items-center gap-2 text-g-blue font-mono font-bold mt-8 hover:text-g-blue/80 transition-colors cursor-none disabled:opacity-50 disabled:cursor-not-allowed">
              {status === "loading" ? "Transmitting..." : "Execute Send"} 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </motion.section>
      </div>
    </PageTransition>
  );
}
