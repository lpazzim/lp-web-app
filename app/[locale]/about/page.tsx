import Image from "next/image";

export default function AboutPage(){
    return(
        <section aria-labelledby="about-heading">
            <div className="container w-full mx-auto">
              <Image
                src="/images/lucas-pazzim-about.png"
                alt="About Banner"
                width={300}
                height={200}
                priority
              />
            </div>
        </section>
    )
}