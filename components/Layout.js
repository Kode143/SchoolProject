
import Nav from "@/components/Nav";
import { useSession, signIn, signOut } from "next-auth/react"

export default function Layout({children}) {
  const { data: session } = useSession();
  if (!session){

    return (
      
<div className='bg-cover bg-center bg-no-repeat h-screen flex flex-col items-center justify-center' style={{ backgroundImage: `url('/uploads/background.jpg')` }}>
  <div className="bg-neutral-200 rounded-3xl bg-opacity-60 flex flex-col items-center ps-8 pb-5">
    <h1 className="font-bold m-5 me-8 pe-5">Welcome to Golden Supervision Academy Admin Panel</h1>
    <h2 className="mb-5 me-5">Use School's Gmail ID to login or consult with Administration</h2>
    <div className="flex-grow flex flex-col items-center justify-center">
      <img src="/uploads/happy.gif" alt="GIFs" className="mb-5 h-44 w-full" />
      <button onClick={() => signIn('google')}
      className="bg-green-600 bg-opacity-90 p-2 px-4 rounded-xl
       hover:bg-red-600 hover:bg-opacity-90">Login with Google</button>
    </div>
  </div>
</div>




    )
  } 

  return (
    <div className="bg-gray-300 min-h-screen flex">
      <Nav />
<div className="bg-white flex-grow  mt-3 rounded-lg p-4 me-5 mb-3"> 
{children}
</div>
</div>
  )
}


