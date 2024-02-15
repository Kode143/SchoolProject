import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const{data: session} = useSession();

  return <Layout>
  <div className="flex justify-between">
  <h1>
  Welcome, <b> {session?.user?.name} </b>
  </h1>
  <div className="bg-gray-700 flex text-white gap-1 rounded-lg overflow-hidden">
    <img src={session?.user?.image} alt="/" className="w-10 h-10"/>
    <span className="py-1 px-2">
    {session?.user?.name}
    </span>
  
  </div>
  </div>
  </Layout>
}