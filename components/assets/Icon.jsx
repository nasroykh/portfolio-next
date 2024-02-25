import Image from "next/legacy/image"

import ArrowLong from "/public/icons/arrow-down-long.svg"
import Chevron from "/public/icons/chevron-down.svg"

const Aws = "/icons/aws.svg"
const Cpp = "/icons/cpp.svg"
const Css = "/icons/css.svg"
const Django = "/icons/django.svg"
const Docker = "/icons/docker.svg"
const Electron = "/icons/electron.svg"
const Express = "/icons/express.svg"
const Figma = "/icons/figma.svg"
const Github = "/icons/github.svg"
const Graphql = "/icons/graphql.svg"
const Html = "/icons/html.svg"
const Javascript = "/icons/javascript.svg"
const Jest = "/icons/jest.svg"
const Linux = "/icons/linux.svg"
const Mongodb = "/icons/mongodb.svg"
const Nextjs = "/icons/nextjs.svg"
const Nginx = "/icons/nginx.svg"
const Nodejs = "/icons/nodejs.svg"
const Paypal = "/icons/paypal.svg"
const Postgresql = "/icons/postgresql.svg"
const Prisma = "/icons/prisma.svg"
const Python = "/icons/python.svg"
const ReactLogo = "/icons/react.svg"
const Redux = "/icons/redux.svg"
const Sass = "/icons/sass.svg"
const Stripe = "/icons/stripe.svg"
const Tailwindcss = "/icons/tailwindcss.svg"
const Typescript = "/icons/typescript.svg"

const Email = "/icons/email.svg"
const Resume = "/icons/resume.svg"
const Instagram = "/icons/instagram.svg"
const Facebook = "/icons/facebook.svg"
const Linkedin = "/icons/linkedin.svg"

const Icon = ({id, width, height}) => {
  switch (id) {
    case "arrow-long": return <ArrowLong />;
    case "chevron": return <Chevron />;
    case "html": return <Image src={Html} width={width} height={height} alt="Html" />;
    case "aws": return <Image src={Aws} width={width} height={height} alt="Aws" />;
    case "cpp": return <Image src={Cpp} width={width} height={height} alt="Cpp" />;
    case "css": return <Image src={Css} width={width} height={height} alt="Css" />;
    case "django": return <Image src={Django} width={width} height={height} alt="Django" />;
    case "docker": return <Image src={Docker} width={width} height={height} alt="Docker" />;
    case "electron": return <Image src={Electron} width={width} height={height} alt="Electron" />;
    case "express": return <Image src={Express} width={width} height={height} alt="Express" />;
    case "figma": return <Image src={Figma} width={width} height={height} alt="Figma" />;
    case "github": return <Image src={Github} width={width} height={height} alt="Github" />;
    case "graphql": return <Image src={Graphql} width={width} height={height} alt="Graphql" />;
    case "html": return <Image src={Html} width={width} height={height} alt="Html" />;
    case "javascript": return <Image src={Javascript} width={width} height={height} alt="Javascript" />;
    case "jest": return <Image src={Jest} width={width} height={height} alt="Jest" />;
    case "linux": return <Image src={Linux} width={width} height={height} alt="Linux" />;
    case "mongodb": return <Image src={Mongodb} width={width} height={height} alt="Mongodb" />;
    case "nextjs": return <Image src={Nextjs} width={width} height={height} alt="Nextjs" />;
    case "nginx": return <Image src={Nginx} width={width} height={height} alt="Nginx" />;
    case "nodejs": return <Image src={Nodejs} width={width} height={height} alt="Nodejs" />;
    case "paypal": return <Image src={Paypal} width={width} height={height} alt="Paypal" />;
    case "postgresql": return <Image src={Postgresql} width={width} height={height} alt="Postgresql" />;
    case "prisma": return <Image src={Prisma} width={width} height={height} alt="Prisma" />;
    case "python": return <Image src={Python} width={width} height={height} alt="Python" />;
    case "react": return <Image src={ReactLogo} width={width} height={height} alt="ReactLogo" />;
    case "redux": return <Image src={Redux} width={width} height={height} alt="Redux" />;
    case "sass": return <Image src={Sass} width={width} height={height} alt="Sass" />;
    case "stripe": return <Image src={Stripe} width={width} height={height} alt="Stripe" />;
    case "tailwindcss": return <Image src={Tailwindcss} width={width} height={height} alt="Tailwindcss" />;
    case "typescript": return <Image src={Typescript} width={width} height={height} alt="Typescript" />;
    case "email": return <Image src={Email} width={width} height={height} alt="Email" />;
    case "linkedin": return <Image src={Linkedin} width={width} height={height} alt="LinkedIn" />;
    case "resume": return <Image src={Resume} width={width} height={height} alt="Resume" />;
    case "instagram": return <Image src={Instagram} width={width} height={height} alt="Instagram" />;
    case "facebook": return <Image src={Facebook} width={width} height={height} alt="Facebook" />;

    default: return <></>;
  }
}

export default Icon