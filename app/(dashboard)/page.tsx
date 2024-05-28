import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { getAuth } from "@clerk/nextjs/server";

export default function Home() {
  // console.log('getAuth',getAuth);
  return (
    <div>
      <UserButton />
    </div>
  );
}
