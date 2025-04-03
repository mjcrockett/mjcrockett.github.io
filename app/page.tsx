'use client';
// import Image from "next/image";
import Script from 'next/script';
import Avatar from '@/public/assets/scripts/avatar-library';
import { AvatarInstructions } from '@/public/assets/scripts/avatar-library';
// import { TestCl } from 'testfoo';
import { useEffect } from "react";

export default function Home() {
  // let a: Avatar;
  const instrux: AvatarInstructions = {
    mouthOpen: false,
    headTurn: "front", //"front", "left", "right"
    eyes: "front", //"front", "left", "right", "close"
    headRotate: 0,
    neckRotate: 0,
    hipsRotate: 0,
    chestRotate: 0,
    footLeftRotate: 0,
    legLeftLowerRotate: 0,
    legLeftUpperRotate: 0,
    footRightRotate: 0,
    legRightLowerRotate: 0,
    legRightUpperRotate: 0,
    handLeftRotate: 0,
    armLeftLowerRotate: 0,
    armLeftUpperRotate: 0,
    handRightRotate: 0,
    armRightLowerRotate: 0,
    armRightUpperRotate: 0,
    rightShrug: 0,
    leftShrug: 0,
    headShrug: 0
  };
  useEffect(() => {
    const a = new Avatar();
    window.addEventListener('avataronready', function (e) {
      console.log('avatar is ready:', e);
      a.go(instrux);
    });
  }, []);

  return (
    <div>
      <Script src="assets/scripts/createjs.min.js" strategy="beforeInteractive"/>
      {/* <Script src="./public/assets/scripts/avatar-library.js"  strategy="afterInteractive"/> */}
      <canvas id="cnvs" width="933" height="935"></canvas>

      {/* <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer> */}
    </div>
  );
}
function scriptLoaded() {
  throw new Error("Function not implemented.");
}

