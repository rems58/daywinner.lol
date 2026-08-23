"use client";
// Animations de la landing — GPU only (transform/opacity), reprises de riveska.com.
import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.32, 0.72, 0, 1] as const;

/* Entree au scroll : fade-up lourd + deblur, une seule fois */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* Titre hero : revelation mot a mot depuis un masque */
export function WordsReveal({ text, className }: { text: string; className?: string }) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((mot, i) => (
        <span key={`${mot}-${i}`} className="inline-block overflow-hidden pb-1 align-bottom">
          <motion.span
            // whitespace-pre : sans lui, l'espace final est avale par le
            // overflow-hidden du masque et tous les mots se collent.
            className="inline-block whitespace-pre will-change-transform"
            initial={reduced ? false : { y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.75, delay: 0.08 + i * 0.055, ease: EASE }}
          >
            {i < words.length - 1 ? `${mot} ` : mot}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
