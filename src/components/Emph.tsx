import styles from "./Emph.module.css";

// **text** = termín, ++text++ = zadarmo.
// variant "mark" podfarbí slovo ako zvýrazňovačom (bežný text),
// "text" ho len prefarbí — vo veľkých nadpisoch by bloky farby prekrývali riadky.
const MARKERS = /(\*\*[^*]+\*\*|\+\+[^+]+\+\+)/g;

export default function Emph({
  text,
  variant = "mark",
}: {
  text: string;
  variant?: "mark" | "text";
}) {
  const time = variant === "mark" ? styles.time : styles.timeText;
  const free = variant === "mark" ? styles.free : styles.freeText;

  return (
    <>
      {text.split(MARKERS).map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <mark key={i} className={time}>
              {part.slice(2, -2)}
            </mark>
          );
        }
        if (part.startsWith("++") && part.endsWith("++")) {
          return (
            <mark key={i} className={free}>
              {part.slice(2, -2)}
            </mark>
          );
        }
        return part;
      })}
    </>
  );
}
