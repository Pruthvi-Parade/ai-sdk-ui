import { NextResponse } from "next/server";
import * as pdfjsLib from "pdfjs-dist";
import { database } from "../../firebase/config"; // Import the database
import { push, ref } from "firebase/database"; // Import necessary functions from Firebase

// import { createCanvas, loadImage } from 'canvas'; // Required for Node.js rendering

// Set up PDF.js for Node.js environment
pdfjsLib.GlobalWorkerOptions.workerSrc = `${process.cwd()}/node_modules/pdfjs-dist/build/pdf.worker.js`;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files");

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files received" }, { status: 400 });
    }

    const processedFiles = await Promise.all(
      files.map(async (file: FormDataEntryValue) => {
        if (file instanceof File) {
          let content: string;
          let textContent: string | null = null;

          if (file.type === "application/pdf") {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({
              data: arrayBuffer,
            }).promise;

            const maxPages = pdf.numPages;
            const pageTextPromises = [];
            for (let pageNo = 1; pageNo <= maxPages; pageNo++) {
              const page = await pdf.getPage(pageNo);
              const textContent = await page.getTextContent();
              const pageText = textContent.items
                .map((item) => {
                  if ("str" in item) {
                    return item.str || "";
                  }
                  return "";
                })
                .join(" ");
              pageTextPromises.push(pageText);
              pageTextPromises.push(pageText);
            }
            textContent = (await Promise.all(pageTextPromises)).join("\n\n");
            content = Buffer.from(arrayBuffer).toString("base64");
            if (textContent) {
              try {
                const fileRef = ref(database, "documents"); // Create a reference for the file
                const data = await push(fileRef, { name: file.name }); // Store the file name in the database
                console.log("Data: ", data);
              } catch (error) {
                console.error("Error storing file in database:", error);
              }
            }
          } else if (
            file.type.startsWith("text/") ||
            file.type === "application/json" ||
            file.type === "application/javascript"
          ) {
            content = await file.text();
            textContent = content;
          } else {
            const buffer = await file.arrayBuffer();
            content = Buffer.from(buffer).toString("base64");
          }

          return {
            name: file.name,
            type: file.type,
            size: file.size,
            lastModified: file.lastModified,
            content: content,
            textContent: textContent,
            encoding: file.type.startsWith("text/") ? "text" : "base64",
          };
        }
        return null;
      })
    );

    const validFiles = processedFiles.filter(
      (file): file is NonNullable<typeof file> => file !== null
    );

    return NextResponse.json(
      {
        message: "Files uploaded successfully",
        fileCount: validFiles.length,
        files: validFiles,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing upload:", error);
    return NextResponse.json(
      {
        error: "Error processing upload",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
