import { Briefcase, Code, User } from "lucide-react";
import { cn } from "@/utils/util";

export const AboutSection = () => {
  const renderFloatingImages = (
    imageUrls: string[],
    count: number,
    position: "top" | "bottom"
  ) => {
    return (
      <div
        className={cn(
          "absolute left-0 w-full h-16 -z-2 px-2",
          position === "top" ? "top-2 items-start" : "bottom-2 items-end"
        )}
      >
        <div className="flex w-full justify-between items-center h-full">
          {Array.from({ length: count }).map((_, i) => (
            <img
              key={i}
              src={imageUrls[i % imageUrls.length]}
              alt={`Floating ${i}`}
              className="w-6 h-6 animate-bobbing"
              style={{
                animationDelay: `${(i * 0.2).toFixed(2)}s`,
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <section
      id="about"
      className="py-24 px-4 relative flex items-center justify-center"
    >
      {/* Background */}
      <div className="-z-2 w-full h-full bg-card absolute" />

      {/* Top dots (now truly at the top) */}
      {renderFloatingImages(
        ["/images/simple_star.webp", "/images/simple_cat.webp"],
        20,
        "top"
      )}
      {renderFloatingImages(
        ["/images/simple_star.webp", "/images/simple_cat.webp"],
        20,
        "bottom"
      )}

      <div className="container mx-auto max-w-5xl flex flex-col gap-y-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary"> Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-y-6 h-full items-center justify-between text-left md:text-center">
            <h3 className="text-2xl font-semibold">
              Passionate Web Developer & Tech Creator
            </h3>

            <p className="text-muted-foreground">
              With over 5 years of experience in web development, I specialize
              in creating responsive, accessible, and performant web
              applications using modern technologies.
            </p>

            <p className="text-muted-foreground">
              I'm passionate about creating elegant solutions to complex
              problems, and I'm constantly learning new technologies and
              techniques to stay at the forefront of the ever-evolving web
              landscape.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center items-center w-full">
              <a
                href="#contact"
                className="w-full sm:w-auto cosmic-button text-center"
              >
                {" "}
                Get In Touch
              </a>

              <a
                href=""
                className="w-full sm:w-auto px-6 py-2 rounded-full border border-primary text-primary text-center hover:bg-primary/10 transition-colors duration-300"
              >
                Download CV
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="relative card-hover rounded-xl shadow-lg overflow-hidden">
              <div className="backdrop" />
              <div className="relative z-10 p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-lg"> Web Development</h4>
                    <p className="text-foreground">
                      Creating responsive websites and web applications with
                      modern frameworks.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-hover relative rounded-xl overflow-hidden shadow-lg">
              {/* BACKDROP as background overlay */}
              <div className="backdrop" />

              {/* CONTENT on top */}
              <div className="relative z-10 p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-lg">UI/UX Design</h4>
                    <p className="text-foreground">
                      Designing intuitive user interfaces and seamless user
                      experiences.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-hover relative rounded-xl overflow-hidden shadow-lg">
              {/* BACKDROP as background overlay */}
              <div className="backdrop" />

              {/* CONTENT on top */}
              <div className="relative z-10 p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-lg">UI/UX Design</h4>
                    <p className="text-foreground">
                      Designing intuitive user interfaces and seamless user
                      experiences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
