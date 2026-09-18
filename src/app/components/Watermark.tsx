export default function Watermark({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`w-full overflow-hidden pointer-events-none select-none ${className ?? ""}`}
    >
      <h3 className="text-center font-body font-black uppercase leading-[0.7] opacity-[0.03] whitespace-nowrap">
        {text}
      </h3>
    </div>
  );
}
