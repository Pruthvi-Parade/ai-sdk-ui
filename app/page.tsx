"use client";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { FileUploader } from "@/components/Uploader";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { useFirebase } from "./firebase/config";

export default function DashboardPage() {
  const router = useRouter();
  const firebase = useFirebase();
  if (firebase) {
    const { auth } = firebase;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        // console.log("User: ", user);
        // const uid = user.uid;
        // console.log("UID: ", uid);
        // ...
      } else {
        // User is signed out
        // ...
        console.log("User not found");
        router.push("/login");
      }
    });
  }
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
          <div className="container mx-auto px-[60px] py-8">
            <h3 className="text-foreground text-3xl font-medium">
              File Upload
            </h3>
            <div className="mt-8">
              <FileUploader />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
