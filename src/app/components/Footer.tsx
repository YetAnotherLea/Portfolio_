// src/app/components/Footer.tsx
export default function Footer({ text }: { text: string }) {
  return (
    <div className="fixed bottom-0 left-0 w-full overflow-hidden pointer-events-none z-[-1] flex justify-center">
      <span className="text-[16rem] md:text-[25rem] font-sans font-black uppercase leading-[0.8] opacity-[0.03] select-none whitespace-nowrap translate-y-1/4">
        {text}
      </span>
    </div>
  );
}
