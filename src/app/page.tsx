import Image from "next/image";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import TiltCard from "@/components/TiltCard";
import HeroScene3D from "@/components/HeroScene3D";

function GradientText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(26deg, #2f3794 5.68%, #4e378f 8.82%, #863884 16.65%, #ae397c 23.67%, #cc3b75 29.64%, #de3c71 34.31%, #e53c70 37.11%, #882f92 62%, #4994d0 94.4%)",
      }}
    >
      {children}
    </span>
  );
}

function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 lg:px-[60px] py-5 sm:py-6 lg:py-[34px] animate-fade-in">
      <a href="/" className="flex items-center gap-2 sm:gap-3 transition-opacity hover:opacity-80">
        <Image
          src="/images/logo-icon.svg"
          alt="Social Fantasy logo"
          width={32}
          height={27}
          className="w-6 h-5 sm:w-8 sm:h-[27px]"
        />
        <GradientText className="text-lg sm:text-xl lg:text-2xl font-extrabold">
          Social Fantasy
        </GradientText>
      </a>
      <a
        href="#contact"
        className="rounded-[20px] px-4 sm:px-5 lg:px-6 py-2 lg:py-2.5 text-xs sm:text-sm font-bold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-brand-indigo/30 active:scale-95"
        style={{
          backgroundImage: "linear-gradient(to right, #2f3794, #5a388b)",
        }}
      >
        Contact Us
      </a>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 h-[600px] sm:h-[700px] lg:h-[clamp(840px,70vw,1120px)]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,1) 0%, rgba(233,234,249,1) 100%)",
        }}
      />
      {/* Pulsing glow blob */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[180px] sm:top-[220px] lg:top-[253px] w-[400px] sm:w-[500px] lg:w-[50vw] lg:max-w-[800px] h-[300px] sm:h-[380px] lg:h-[37vw] lg:max-h-[600px] bg-brand-violet rounded-full blur-[50px] animate-pulse-glow" />

      <div className="relative pt-[100px] sm:pt-[110px] lg:pt-[120px]">
        {/* Mobile & Tablet: 3 phones with 3D tilt, scales to fit */}
        <div className="lg:hidden flex items-end justify-center gap-[3%] px-4 sm:px-8">
          <div className="w-[28%] sm:w-[24%] max-w-[195px] opacity-70 translate-y-[-8%] animate-fade-in-up delay-200">
            <div className="animate-float-slow">
              <TiltCard maxTilt={8} className="rounded-[16px] sm:rounded-[20px]">
                <Image src="/images/onboarding2.png" alt="Leagues screen" width={195} height={422} className="w-full h-auto rounded-[16px] sm:rounded-[20px] shadow-2xl" />
              </TiltCard>
            </div>
          </div>
          <div className="w-[32%] sm:w-[28%] max-w-[220px] z-10 animate-fade-in-up">
            <div className="animate-float">
              <TiltCard maxTilt={10} className="rounded-[16px] sm:rounded-[20px]">
                <Image src="/images/onboarding1.png" alt="Social Fantasy app" width={220} height={476} className="w-full h-auto rounded-[16px] sm:rounded-[20px] shadow-2xl" priority />
              </TiltCard>
            </div>
          </div>
          <div className="w-[28%] sm:w-[24%] max-w-[195px] opacity-70 translate-y-[-8%] animate-fade-in-up delay-400">
            <div className="animate-float-slow" style={{ animationDelay: "1.5s" }}>
              <TiltCard maxTilt={8} className="rounded-[16px] sm:rounded-[20px]">
                <Image src="/images/onboarding4.png" alt="League detail screen" width={195} height={422} className="w-full h-auto rounded-[16px] sm:rounded-[20px] shadow-2xl" />
              </TiltCard>
            </div>
          </div>
        </div>

        {/* Desktop: all 5 phones as 3D cards in Three.js */}
        <div className="hidden lg:block">
          <HeroScene3D />
        </div>

        {/* Text overlay */}
        <div className="relative -mt-[60px] sm:-mt-[100px] lg:-mt-[200px] xl:-mt-[260px] bg-white pt-10 sm:pt-12 lg:pt-16 pb-6 sm:pb-8 lg:pb-12 text-center z-20 px-5 sm:px-8">
          <h1 className="text-[28px] sm:text-[40px] md:text-[48px] lg:text-[60px] font-extrabold leading-tight animate-fade-in-up delay-100">
            <GradientText>Pick. Draft. Dominate.</GradientText>
          </h1>
          <p className="mx-auto mt-3 sm:mt-4 max-w-[600px] lg:max-w-[814px] text-sm sm:text-base lg:text-xl text-black leading-relaxed animate-fade-in-up delay-200">
            Create your influencer dream team and battle for Social Fantasy
            supremacy.
            <br /><br />
            Influencers who show up, perform and connect can take you there.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in-up delay-300">
            <a
              href="#"
              className="flex items-center gap-3 rounded-lg bg-black px-5 py-3.5 sm:py-4 text-white w-full sm:w-auto justify-center transition-all hover:bg-gray-800 hover:scale-[1.03] hover:shadow-xl active:scale-95"
            >
              <Image src="/images/apple-icon.svg" alt="Apple" width={24} height={24} />
              <span className="text-sm leading-tight text-left">
                Download on the
                <br />
                <span className="font-bold">App Store</span>
              </span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 rounded-lg border border-[#e2e4ff] bg-white px-5 py-3.5 sm:py-4 text-black w-full sm:w-auto justify-center transition-all hover:border-brand-indigo/40 hover:scale-[1.03] hover:shadow-xl active:scale-95"
            >
              <Image src="/images/google-icon.svg" alt="Google" width={24} height={24} />
              <span className="text-sm leading-tight text-left">
                Get it on
                <br />
                <span className="font-bold">Google Play</span>
              </span>
            </a>
          </div>

          <div className="mt-8 sm:mt-10 flex justify-center animate-fade-in delay-500">
            <Image
              src="/images/arrow-down.svg"
              alt="Scroll down"
              width={25}
              height={25}
              className="animate-bounce"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureSection({
  title,
  children,
  phoneImage,
  phoneAlt,
  reversed = false,
}: {
  title: string;
  children: React.ReactNode;
  phoneImage: string;
  phoneAlt: string;
  reversed?: boolean;
}) {
  const textAnimation = reversed ? "reveal-right" : "reveal-left";
  const phoneAnimation = reversed ? "reveal-left" : "reveal-right";

  const textContent = (
    <AnimateOnScroll animation={textAnimation as "reveal-left" | "reveal-right"} className="flex-1 max-w-full md:max-w-[480px] text-center md:text-left">
      <h2 className="text-[32px] sm:text-[40px] lg:text-[60px] font-extrabold text-brand-deep-purple leading-tight">
        {title}
      </h2>
      <div className="mt-3 sm:mt-4 lg:mt-6 text-sm sm:text-base lg:text-xl text-black leading-relaxed space-y-3 sm:space-y-4">
        {children}
      </div>
    </AnimateOnScroll>
  );

  const phoneContent = (
    <AnimateOnScroll animation={phoneAnimation as "reveal-left" | "reveal-right"} delay={150} className="relative shrink-0">
      <TiltCard maxTilt={14} scale={1.04} className="relative">
        <div className="absolute -left-2 sm:-left-3 top-2 sm:top-3 w-[200px] sm:w-[230px] lg:w-[277px] h-[420px] sm:h-[485px] lg:h-[585px] bg-[#eee] rounded-[22px] sm:rounded-[26px] lg:rounded-[30px]" />
        <Image
          src={phoneImage}
          alt={phoneAlt}
          width={268}
          height={581}
          className="relative z-10 rounded-[18px] sm:rounded-[20px] lg:rounded-[24px] w-[192px] sm:w-[222px] lg:w-[268px] h-auto"
        />
      </TiltCard>
    </AnimateOnScroll>
  );

  return (
    <section className="mx-auto max-w-[1100px] px-5 sm:px-8 lg:px-[60px] py-8 sm:py-10 lg:py-16">
      <div
        className={`flex flex-col md:flex-row items-center md:items-start gap-8 sm:gap-10 lg:gap-20 ${
          reversed ? "md:flex-row-reverse" : ""
        }`}
      >
        {textContent}
        {phoneContent}
      </div>
    </section>
  );
}

function PickSection() {
  return (
    <FeatureSection
      title="Pick"
      phoneImage="/images/pick-phone.png"
      phoneAlt="Pick screen"
    >
      <p>The Game Master chooses how Slots are defined.</p>
      <ul className="space-y-2 inline-flex flex-col items-start">
        {["Reach.", "Niche.", "Platform."].map((item) => (
          <li key={item} className="flex items-center gap-2 transition-transform hover:translate-x-1">
            <Image
              src="/images/arrow-right.svg"
              alt=""
              width={22}
              height={22}
              className="rotate-90 shrink-0 w-4 sm:w-[22px] h-4 sm:h-[22px]"
            />
            <span className="font-semibold text-brand-pink">{item}</span>
          </li>
        ))}
      </ul>
      <p>
        You choose the Influencers to fill those Slots. Every League plays a
        little differently.
        <br /><br />
        Know the Slots. Pick with purpose.
      </p>
    </FeatureSection>
  );
}

function DraftSection() {
  return (
    <FeatureSection
      title="Draft"
      phoneImage="/images/draft-phone.png"
      phoneAlt="Draft screen"
      reversed
    >
      <p>
        You draft Influencers to build your Team.
        <br /><br />
        Drafting happens one pick at a time. When you draft an Influencer,
        they&apos;re yours - no one else can pick them.
        <br /><br />
        Some Influencers will play. Others will be Voyeurs - claimed by you and
        waiting for their moment.
        <br /><br />
        Draft smart. Your Team starts here.
      </p>
    </FeatureSection>
  );
}

function DominateSection() {
  return (
    <FeatureSection
      title="Dominate"
      phoneImage="/images/dominate-phone.png"
      phoneAlt="Dominate screen"
    >
      <p>
        Winning comes down to engagement.
        <br /><br />
        Big audiences don&apos;t win. Engagement does.
      </p>
      <p className="font-bold">
        Attention matters.
        <br />
        Momentum tells the story.
        <br />
        One great post can change everything.
      </p>
      <p>
        Pay attention. Engage where it matters.
        <br /><br />
        Predict better. Win more.
      </p>
    </FeatureSection>
  );
}

function EmailCTA() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-14 lg:py-20" id="contact">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(92deg, #913cfb 0.4%, #0d63f7 99.5%)",
        }}
      />
      {/* Drifting glow blobs */}
      <div className="absolute right-[-40px] bottom-[-40px] w-[200px] sm:w-[308px] h-[200px] sm:h-[308px] bg-brand-violet opacity-80 blur-[50px] rounded-full animate-drift" />
      <div className="absolute left-[-78px] bottom-[-60px] w-[200px] sm:w-[308px] h-[200px] sm:h-[308px] bg-[#5299d4] opacity-70 blur-[50px] rounded-full animate-drift" style={{ animationDelay: "3s", animationDirection: "reverse" }} />

      <AnimateOnScroll animation="reveal" className="relative z-10 mx-auto max-w-[960px] text-center text-white px-5 sm:px-8">
        <h2 className="text-[24px] sm:text-[36px] md:text-[48px] lg:text-[60px] font-extrabold leading-tight">
          Ready to join the Social Fantasy?
        </h2>
        <p className="mx-auto mt-3 sm:mt-4 max-w-[795px] text-xs sm:text-sm lg:text-base leading-relaxed opacity-90">
          Get insider app hacks, early access to new releases, and exclusive
          discounts delivered straight to your inbox.
        </p>

        <p className="mt-5 sm:mt-6 lg:mt-8 text-sm sm:text-base lg:text-xl break-all sm:break-normal">
          Email us at{" "}
          <span className="font-bold lowercase">
            info@playsocialfantasy.com
          </span>{" "}
          or
        </p>

        <div className="mx-auto mt-4 max-w-[340px] sm:max-w-[400px]">
          <div className="relative group">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl border border-[#e7e7e7] bg-white/40 px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base lg:text-xl text-white placeholder-white/80 outline-none backdrop-blur-sm transition-all focus:border-white/60 focus:bg-white/50 focus:shadow-lg focus:shadow-white/10"
            />
            <button
              type="submit"
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 transition-transform hover:scale-110 active:scale-90"
            >
              <Image src="/images/send-icon.svg" alt="Send" width={24} height={24} className="w-5 sm:w-6 h-5 sm:h-6" />
            </button>
          </div>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm opacity-80">
            Get notified when we launch. No spam, Ever
          </p>
        </div>
      </AnimateOnScroll>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-[60px] py-8 sm:py-10 lg:py-12">
      <AnimateOnScroll animation="reveal">
        <div className="flex flex-col gap-8 sm:flex-row sm:flex-wrap sm:justify-between lg:flex-nowrap lg:items-start">
          <div className="sm:w-full lg:w-auto">
            <a href="/" className="flex items-center gap-2 sm:gap-3 transition-opacity hover:opacity-80">
              <Image
                src="/images/logo-icon.svg"
                alt="Social Fantasy logo"
                width={32}
                height={27}
                className="w-6 h-5 sm:w-8 sm:h-[27px]"
              />
              <GradientText className="text-xl sm:text-2xl font-extrabold">
                Social Fantasy
              </GradientText>
            </a>
            <p className="mt-2 sm:mt-3 max-w-[235px] text-xs text-black leading-relaxed">
              Create your influencer dream team and battle for Social Fantasy
              supremacy.
            </p>
          </div>

          <div className="flex gap-12 sm:gap-16 lg:gap-32">
            <div>
              <h4 className="text-sm font-bold text-black">Product</h4>
              <ul className="mt-1.5 sm:mt-2 space-y-1 text-sm text-black">
                <li><a href="#" className="transition-colors hover:text-brand-indigo">Features</a></li>
                <li><a href="#" className="transition-colors hover:text-brand-indigo">How it works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-black">Contact US</h4>
              <ul className="mt-1.5 sm:mt-2 space-y-1 text-sm text-black">
                <li><a href="#" className="transition-colors hover:text-brand-indigo">About us</a></li>
                <li><a href="#" className="transition-colors hover:text-brand-indigo">Contact us</a></li>
              </ul>
            </div>
          </div>

          <p className="text-xs text-black sm:w-full lg:w-auto lg:self-end">
            &copy; 2026 Social Fantasy. All rights reserved.
          </p>
        </div>
      </AnimateOnScroll>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="bg-white min-h-screen overflow-x-hidden">
      <Header />
      <HeroSection />
      <PickSection />
      <DraftSection />
      <DominateSection />
      <EmailCTA />
      <Footer />
    </main>
  );
}
