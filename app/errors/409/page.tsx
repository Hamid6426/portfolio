import { MdErrorOutline } from "react-icons/md";

// app/400/page.tsx
export default function ResourceConflict() {
  return (
    <div className="absolute top-0 w-full h-screen flex items-center justify-center bg-[#000010]">
      <div className="text-[#4499ff] w-full py-8 max-w-[240px] border-[#49f] border-2 aspect-video flex flex-col gap-4 justify-center items-center">
        <MdErrorOutline className="text-5xl " />
        <h1 className="text-2xl font-bold">Resource Conflict!</h1>
        <h1 className="text-2xl font-bold">Error - 409</h1>
      </div>
    </div>
  );
}
