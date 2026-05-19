const CertificationRibbon = () => {
  return (
    <aside
      aria-label="BIS certified pure copper"
      className="absolute right-2 top-[2.625rem] z-30 sm:right-6 lg:right-10 pointer-events-none"
    >
      <div className="relative w-[3.875rem] sm:w-[4.875rem]">
        <div className="absolute left-1/2 top-0 z-20 h-2 w-[112%] -translate-x-1/2 rounded-b border border-[#8E451B]/50 bg-linear-to-b from-[#B66124] via-[#C87835] to-[#7B3513] shadow-md shadow-brand-forest/20" />

        <div
          className="cert-ribbon-body relative overflow-hidden rounded-t-sm border-x border-[#A8501F]/70 pt-3 shadow-lg shadow-brand-forest/15"
          style={{
            background:
              "linear-gradient(90deg, #9b4719 0%, #d88b45 5%, #f2bd78 18%, #c77731 50%, #f1b978 82%, #9b4719 100%)",
          }}
        >
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.13)_0px,rgba(255,255,255,0.03)_1px,rgba(115,46,14,0.08)_3px,transparent_5px)] opacity-70" />
          <div className="absolute inset-1 rounded-t-sm border border-white/20 shadow-[inset_0_0_18px_rgba(92,36,9,0.35)]" />

          <div className="cert-ribbon-content relative z-10 flex h-full flex-col items-center px-1.5 pt-2 text-center text-[#5C2608]">
            <p className="font-sans text-[0.7rem] font-black leading-[0.95] tracking-[0.14em] sm:text-[0.9rem]">
              BIS
            </p>
            <p className="mt-0.5 font-sans text-[0.42rem] font-black leading-tight tracking-[0.14em] sm:text-[0.55rem]">
              CERTIFIED
            </p>

            <div className="my-2 h-px w-11/12 bg-[#5C2608]/70" />

            <div className="relative mb-2 h-9 w-11 sm:h-11 sm:w-14">
              <div
                className="absolute inset-x-1 top-0 h-full bg-[#6F2D08]"
                style={{
                  clipPath:
                    "polygon(50% 0, 100% 82%, 70% 100%, 50% 64%, 30% 100%, 0 82%)",
                }}
              />
              <div
                className="absolute left-1/2 top-[26%] h-[38%] w-[58%] -translate-x-1/2 bg-[#E5A765]"
                style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }}
              />
              <div className="absolute left-1/2 top-[48%] h-3 w-3 -translate-x-1/2 rounded-full bg-[#6F2D08] sm:h-3.5 sm:w-3.5" />
            </div>

            <p className="font-sans text-[0.48rem] font-black tracking-wide sm:text-[0.62rem]">
              IS 15682
            </p>

            <div className="my-2 flex w-11/12 items-center gap-1">
              <span className="h-px flex-1 bg-[#5C2608]/60" />
              <span className="h-1.5 w-1.5 rotate-45 bg-[#5C2608]" />
              <span className="h-px flex-1 bg-[#5C2608]/60" />
            </div>

            <p className="font-sans text-[0.68rem] font-black leading-[0.95] tracking-[0.08em] sm:text-[0.9rem]">
              PURE
              <br />
              COPPER
            </p>
          </div>

          <div className="cert-ribbon-tab absolute inset-x-0 top-3 z-10 flex justify-center text-[#5C2608]">
            <span className="font-sans text-[0.52rem] font-black tracking-[0.16em] sm:text-[0.62rem]">
              BIS
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default CertificationRibbon;
