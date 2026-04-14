import Image from 'next/image';

export default function Home() {
  return (
    <div className="mg-flex mg-flex-col mg-flex-1 mg-items-center mg-justify-center mg-bg-zinc-50 mg-font-sans dark:mg-bg-black">
      <main className="mg-flex mg-flex-1 mg-w-full mg-max-w-3xl mg-flex-col mg-items-center mg-justify-between mg-py-32 mg-px-16 mg-bg-white dark:mg-bg-black sm:mg-items-start">
        <Image
          className="dark:mg-invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="mg-flex mg-flex-col mg-items-center mg-gap-6 mg-text-center sm:mg-items-start sm:mg-text-left">
          <h1 className="mg-max-w-xs mg-text-3xl mg-font-semibold mg-leading-10 mg-tracking-tight mg-text-black dark:mg-text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="mg-max-w-md mg-text-lg mg-leading-8 mg-text-zinc-600 dark:mg-text-zinc-400">
            Looking for a starting point or more instructions? Head over to{' '}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="mg-font-medium mg-text-zinc-950 dark:mg-text-zinc-50"
            >
              Templates
            </a>{' '}
            or the{' '}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="mg-font-medium mg-text-zinc-950 dark:mg-text-zinc-50"
            >
              Learning
            </a>{' '}
            center.
          </p>
        </div>
        <div className="mg-flex mg-flex-col mg-gap-4 mg-text-base mg-font-medium sm:mg-flex-row">
          <a
            className="mg-flex mg-h-12 mg-w-full mg-items-center mg-justify-center mg-gap-2 mg-rounded-full mg-bg-foreground mg-px-5 mg-text-background mg-transition-colors hover:mg-bg-[#383838] dark:hover:mg-bg-[#ccc] md:mg-w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:mg-invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="mg-flex mg-h-12 mg-w-full mg-items-center mg-justify-center mg-rounded-full mg-border mg-border-solid mg-border-black/[.08] mg-px-5 mg-transition-colors hover:mg-border-transparent hover:mg-bg-black/[.04] dark:mg-border-white/[.145] dark:hover:mg-bg-[#1a1a1a] md:mg-w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
