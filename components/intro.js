import { useRouter } from "next/router";

export default function Intro() {
  const { locale } = useRouter();
  const formatedLocale = locale.split("-")[0];
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Blog.
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        {formatedLocale == "en"
          ? "A statically generated blog example using"
          : "Un esempio di blog generato staticamente utilizzando"}{" "}
        <a
          href="https://nextjs.org/"
          className="underline hover:text-success duration-200 transition-colors"
        >
          Next.js
        </a>{" "}
        {formatedLocale == "en" ? "and" : "e"}{" "}
        <a
          href="https://www.datocms.com/"
          className="underline hover:text-success duration-200 transition-colors"
        >
          DatoCMS
        </a>
        .
      </h4>
    </section>
  );
}
