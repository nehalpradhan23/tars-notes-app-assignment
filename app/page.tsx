import MainContainer from "@/components/main container/MainContainer";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="flex p-4 h-screen">
      <Sidebar />
      <MainContainer />
    </div>
  );
}
