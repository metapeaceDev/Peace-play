"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { getVideoById } from "@/services/videoService";
import { PeacePlayVideo } from "@/types/peacePlay";
import Footer from "../../../component/footer";
import Cards from "../../.../../../component/card";
import dynamic from "next/dynamic";
import {
  Card,
  CardBody,
  CardFooter,
  Chip,
  CircularProgress,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { BorderColorSample } from "@/utils/border-comstant";
import Content from "./tabs/content/page";
import { Suspense } from "react";

// โหลด Editor แบบ Dynamic
const ReactQuill = dynamic(() => import("react-quill"), { 
  ssr: false,
  loading: () => <div className="h-40 w-full bg-white rounded-md border" />
});
import "react-quill/dist/quill.snow.css";

// --- Interfaces สำหรับ Review ---
interface Reply {
  id: number;
  user: string;
  content: string;
  date: string;
}

interface ForumPost {
  id: number;
  user: string;
  title: string;
  content: string;
  date: string;
  type: "Discussion" | "Question";
  replies: Reply[];
}

function ProjectDetailContent() {

// ข้อมูลสำหรับรายละเอียดผู้สร้าง
const [productionCredits] = useState({
  director: "Sze-Yu Lau",
  writer: "Jing-Kong Tsui",
  stars: ["Stephen Chow", "Bill Tung", "Stanley Sui-Fan Fung"],
  producer: "Tin-Chi Lau",
  composer: "Sherman Chow",
  cinematographer: "Wen-Yun Huang",
  editor: "Hsing-Lung Chiang",
  artDirector: "Frederick Chan",
  costumeDesigner: "Suk-Wah Chiu",
  productionManager: "Lee-Wah Chan",
  stunts: "To-Hoi Kong",
  lightingTechnician: "Shu-wah Chan",
  scriptSupervisor: "Pony Mok",
  productionAdvisor: "Susanna Tsang",
  props: "Siu Kwok"
});

// ข้อมูลสำหรับ Top Cast (รูปวงกลม)
const [topCast] = useState([
  { name: "Stephen Chow", character: "Hsing", img: "https://i.pravatar.cc/150?u=1" },
  { name: "Bill Tung", character: "Chang Piao", img: "https://i.pravatar.cc/150?u=2" },
  { name: "Stanley Sui-Fan Fung", character: "Chin", img: "https://i.pravatar.cc/150?u=3" },
  { name: "Vivian Chen", character: "Yu", img: "https://i.pravatar.cc/150?u=4" },
  { name: "Kong Fong", character: "Tang Lee Yang", img: "https://i.pravatar.cc/150?u=5" },
  { name: "Siu-Wai Mui", character: "Beautiful", img: "https://i.pravatar.cc/150?u=6" },
]);  
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [video, setVideo] = useState<PeacePlayVideo | null>(null);

  // State สำหรับเก็บคะแนนที่ User ให้ (null คือยังไม่เคยเรท)
const [userRating, setUserRating] = useState<number | null>(null);
const [tempRating, setTempRating] = useState(0); // คะแนนชั่วคราวใน Modal
const { isOpen: isRateModalOpen, onOpen: onOpenRateModal, onOpenChange: onRateModalChange } = useDisclosure();

// ข้อมูลจำลองสถิติคะแนน (อิงตามภาพ 1)
const ratingStats = [
  { score: 10, percent: 54.9, count: "1.7M" },
  { score: 9, percent: 25.9, count: "818K" },
  { score: 8, percent: 11.8, count: "372K" },
  { score: 7, percent: 3.7, count: "117K" },
  { score: 6, percent: 1.1, count: "35K" },
  { score: 5, percent: 0.6, count: "18K" },
  { score: 4, percent: 0.3, count: "8.4K" },
  { score: 3, percent: 0.2, count: "6.1K" },
  { score: 2, percent: 0.2, count: "5.6K" },
  { score: 1, percent: 1.4, count: "44K" },
];

  // --- States ---
  const [activeTab, setActiveTab] = useState("เกี่ยวกััับ");
  const [posts, setPosts] = useState<ForumPost[]>([]); 
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);

  // Form States
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [postType, setPostType] = useState<"Discussion" | "Question">("Discussion");
  const [replyText, setReplyText] = useState("");

  const videoContents = [
    { id: 1, title: "เล่าถึงชีวิต เจิด", duration: "00:30" },
    { id: 2, title: "เรื่องราวของเจียง", duration: "00:15" },
    { id: 3, title: "การทำงานกับโลกภายในของตนเอง", duration: "00:30" },
    { id: 4, title: "ยอมรับ", duration: "00:15" },
  ];

  const [scripts] = useState([
  {
    id: 1,
    title: "Breaking Bad 101: Pilot",
    description: "Diagnosed with terminal lung cancer, chemistry teacher Walter White teams up with former student Jesse Pinkman to cook and sell crystal meth.",
    buttonText: "Read Screenplay - Pilot",
    url: "https://f004.backblazeb2.com/file/screenplays/posts/breaking-bad-2008/scripts/Breaking%20Bad%20-%20Release.pdf"
  },
  {
    id: 2,
    title: "Breaking Bad 104: Gray Matter",
    description: "Walt rejects everyone who tries to help him with the cancer. Jesse tries his best to create Walt's meth, with the help of an old friend.",
    buttonText: "Read Screenplay - Gray Matter",
    url: "https://f004.backblazeb2.com/file/screenplays/posts/breaking-bad-2008/scripts/Breaking%20Bad%20-%20Release.pdf"
  },
  {
    id: 3,
    title: "Breaking Bad 301: No Mas",
    description: "Skyler goes through with her plans to divorce Walt. Jesse finishes rehab.",
    buttonText: "Read Screenplay - No Mas",
    url: "https://f004.backblazeb2.com/file/screenplays/posts/breaking-bad-2008/scripts/Breaking%20Bad%20-%20Release.pdf"
  },
  {
    id: 4,
    title: "Breaking Bad 303: I.F.T.",
    description: "Walt has moved back into the house without Skyler's consent. Now she can't get him out. Meanwhile, Jesse continues to cope with Jane's death.",
    buttonText: "Read Screenplay - I.F.T.",
    url: "https://f004.backblazeb2.com/file/screenplays/posts/breaking-bad-2008/scripts/Breaking%20Bad%20-%20Release.pdf"
  },
  {
    id: 5,
    title: "Breaking Bad 305: Más",
    description: "Gus tries to get Walt back in the business by offering him three million dollars and a brand new lab. Jesse is furious that Walt received half of the money for his blue meth. Hank tries to track down the RV meth lab.",
    buttonText: "Read Screenplay - Más",
    url: "https://f004.backblazeb2.com/file/screenplays/posts/breaking-bad-2008/scripts/Breaking%20Bad%20-%20Release.pdf"
  }
]);
  useEffect(() => {
    if (id) {
      getVideoById(id).then(setVideo);
    }
  }, [id]);

  // --- Handlers ---
  const handleAddPost = () => {
    if (!newTitle || !newContent) return alert("กรุณากรอกหัวข้อและเนื้อหา");
    const newPost: ForumPost = {
      id: Date.now(),
      user: "You",
      title: newTitle,
      content: newContent,
      date: "Just now",
      type: postType,
      replies: []
    };
    setPosts([newPost, ...posts]);
    setIsAddingPost(false);
    setNewTitle("");
    setNewContent("");
    setSelectedPost(newPost);
  };

  const handleReply = () => {
    if (!replyText || !selectedPost) return;
    const newReply: Reply = {
      id: Date.now(),
      user: "You",
      content: replyText,
      date: "Just now"
    };
    const updatedPosts = posts.map(p => p.id === selectedPost.id ? { ...p, replies: [...p.replies, newReply] } : p);
    setPosts(updatedPosts);
    setSelectedPost({ ...selectedPost, replies: [...selectedPost.replies, newReply] });
    setReplyText("");
  };
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  if (!video) return <div className="p-10 text-center text-white">Loading...</div>;

  return (
    <>
      {/* 1. Hero Section */}
      <div className="relative flex h-[300px] lg:h-[800px] w-full mix-blend-overla mt-[0px]">
        <Image src={video.thumbnailUrl || "/assets/image8.png"} className="object-cover" alt={video.title} fill />
        <div className="absolute top-[35%] px-20 w-full z-10">
          <p className="text-white text-7xl mb-4">{video.title}</p>
          <p className="text-white text-base tracking-widest">{video.resolution} | {Number(video.duration / 60).toFixed(0)}m | {video.format}</p>
          <div className="my-8 border opacity-55" />
          <div className="flex gap-3 justify-between">
            <div className="flex gap-5">
              <Image width={176} height={270} src={video.thumbnailUrl || "/assets/image8.png"} className="object-cover rounded-lg h-[270px]" alt={video.title} />
              <div className="w-[80%]">
                <p className="text-white font-extrabold text-lg mb-2">Created by : User {video.userId}</p>
                <p className="text-white font-extrabold tracking-widest">{video.description}</p>
                <div className="flex justify-start gap-2 mt-6">
                  {["Fantasy", "Family", "Music"].map(cat => (
                    <Button key={cat} className="bg-none text-white text-[10px] md:text-[12px] w-10" variant="bordered" radius="full" fullWidth>{cat}</Button>
                  ))}
                </div>
              </div>
            </div>
            <Card className="w-[290px] h-[260px] border-none bg-transparent shadow-none">
              <CardBody className="justify-center items-center pb-0">
                <CircularProgress classNames={{ value: "text-3xl font-semibold text-white", indicator: "stroke-[#E0CC3F]", track: "stroke-slate-500 opacity-40" }} value={7.5} maxValue={10} strokeWidth={4} showValueLabel />
              </CardBody>
              <CardFooter className="justify-center items-center pt-0">
                <Chip variant="bordered" classNames={{ content: "text-white/90 text-2xl font-semibold" }}>Rating</Chip>
              </CardFooter>
            </Card>
          </div>
        </div>
        <div className="absolute bottom-[-1px] bg-gradient-to-t from-[#211208] to-none w-full h-[400px]"></div>
      </div>

      <div className="bg-[#211208]">
        <div className="container mx-auto px-8 py-8">
          {/* Header Info */}
          <div className="hidden md:block">
            <div className="flex justify-between mt-6">
              <div>
                <div className="text-white text-[24px] py-1">ID : TN00025</div>
                <div className="text-white text-[32px] py-2">สัปเหร่อ (จักรวาลไทบ้าน)</div>
              </div>
              <div className="w-[300px] h-[100px] flex gap-2">
                <Button className="bg-[#2F5D86] text-white text-[18px] w-1/2" radius="sm" onPress={() => router.push(`/project/projectDetail/contents/video?id=${video?.videoId}`)}>รับชม</Button>
                <Button className="bg-white text-[#2F5D86] border border-[#2F5D86] text-[18px] w-1/2" radius="sm" onPress={onOpen}>ซื้อสคริป</Button>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-2 py-4 text-white">
            <span className="flex items-center gap-1 text-[10px] md:text-[16px]">
               <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor"><path d="M8 7.33a2.33 2.33 0 1 0 0-4.66 2.33 2.33 0 0 0 0 4.66ZM4.7 10.7a4.67 4.67 0 0 0 6.6 0" strokeLinecap="round"/></svg>
               500 ผู้เรียน
            </span>
            <span className="flex items-center gap-1 px-6 text-[10px] md:text-[16px]">
               <svg width="12" height="14" viewBox="0 0 12 14" fill="none" stroke="currentColor"><path d="M1.33 2.33V11.66A1.33 1.33 0 0 0 2.66 13H9.33A1.33 1.33 0 0 0 10.66 11.66V5.27L6.86 1.2A.67.67 0 0 0 6.39 1H2.66A1.33 1.33 0 0 0 1.33 2.33Z" strokeLinecap="round"/></svg>
               5 ยูนิต
            </span>
            <span className="flex items-center gap-1 text-[10px] md:text-[16px]">
               <svg width="20" height="18" viewBox="0 0 20 18" fill="#FFD100"><path d="M9.04 1.22c.28-.95 1.63-.95 1.91 0l1.36 4.56h4.75c1 0 1.41 1.28.6 1.84l-3.92 2.7 1.58 4.48c.33.94-.76 1.73-1.55 1.13L10 14.77l-3.77 2.89c-.79.6-1.88-.2-1.55-1.13l1.58-4.48-3.92-2.7c-.81-.56-.4-1.84.6-1.84h4.75L9.04 1.22Z"/></svg>
               4.8 (รีวิว 2K)
            </span>
          </div>

          <div className="text-white text-[10px] md:text-[16px] pb-4">ผู้เขียน</div>
          <div className="flex gap-2 items-center mb-6">
             <div className="bg-[#D9D9D9] p-5 rounded-full"></div>
             <p className="text-[10px] md:text-[16px] text-white">สุรศักดิ์ ป้องศร</p>
          </div>

          {/* ส่วน ภาพรวม (Overview) - แก้ไขเพิ่มกลับมาให้แล้ว */}
          <div className="text-white text-[12px] md:text-[20px] pt-4 mb-4">ภาพรวม</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white mb-8 pt-4">
             <div className="flex items-center gap-3 py-2">
                <svg width="24" height="24" fill="none" stroke="currentColor"><path d="M12 5c-4.48 0-8.27 2.94-9.54 7 1.27 4.06 5.06 7 9.54 7s8.27-2.94 9.54-7c-1.27-4.06-5.06-7-9.54-7ZM12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" strokeLinecap="round"/></svg>
                <p className="text-sm">124 การดู</p>
             </div>
             <div className="flex items-center gap-3 py-2">
                <svg width="24" height="24" fill="none" stroke="currentColor"><path d="M12 3v9l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" strokeLinecap="round"/></svg>
                <p className="text-sm">ระยะเวลาที่คาดหวัง : 01:30:00</p>
             </div>
             <div className="flex items-center gap-3 py-2">
                <svg width="24" height="24" fill="none" stroke="currentColor"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z" strokeLinecap="round"/></svg>
                <p className="text-sm">ระยะเวลาการลงทะเบียน : ไม่มีวันหมดอายุ</p>
             </div>
             <div className="flex items-center gap-3 py-2">
                <svg width="24" height="24" fill="none" stroke="currentColor"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z" strokeLinecap="round"/></svg>
                <p className="text-sm">ระยะเวลาหลักสูตร : 01 ม.ค. 2566 - 31 ธ.ค. 2566</p>
             </div>
          </div>

          {/* Gallery 3x3 */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            {[...Array(9)].map((_, i) => (
              <div key={i}><Image width={500} height={500} className="rounded-lg" src={`https://flowbite.s3.amazonaws.com/docs/gallery/square/image${i === 0 ? '' : '-' + i}.jpg`} alt=""/></div>
            ))}
          </div>

          {/* Tabs Section */}
          <div className="flex w-full flex-col pt-5">
            <div className="flex border-b border-[#444] gap-2">
              {["เกี่ยวกับ", "เนื้อหา", "บทสคริป", "รีวิว", "การสนทนา"].map(label => (
                <button
                  key={label}
                  onClick={() => setActiveTab(label === "เกี่ยวกับ" ? "เกี่ยวกััับ" : label)}
                  className={`px-4 py-2 text-white transition-all ${activeTab === (label === "เกี่ยวกับ" ? "เกี่ยวกััับ" : label) ? 'font-bold border-b-3 border-[#FFD100] text-[#FFD100]' : ''}`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="pt-4">
              {activeTab === "เกี่ยวกััับ" && (
  <div className="text-white space-y-8 animate-appearance-in pb-10">
    {/* --- ส่วนรายละเอียดเบื้องต้น (ภาพที่ 1) --- */}
    <div className="space-y-4 border-b border-white/10 pb-6">
      <div className="flex gap-4 items-center border-b border-white/10 pb-3">
        <span className="font-bold w-20">Director</span>
        <span className="text-blue-400 cursor-pointer hover:underline">{productionCredits.director}</span>
      </div>
      <div className="flex gap-4 items-center border-b border-white/10 pb-3">
        <span className="font-bold w-20">Writer</span>
        <span className="text-blue-400 cursor-pointer hover:underline">{productionCredits.writer}</span>
      </div>
      <div className="flex gap-4 items-center border-b border-white/10 pb-3">
        <span className="font-bold w-20">Stars</span>
        <div className="flex gap-2 text-blue-400 overflow-x-auto whitespace-nowrap">
          {productionCredits.stars.map((star, idx) => (
            <span key={star} className="hover:underline cursor-pointer">
              {star}{idx !== productionCredits.stars.length - 1 && " •"}
            </span>
          ))}
        </div>
      </div>
    </div>

    {/* --- ส่วน Top Cast (ภาพที่ 2) --- */}
    <div>
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1 h-6 bg-[#FFD100]"></div>
        <h3 className="text-2xl font-bold">Top Cast <span className="text-gray-400 text-lg font-normal">26 {">"}</span></h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topCast.map((cast) => (
          <div key={cast.name} className="flex items-center gap-4 group">
            <div className="relative">
              <Image 
                src={cast.img} 
                width={80} height={80} 
                className="rounded-full object-cover border-2 border-transparent group-hover:border-[#FFD100] transition-all" 
                alt={cast.name} 
              />
              <button className="absolute bottom-0 right-0 bg-[#1a1a1a] rounded-full p-1 border border-white/20 hover:text-red-500 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </button>
            </div>
            <div>
              <p className="font-bold text-lg hover:text-blue-400 cursor-pointer transition-colors">{cast.name}</p>
              <p className="text-gray-400">{cast.character}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* --- ส่วนรายละเอียดทีมงานทั้งหมด (ภาพที่ 3, 4, 5) --- */}
    <div className="space-y-6 pt-6">
      {[
        { title: "Producer", name: productionCredits.producer },
        { title: "Composer", name: productionCredits.composer },
        { title: "Cinematographer", name: productionCredits.cinematographer },
        { title: "Editor", name: productionCredits.editor },
        { title: "Art Director", name: productionCredits.artDirector },
        { title: "Costume Designer", name: productionCredits.costumeDesigner },
        { title: "Production Management", name: productionCredits.productionManager, role: "production manager" },
        { title: "Stunts", name: productionCredits.stunts, role: "action designer" },
        { title: "Camera and Electrical", name: productionCredits.lightingTechnician, role: "lighting technician" },
        { title: "Script and Continuity", name: productionCredits.scriptSupervisor, role: "script supervisor" },
      ].map((section) => (
        <div key={section.title}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-5 bg-[#FFD100]"></div>
            <h4 className="text-xl font-bold">{section.title}</h4>
          </div>
          <div className="bg-white/5 rounded-md p-3 flex justify-between items-center group hover:bg-white/10 transition-colors">
            <span className="text-blue-400 font-bold cursor-pointer hover:underline">{section.name}</span>
            <span className="text-gray-400 text-sm italic">{section.role || "..."}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
)}


              {activeTab === "เนื้อหา" && (
                <div className="flex flex-col gap-2">
                  {videoContents.map((item) => (
                    <button key={item.id} className="flex items-center justify-between bg-[#2F5D86] hover:bg-[#FFD100]/20 text-white rounded-lg px-4 py-3 mb-2 border border-[#FFD100] group">
                      <span className="group-hover:text-[#FFD100]">{item.title}</span>
                      <span className="text-xs text-[#FFD100]">{item.duration}</span>
                    </button>
                  ))}
                </div>
              )}

{activeTab === "บทสคริป" && (
  <div className="space-y-6 animate-appearance-in pb-10">
    {/* --- ส่วนหัวสคริปต์หลัก (สไตล์การ์ดใหญ่) --- */}
    <div className="bg-white rounded-xl overflow-hidden shadow-lg flex flex-col md:flex-row">
      <div className="w-full md:w-[300px] relative h-[300px] md:h-auto">
        <Image 
          src="https://m.media-amazon.com/images/M/MV5BMjhiMzgxZTctNDc1Ni00OTIxLTlhMTYtZTA3ZWFkODRkNmE2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg" 
          fill className="object-cover" alt="Main Screenplay" 
        />
      </div>
      <div className="flex-1 p-8 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Breaking Bad Screenplay</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.
        </p>
        <Button className="bg-[#FF6B00] text-white font-bold h-12 text-lg hover:bg-[#e66000]">
          Read Screenplay - Release
        </Button>
        <div className="flex flex-wrap gap-2 mt-6">
          {["Crime", "Drama", "Thriller", "Vince Gilligan", "Patty Lin"].map(tag => (
            <span key={tag} className="bg-gray-200 text-gray-600 text-[10px] px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>

    {/* --- รายการสคริปต์ตอนย่อย (สไตล์ List การ์ด) --- */}
    <div className="space-y-4">
      {scripts.map((script) => (
        <div key={script.id} className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{script.title}</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {script.description}
          </p>
          <Button 
            className="w-full bg-[#FF6B00] text-white font-bold h-12 text-lg hover:bg-[#e66000] transition-colors" onPress={() => window.open(script.url, "_blank")}
          >
            {script.buttonText}
          </Button>
        </div>
      ))}
    </div>
  </div>
)}

{activeTab === "รีวิว" && (
  <div className="bg-white rounded-xl p-8 animate-appearance-in text-black">
    {/* ถ้ายังไม่เคยเรท ให้แสดงปุ่มใหญ่เพื่อเปิด Modal หรือแสดงผลลัพธ์ถ้าเรทแล้ว */}
    {!userRating ? (
      <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-200 rounded-xl">
        <p className="text-gray-500 mb-4">คุณยังไม่ได้ให้คะแนนโปรเจกต์นี้</p>
        <Button 
          className="bg-[#FFD100] font-bold text-black px-10" 
          onPress={onOpenRateModal}
        >
          ให้คะแนนตอนนี้
        </Button>
      </div>
    ) : (
      <div className="space-y-10">
        {/* --- Section 1: IMDb Rating (ภาพ 1) --- */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-6 bg-[#FFD100]"></div>
            <h3 className="text-2xl font-bold">IMDb rating</h3>
          </div>
          <p className="text-gray-500 mb-6">The IMDb rating is weighted to help keep it reliable. <span className="text-blue-600 cursor-pointer">Learn more</span></p>
          
          <div className="flex gap-20">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">IMDb RATING</p>
              <div className="flex items-center gap-2">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#FFD100"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <div>
                  <p className="text-xl font-bold">9.3<span className="text-gray-400 font-normal">/10</span></p>
                  <p className="text-xs text-gray-400">3.2M</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">YOUR RATING</p>
              <div 
                className="flex items-center gap-2 text-blue-600 cursor-pointer"
                onClick={onOpenRateModal}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <p className="text-xl font-bold">★ {userRating}<span className="text-gray-400 font-normal">/10</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Section 2: User ratings Chart (ภาพ 1 & 2) --- */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-6 bg-[#FFD100]"></div>
            <h3 className="text-2xl font-bold">User ratings</h3>
          </div>
          
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">FILTER BY COUNTRY</p>
          <p className="text-xs text-gray-400 mb-4">Countries with the most ratings</p>
          
          <div className="flex gap-0 border rounded-lg overflow-hidden w-fit mb-8">
            {["United States", "United Kingdom", "India", "Turkey", "Germany"].map((c, i) => (
              <button key={c} className={`px-4 py-2 text-sm border-r last:border-0 hover:bg-gray-50 ${i===0 ? 'text-blue-600 font-bold' : ''}`}>{c}</button>
            ))}
          </div>

          {/* Bar Chart */}
          <div className="space-y-2 max-w-4xl">
            {ratingStats.map((item) => (
              <div key={item.score} className="flex items-center gap-4 text-sm">
                <span className="w-4 font-bold">{item.score}</span>
                <div className="flex-1 bg-gray-100 h-8 rounded-sm overflow-hidden">
                  <div 
                    className="bg-[#FFD100] h-full transition-all duration-1000" 
                    style={{ width: `${item.percent}%` }}
                  ></div>
                </div>
                <span className="w-32 text-gray-500">{item.percent}% ({item.count})</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm font-bold">9.2 Unweighted mean</p>
        </section>
      </div>
    )}
  </div>
)}
              {/* Tab รีวิว (Forum System) */}
              {activeTab === "การสนทนา" && (
                <div className="flex flex-col md:flex-row bg-[#f8f9fa] rounded-xl overflow-hidden min-h-[600px] border border-gray-200">
                  {/* Sidebar (รายการโพสต์) */}
                  <div className="w-full md:w-1/3 border-r border-gray-200 bg-white overflow-y-auto">
                  
                    {/* <div className="p-4 border-b text-gray-500 font-bold text-xs uppercase bg-gray-50">All posts</div> */}
                    <div className="p-4 border-b flex justify-between items-center bg-white sticky top-0 z-10">
                      <span className="text-blue-700 font-medium text-sm">All posts sorted by recent activity</span>
                      <Button isIconOnly variant="light" size="sm" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2"><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/></svg>
                      </Button>
                    </div>
                    {isFilterOpen && (
                      <div className="p-6 bg-white border-b grid grid-cols-3 gap-8 shadow-inner animate-appearance-in">
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-2 text-sm text-gray-800 font-medium"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="4"><path d="M20 6L9 17L4 12"/></svg> Show all</div>
                          <div className="pl-6 text-sm text-gray-600 hover:text-blue-600 cursor-pointer">Discussions</div>
                          <div className="pl-6 text-sm text-gray-600 hover:text-blue-600 cursor-pointer">Questions</div>
                        </div>
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-2 text-sm text-gray-800 font-medium"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="4"><path d="M20 6L9 17L4 12"/></svg> Any status</div>
                          <div className="pl-6 text-sm text-gray-600 hover:text-blue-600 cursor-pointer">Unread</div>
                          <div className="pl-6 text-sm text-gray-600 hover:text-blue-600 cursor-pointer">Following</div>
                          <div className="pl-6 text-sm text-gray-600 hover:text-blue-600 cursor-pointer">Unanswered</div>
                          <div className="pl-6 text-sm text-gray-600 hover:text-blue-600 cursor-pointer">Not responded</div>
                        </div>
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-2 text-sm text-gray-800 font-medium"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="4"><path d="M20 6L9 17L4 12"/></svg> Recent activity</div>
                          <div className="pl-6 text-sm text-gray-600 hover:text-blue-600 cursor-pointer">Most activity</div>
                          <div className="pl-6 text-sm text-gray-600 hover:text-blue-600 cursor-pointer">Most likes</div>
                        </div>
                      </div>
                    )}
                    {posts.length === 0 ? <p className="p-10 text-center text-gray-400">No posts found</p> : posts.map(p => (
                      <div 
                        key={p.id} 
                        onClick={() => { setSelectedPost(p); setIsAddingPost(false); }} 
                        className={`p-4 border-b cursor-pointer transition-all ${selectedPost?.id === p.id ? 'bg-blue-100 border-l-4 border-l-blue-600 shadow-inner' : 'hover:bg-gray-50'}`}
                      >
                        <p className={`font-bold text-sm truncate ${selectedPost?.id === p.id ? 'text-blue-800' : 'text-blue-600'}`}>{p.title}</p>
                        <p className="text-gray-400 text-xs mt-1">{p.user} • {p.date}</p>
                      </div>
                    ))}
                  </div>

                  {/* Main Content Area */}
                  <div className="flex-1 p-4 bg-white relative overflow-y-auto">
                    <div className="flex justify-end mb-4"><Button className="bg-[#9c0a42] text-white" size="sm" onClick={() => { setIsAddingPost(true); setSelectedPost(null); }}>Add a post</Button></div>
                    
                    {/* UI สร้างโพสต์ใหม่ */}
                    {isAddingPost && (
                      <div className="max-w-xl mx-auto text-black">
                        <h3 className="text-xl font-bold mb-4">Add a post</h3>
                        <div className="flex gap-2 mb-4">
                          <Button variant={postType==='Discussion'?'solid':'bordered'} color="primary" size="sm" onClick={()=>setPostType('Discussion')}>Discussion</Button>
                          <Button variant={postType==='Question'?'solid':'bordered'} color="primary" size="sm" onClick={()=>setPostType('Question')}>Question</Button>
                        </div>
                        <input className="w-full border p-2 mb-4 rounded text-black" placeholder="Post title" value={newTitle} onChange={e=>setNewTitle(e.target.value)} />
                        
                        {/* Editor ครอบด้วยสีขาวเพื่อให้เห็นตัวหนังสือ */}
                        <div className="bg-white text-black mb-14">
                          <ReactQuill theme="snow" value={newContent} onChange={setNewContent} className="h-48 text-black" />
                        </div>

                        <div className="flex justify-end gap-2"><Button variant="flat" onClick={()=>setIsAddingPost(false)}>Cancel</Button><Button color="primary" onClick={handleAddPost}>Submit</Button></div>
                      </div>
                    )}

                    {/* UI แสดงโพสต์และการตอบกลับ */}
                    {selectedPost && !isAddingPost && (
                      <div className="text-black">
                        <h2 className="text-2xl font-bold text-blue-800 mb-2">{selectedPost.title}</h2>
                        <p className="text-gray-400 text-sm mb-6 pb-4 border-b">Created by <span className="text-blue-600">{selectedPost.user}</span> • {selectedPost.date}</p>
                        <div className="prose prose-sm max-w-none mb-10" dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
                        
                        <div className="mt-10 pt-6 border-t">
                          <p className="font-bold text-gray-700 mb-4">Responses ({selectedPost.replies.length})</p>
                          {selectedPost.replies.map(r => (
                            <div key={r.id} className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-100">
                              <p className="text-blue-600 font-bold text-xs mb-2">{r.user} <span className="text-gray-400 font-normal ml-2">{r.date}</span></p>
                              <div className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: r.content }} />
                            </div>
                          ))}

                          {/* Editor สำหรับตอบกลับ (แก้ไขตามต้องการ) */}
                          <div className="mt-8">
                             <p className="text-xs font-bold text-gray-400 mb-2">ADD RESPONSE</p>
                             <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
                                <ReactQuill theme="snow" value={replyText} onChange={setReplyText} className="text-black" placeholder="Write your response here..." />
                                <div className="p-3 bg-gray-50 flex justify-end gap-2 border-t">
                                   <Button size="sm" variant="flat" onClick={()=>setReplyText("")}>Clear</Button>
                                   <Button size="sm" color="primary" onClick={handleReply}>Submit</Button>
                                </div>
                             </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {!isAddingPost && !selectedPost && (
                      <div className="h-full flex flex-col items-center justify-center text-gray-300">
                        <svg className="w-16 h-16 opacity-10 mb-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
                        <p>Select a post to read or click "Add a post" to start</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="text-white text-[12px] md:text-[32px] py-10">เนื้อหาใกล้เคียง</div>
          <div className="block md:flex items-center gap-4 flex-wrap">
            {[1, 2, 3, 4, 5, 6].map((_, i) => (
              <div className="w-full md:w-[31.5%] lg:w-[32%] xl:w-[24%] mb-3" key={i}><Cards /></div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
<Modal 
  isOpen={isRateModalOpen} 
  onOpenChange={onRateModalChange}
  hideCloseButton
  size="xl"
  classNames={{
    base: "bg-[#1a1a1a] text-white overflow-visible",
  }}
>
  <ModalContent>
    {(onClose) => {
      // ใช้ State ภายใน Modal เพื่อจัดการความลื่นไหล
      const [hoverRating, setHoverRating] = useState(0);
      const [selectedRating, setSelectedRating] = useState(0);

      const handleRateSubmit = () => {
        if (selectedRating > 0) {
          setUserRating(selectedRating); // บันทึกค่าจริงลง Global State
          onClose(); // ปิด Modal
        }
      };

      return (
        <div className="relative py-12 px-6 flex flex-col items-center">
          {/* ปุ่มปิดมุมขวา */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:opacity-70 z-50"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>

          {/* ดาวสีฟ้าดวงใหญ่ด้านบน */}
          <div className="absolute -top-12 flex justify-center w-full">
             <div className="relative flex items-center justify-center">
                <svg width="100" height="100" viewBox="0 0 24 24" fill="#5799ef">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                {/* แสดงผลตามการ Hover ถ้าไม่ได้ Hover ให้แสดงตามที่เลือก */}
                <span className="absolute text-white text-2xl font-bold">
                  {hoverRating || selectedRating || "?"}
                </span>
             </div>
          </div>

          <p className="text-[#FFD100] font-bold text-xs tracking-widest mb-2 mt-4 uppercase">RATE THIS</p>
          <h2 className="text-2xl font-bold mb-8 text-center">{video?.title || "The Shawshank Redemption"}</h2>

          {/* ส่วนดาว 10 ดวง */}
          <div 
            className="flex gap-1 mb-10"
            onMouseLeave={() => setHoverRating(0)} // ล้างค่า hover เมื่อเมาส์ออกจากพื้นที่ดาว
          >
            {[...Array(10)].map((_, i) => {
              const ratingValue = i + 1;
              // ตัดสินใจว่าดาวควรเป็นสีอะไร (สีฟ้าถ้า hover ถึง หรือเลือกถึง)
              const isActive = (hoverRating || selectedRating) >= ratingValue;
              
              return (
                <button
                  key={i}
                  onMouseEnter={() => setHoverRating(ratingValue)}
                  onClick={() => setSelectedRating(ratingValue)}
                  className="transition-transform hover:scale-125 focus:outline-none"
                  type="button"
                >
                  <svg 
                    width="32" height="32" viewBox="0 0 24 24" 
                    fill={isActive ? "#5799ef" : "none"} 
                    stroke={isActive ? "#5799ef" : "white"} 
                    strokeWidth="1.5"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </button>
              );
            })}
          </div>

          {/* ปุ่ม Rate */}
          <Button 
            className={`w-full max-w-xs font-bold text-lg h-12 transition-colors ${
              selectedRating > 0 
                ? 'bg-[#FFD100] text-black hover:bg-[#e6bc00]' 
                : 'bg-[#333] text-gray-500 cursor-not-allowed'
            }`}
            isDisabled={selectedRating === 0}
            onPress={handleRateSubmit}
          >
            {selectedRating > 0 ? `Rate ${selectedRating}/10` : 'Rate'}
          </Button>
        </div>
      );
    }}
  </ModalContent>
</Modal>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader />
              <ModalBody className="text-center">
                <Image src="/assets/image13.png" width={130} height={125} alt="" className="mx-auto mb-4" />
                <p className="text-xl">คุณได้ลงทะเบียนเรียบร้อยแล้ว<br/>รอการอนุมัติจากเจ้าหน้าที่...</p>
              </ModalBody>
              <ModalFooter><Button color="danger" variant="light" onPress={onClose}>ปิด</Button><Button color="primary" onPress={onClose}>รับทราบ</Button></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}


export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectDetailContent />
    </Suspense>
  );
}