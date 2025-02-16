"use client";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { FileUploader } from "@/components/Uploader";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { useFirebase } from "./firebase/config";
import { useState, useEffect } from "react";
import { User } from "firebase/auth";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const firebase = useFirebase();

  useEffect(() => {
    if (firebase) {
      const { auth } = firebase;
      const validateState = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          // console.log("User: ", user);
          // const uid = user.uid;
          setUser(user);
          // console.log("UID: ", uid);
          // ...
        } else {
          // User is signed out
          // ...
          console.log("User not found");
          router.push("/login");
        }
      });

      // Cleanup subscription on unmount
      return () => validateState();
    }
  }, [firebase, router]);

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
              <FileUploader user={{uid: user?.uid || '', }}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
