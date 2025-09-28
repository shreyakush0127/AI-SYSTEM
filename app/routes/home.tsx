import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter"
import {  Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart Feedback For Your Dream Job!" },
  ];
}

export default function Home() {
   const { auth,kv}=usePuterStore();;
    const navigate=useNavigate();
    const [resumes,setResumes]=useState<Resume[]>([]);
   const [loadingResumes,setLoadingResumes]=useState(false);
    useEffect(()=>{
       if (!auth.isAuthenticated)navigate('/auth?next=/');
    },[auth.isAuthenticated])

useEffect(()=>{
const loadResume=async()=>{
setLoadingResumes(true);
const resumes=(await kv.list('resume:*'))as KVItem[];
const parsedResume=resumes?.map((resume)=>(
  JSON.parse(resume.value)as Resume
))
console.log(parsedResume)
setResumes(parsedResume||[])
setLoadingResumes(false);
}
},[])
  return <main
  className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar/>
<section className="main-section">
<div  className="page-heading py-16">
<h1>Track Your Applications & Resume Rating</h1>
{!loadingResumes && resumes ?.length==0 ?(
  <h2>  No resumes found upload your first resume to get feedback</h2>
):(
<h2>Review Your Submission and Check AI-powered feedback</h2>
)}

</div>
{loadingResumes && (
  <div className="flex flex-col items-center justify-center">
    <img src="images/resume-scan-2.gif"  className="w-[200px]" />
  </div>
)
}
{!loadingResumes&& resumes.length> 0 && (
<div className="resumes-section">
{resumes.map((resume:Resume) => (
  <ResumeCard key={resume.id} resume={resume}/>
))}
</div>
)}
{!loadingResumes && resumes?.length==0 &&(
  <div className="flex flex-col items-center justify-center m-10" >
    <Link to="/upload"className="primary-button w-fit text-xl font-semibold" >
    Upload resume </Link>
  </div>
)}
</section>
  </main>
}
