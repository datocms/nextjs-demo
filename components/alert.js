import Container from "./container";
import cn from "classnames";
import { useRouter } from "next/router";

export default function Alert({ preview }) {
  const { locale } = useRouter();
  return (
    <div
      className={cn("border-b", {
        "bg-accent-7 border-accent-7 text-white": preview,
        "bg-accent-1 border-accent-2": !preview,
      })}
    >
      <Container>
        <div className="py-2 text-center text-sm">
          {preview ? (
            <>
              {locale == "en"
                ? "This is page is showing draft content."
                : "Questa pagina sta mostrando il contenuto bozza."}{" "}
              <a
                href="/api/exit-preview"
                className="underline hover:text-cyan duration-200 transition-colors"
              >
                {locale == "en" ? "Click here" : "Clicca qui"}
              </a>{" "}
              {locale == "en"
                ? "to exit preview mode."
                : "per uscire dalla modalità di anteprima."}
            </>
          ) : (
            <>
              {locale == "en"
                ? "This is page is showing published content."
                : "Questa pagina mostra i contenuti pubblicati."}{" "}
              <a
                href="/api/preview"
                className="underline hover:text-cyan duration-200 transition-colors"
              >
                {locale == "en" ? "Click here" : "Clicca qui"}
              </a>{" "}
              {locale == "en"
                ? "to enter preview mode!"
                : "per entrare in modalità anteprima!"}
            </>
          )}
        </div>
      </Container>
    </div>
  );
}
