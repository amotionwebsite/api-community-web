"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CaretDown, ImageSquare, X } from "@phosphor-icons/react";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../store/useAuthStore";

const TERMUX_LOGO_URI =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="18" rx="4" fill="#18181b" stroke="#e4e4e7" stroke-width="1.8"/><path d="M6.8 8.5L10.8 12L6.8 15.5" fill="none" stroke="#ffffff" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/><line x1="12.5" y1="15.5" x2="17.2" y2="15.5" stroke="#ffffff" stroke-width="2.1" stroke-linecap="round"/></svg>'
  );

const TECH_CATALOG = [
  { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
  { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "Vue.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg" },
  { name: "Nuxt.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nuxtjs/nuxtjs-original.svg" },
  { name: "Svelte", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-original.svg" },
  { name: "Angular", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg" },
  { name: "Vite", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" },
  { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Bootstrap", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" },
  { name: "Sass", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg" },
  { name: "Framer Motion", logo: "https://cdn.simpleicons.org/framer/ffffff" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "Express.js", logo: "https://cdn.simpleicons.org/express/ffffff" },
  { name: "NestJS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg" },
  { name: "Bun", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bun/bun-original.svg" },
  { name: "Deno", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/denojs/denojs-original.svg" },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "Django", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg" },
  { name: "Flask", logo: "https://cdn.simpleicons.org/flask/ffffff" },
  { name: "FastAPI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
  { name: "PHP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
  { name: "Laravel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" },
  { name: "Go", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg" },
  { name: "Rust", logo: "https://cdn.simpleicons.org/rust/ffffff" },
  { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
  { name: "Spring Boot", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg" },
  { name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" },
  { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
  { name: "C#", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg" },
  { name: ".NET", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dot-net/dot-net-original.svg" },
  { name: "Ruby", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ruby/ruby-original.svg" },
  { name: "GraphQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg" },
  { name: "Socket.io", logo: "https://cdn.simpleicons.org/socketdotio/ffffff" },
  { name: "React Native", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Flutter", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg" },
  { name: "Dart", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg" },
  { name: "Kotlin", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg" },
  { name: "Swift", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg" },
  { name: "Android", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg" },
  { name: "Unity", logo: "https://cdn.simpleicons.org/unity/ffffff" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { name: "SQLite", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg" },
  { name: "Redis", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
  { name: "Prisma", logo: "https://cdn.simpleicons.org/prisma/ffffff" },
  { name: "Supabase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
  { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "Linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
  { name: "Bash", logo: "https://cdn.simpleicons.org/gnubash/ffffff" },
  { name: "Termux", logo: TERMUX_LOGO_URI },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "Nginx", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg" },
  { name: "Vercel", logo: "https://cdn.simpleicons.org/vercel/ffffff" },
  { name: "Railway", logo: "https://cdn.simpleicons.org/railway/ffffff" },
  { name: "Cloudflare", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudflare/cloudflare-original.svg" },
  { name: "Baileys", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "PM2", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
];

const getTechLogo = (name) => {
  const found = TECH_CATALOG.find(
    (t) => t.name.toLowerCase() === name.toLowerCase()
  );
  return (
    found?.logo ||
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/devicon/devicon-original.svg"
  );
};

const PlusSvg = ({ size = 21 }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      fill="currentColor"
      d="M13 13v6c-.036.543-.428 1-1 1s-.964-.457-1-1v-6H5c-.543-.036-1-.428-1-1s.457-.964 1-1h6V5c.036-.543.428-1 1-1s.964.457 1 1v6h6c.543.036 1 .428 1 1s-.457.964-1 1Z"
    />
  </svg>
);

const SearchSvg = ({ size = 15 }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      fill="currentColor"
      d="m17.176 15.762 3.652 3.652c.359.41.405 1.01 0 1.414-.404.405-1.004.359-1.414 0l-3.652-3.652c-1.145.85-2.399 1.459-3.814 1.702C5.871 19.921.72 14.327 2.272 8.355a8.5 8.5 0 0 1 1.979-3.618A8.55 8.55 0 0 1 7.68 2.478c6.112-2.146 12.292 3.095 11.198 9.47-.243 1.415-.852 2.669-1.702 3.814M9.938 4.025a6.5 6.5 0 0 0-3.844 1.697 6.5 6.5 0 0 0-1.727 2.622c-1.558 4.436 2.021 9.03 6.695 8.631a6.5 6.5 0 0 0 3.844-1.697 6.5 6.5 0 0 0 1.727-2.622c1.558-4.436-2.021-9.03-6.695-8.631"
    />
  </svg>
);

const VisitArrowSvg = ({ size = 15 }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      fill="currentColor"
      d="M14.378 7.5H10c-.83-.047-1.5-.634-1.5-1.5a1.505 1.505 0 0 1 1.166-1.462L10 4.5h8c.347.019.659.107.935.327.37.295.539.712.565 1.173v8l-.038.334A1.505 1.505 0 0 1 18 15.5c-.866 0-1.454-.67-1.5-1.5V9.621l-9.097 9.097c-.619.553-1.509.612-2.121 0-.612-.613-.554-1.502 0-2.122Z"
    />
  </svg>
);

const EditSvg = ({ size = 16, active = false }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    {active ? (
      <path
        fill="currentColor"
        d="M12.068 19H20c1.32.076 1.32 1.924 0 2H9.288l-.049.001H3.996a1.06 1.06 0 0 1-.625-.22c-.246-.197-.357-.473-.375-.78v-5.243c.022-.55.213-1.01.586-1.414L13.896 3.03c.526-.481 1.217-.705 1.921-.521.354.093.64.277.907.521l4.243 4.243c.778.851.778 1.977 0 2.828Z"
      />
    ) : (
      <path
        fill="currentColor"
        d="M12.068 19H20c1.322.087 1.322 1.914 0 2H9.251l-.012.001H3.996c-.271-.018-.51-.097-.707-.293-.196-.197-.275-.436-.293-.707v-5.243a2.13 2.13 0 0 1 .586-1.414L13.896 3.03c.487-.45 1.135-.673 1.795-.545.394.077.74.274 1.033.545l4.243 4.243c.771.834.771 1.994 0 2.828Zm-7.067-4.24-.005 4.241 4.241-.005L19.541 8.687 15.31 4.456Z"
      />
    )}
  </svg>
);

const ReplySvg = ({ size = 16, active = false }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    {active ? (
      <path
        fill="currentColor"
        d="m21.321 19.148.386 1.311.04.226c.018.285-.093.567-.294.768-.27.27-.631.339-.994.254l-1.311-.386c-.669.327-1.332.573-2.08.65-3.445.353-6.371-2.554-6.043-6.001a5.52 5.52 0 0 1 1.414-3.18 5.53 5.53 0 0 1 3.016-1.691c3.374-.648 6.551 1.959 6.545 5.401-.002.952-.266 1.802-.679 2.648m-1.613-9.429c-.821-.346-1.633-.608-2.527-.688-3.871-.348-7.414 2.353-8.072 6.19a7.55 7.55 0 0 0 .401 4.004c.25.64.594 1.195.979 1.761-1.636-.159-2.656-.468-4.098-1.255l-2.65.78c-.802.188-1.44-.451-1.252-1.252l.78-2.649c-.681-1.244-1.129-2.471-1.241-3.896-.502-6.395 5.685-11.273 11.79-9.264a9 9 0 0 1 3.497 2.137c1.212 1.194 1.904 2.519 2.393 4.132"
      />
    ) : (
      <path
        fill="currentColor"
        d="m21.319 19.142.39 1.326c.101.451-.046.913-.464 1.151a1 1 0 0 1-.513.131l-.264-.041-1.326-.39a5.55 5.55 0 0 1-2.582.679c-3.528.083-6.123-3.218-5.443-6.624a5.4 5.4 0 0 1 1.335-2.596c3.4-3.645 9.461-1.311 9.547 3.668a5.4 5.4 0 0 1-.68 2.696m-2.043.134c-.111-.735.257-.897.5-1.545.192-.513.261-1.07.202-1.614-.304-2.816-3.721-4.112-5.822-2.215-2.222 2.007-1.019 5.754 1.961 6.076a3.5 3.5 0 0 0 1.614-.202c.648-.243.81-.611 1.545-.5M4.921 18.079l1.34-.394.276-.041c.401-.002.687.263 1.018.451l.477.246q.491.23 1.012.381l.532.132c.569.118 1.12.095 1.36.732l.059.254c.026.263-.055.529-.222.733a1 1 0 0 1-.675.36c-.231.023-.762-.087-.887-.112a8.5 8.5 0 0 1-2.814-1.091l-2.67.785c-.803.179-1.421-.439-1.242-1.242l.786-2.671a8.6 8.6 0 0 1-1.144-3.091c-.668-4.12 1.501-8.123 5.334-9.787 3.862-1.677 8.382-.359 10.843 3.018.277.379.517.784.731 1.201.262.512.582 1.102.196 1.64a1 1 0 0 1-1.166.352c-.484-.182-.59-.639-.801-1.062l-.265-.48a7 7 0 0 0-1-1.292c-2.126-2.169-5.516-2.718-8.215-1.32-2.69 1.394-4.198 4.446-3.679 7.43a7 7 0 0 0 .519 1.68l.261.517c.191.341.474.642.471 1.056l-.041.275Z"
      />
    )}
  </svg>
);

const SendSvg = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      fill="currentColor"
      d="m9.53 15.846.177-.139 5-5c.359-.409.405-1.009 0-1.414-.404-.405-1.004-.358-1.414 0l-5 5-.14.176-5.15-2.981c-.521-.34-.772-.956-.532-1.554.137-.342.401-.562.733-.703l15.611-5.647c.468-.144.954-.063 1.309.292s.435.841.291 1.309l-5.646 15.61c-.141.333-.361.597-.704.734-.597.24-1.213-.011-1.553-.532Z"
    />
  </svg>
);

const ApplauseSvg = ({ size = 17, active = false }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    {active ? (
      <path
        fill="currentColor"
        d="M9.401 3.599c1.129-.93 2.702-.905 3.645.286.363.458.607.999.898 1.505a3.8 3.8 0 0 1 1.185-1.015c.964-.514 2.277-.788 2.863.39l.233.644.393.921c.476 1.014.997 1.859 1.28 2.969.507 1.987.291 4.17-.735 5.961l-.367.576-.424.543-.167.629-.218.612a7.1 7.1 0 0 1-3.014 3.47c-2.704 1.568-6.233 1.114-8.457-1.081-.773-.763-1.326-1.727-1.856-2.667l-.318-.602-1.175-1.959c-.412-.748-.479-1.619-.09-2.395.301-.602.812-.998 1.426-1.241l-.775-1.34-.161-.334a2.52 2.52 0 0 1 .77-2.873c.261-.207.535-.327.844-.439-.154-.469-.238-.912-.146-1.407.319-1.722 2.294-2.592 3.781-1.661.295.184.342.262.585.508m5.937 3.57c.882.261.995.671 1.29 1.464l.392.922c.269.572.597 1.116.848 1.698l.268.711c.037-.849-.007-1.655-.259-2.473-.215-.699-.578-1.31-.899-1.961-.354-.717-.36-.772-.654-1.502-.577.263-.862.505-.986 1.141m-2.991 1.443c.226-.276.451-.5.728-.725l-1.552-2.695c-.16-.222-.428-.329-.684-.184-.251.143-.298.439-.182.684l.96 1.663ZM7.831 6.797c.272-.218.54-.373.865-.501l-.772-1.337a.5.5 0 0 0-.231-.207.505.505 0 0 0-.692.558l.057.149ZM20.65 3.512c.806.122 1.132 1.156.537 1.716l-.185.137-.841.488c-.342.173-.731.185-1.058-.035a1.01 1.01 0 0 1-.441-.761c-.027-.393.177-.724.497-.935l.84-.487c.208-.105.417-.159.651-.123m-2.017-2.423c.219.059.414.191.548.374.301.41.178.889.031 1.334-.171.517-.677.854-1.226.707a1 1 0 0 1-.547-.374c-.301-.411-.178-.888-.03-1.334.171-.517.675-.854 1.224-.707m-3.196-.016c.604.118.793.671.903 1.206.128.618-.272 1.237-.935 1.259-.748.024-.998-.606-1.126-1.224-.148-.715.402-1.388 1.158-1.241"
      />
    ) : (
      <path
        fill="currentColor"
        d="M4.504 11.149c-.178-.31-.847-1.318-1.01-1.9-.38-1.36.378-2.649 1.692-3.089-1.029-2.658 2.326-4.693 4.216-2.557 1.034-.896 2.516-.885 3.488.107.432.442.795 1.229 1.056 1.682a3.8 3.8 0 0 1 1.02-.923c.961-.587 2.373-.927 3.012.271.125.235.201.548.289.776l.242.576c.547 1.221 1.17 2.142 1.455 3.484.417 1.967.156 4.021-.854 5.771a6 6 0 0 1-.486.72l-.256.302-.064.289-.234.743a7.24 7.24 0 0 1-3.053 3.662c-2.862 1.718-6.56 1.08-8.788-1.356-.762-.833-1.307-1.936-1.849-2.894-.386-.681-.834-1.348-1.213-2.033-.474-.855-.466-1.871.087-2.69.306-.453.747-.747 1.25-.941M14.73 9.256c-.878.354-1.204 1.044-.853 1.945.134.345.402.638.402 1.026a1.01 1.01 0 0 1-1.259.966c-.391-.105-.571-.403-.76-.731l-2.069-3.584c-.198-.334-.524-1.032-1.03-.581-.203.181-.191.438-.077.663l2.224 3.853c.335.679-.06 1.5-.866 1.5-.372 0-.665-.2-.866-.5l-.786-1.362-.213-.249-2.225-3.854c-.138-.21-.354-.349-.613-.264-.343.114-.4.476-.253.764l1.962 3.4.006.009 1.256 2.176.1.241a1 1 0 0 1 0 .518c-.195.73-1.138.982-1.673.448l-.159-.207c-.37-.554-.665-1.155-1-1.731-.163-.282-.327-.732-.737-.681a.5.5 0 0 0-.328.191c-.138.183-.105.392-.005.583l1.2 2c.75 1.325 1.379 2.676 2.713 3.493 2.211 1.355 5.131.799 6.676-1.291.712-.962 1.062-2.167 1.067-3.356a6.5 6.5 0 0 0-.546-2.625c-.157-.36-.426-.837-.597-1.178a13 13 0 0 1-.691-1.582m1.598-3.225c-.558.225-.898.534-.985 1.144 1.132.301 1.143 1.192 1.568 2.142.398.888.898 1.708 1.22 2.63a6.4 6.4 0 0 0-.494-3.108c-.17-.397-.427-.844-.618-1.226a13 13 0 0 1-.691-1.582m-3.979 2.585c.22-.28.447-.508.727-.728l-1.529-2.654c-.157-.24-.432-.379-.705-.221-.273.157-.291.464-.161.721l.936 1.622ZM7.833 6.801c.272-.223.537-.376.866-.501L7.95 5.003a.6.6 0 0 0-.241-.239c-.394-.193-.808.194-.688.599l.062.14Zm12.924-3.267c.73.194.985 1.136.451 1.672l-.207.159-.84.487c-.323.161-.678.188-1 .002a1 1 0 0 1-.467-.606c-.122-.454.089-.874.464-1.126l.84-.487c.244-.121.491-.173.759-.101m-6.512-1.479c0-.872 1.09-1.324 1.707-.708.239.239.326.617.388.932.053.266.039.518-.099.758a1.01 1.01 0 0 1-.866.501c-.73 0-.975-.615-1.096-1.224Zm4.388-.966c.432.116.741.518.741.966 0 .197-.118.609-.163.741-.175.516-.673.856-1.225.708a1.01 1.01 0 0 1-.741-.966c0-.198.118-.61.163-.742.175-.516.673-.855 1.225-.707"
      />
    )}
  </svg>
);

const SMOOTH_EASE = [0.22, 1, 0.36, 1];

export default function ShowcaseView() {
  const router = useRouter();
  const {
    user,
    projects,
    setProjects,
    likedProjectIds,
    toggleProjectLike,
  } = useAuthStore();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [openReplyId, setOpenReplyId] = useState(null);
  const [replyInputs, setReplyInputs] = useState({});

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedStack, setSelectedStack] = useState([]);
  const [techOpen, setTechOpen] = useState(false);
  const [techSearch, setTechSearch] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [errors, setErrors] = useState({ title: false, desc: false });
  const [shakeTick, setShakeTick] = useState(0);
  const fileInputRef = useRef(null);

  const resetFormState = () => {
    setTitle("");
    setDesc("");
    setSelectedStack([]);
    setTechSearch("");
    setTechOpen(false);
    setDemoUrl("");
    setBannerUrl("");
    setErrors({ title: false, desc: false });
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleToggleCreateForm = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (showForm) {
      setShowForm(false);
      resetFormState();
    } else {
      resetFormState();
      setShowForm(true);
    }
  };

  const handleStartEdit = (project) => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (editingId === project.id && showForm) {
      setShowForm(false);
      resetFormState();
      return;
    }
    setEditingId(project.id);
    setTitle(project.title);
    setDesc(project.desc);
    setSelectedStack(project.stack || []);
    setDemoUrl(project.demoUrl || "");
    setBannerUrl(project.bannerUrl || "");
    setErrors({ title: false, desc: false });
    setTechOpen(false);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleApplauseClick = (id) => {
    if (!user) {
      router.push("/login");
      return;
    }
    toggleProjectLike(id);
  };

  const handleToggleReplyPanel = (id) => {
    if (!user) {
      router.push("/login");
      return;
    }
    setOpenReplyId(openReplyId === id ? null : id);
  };

  const handleAddReply = (e, projectId) => {
    e.preventDefault();
    if (!user) {
      router.push("/login");
      return;
    }
    const text = (replyInputs[projectId] || "").trim();
    if (!text) return;
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? {
              ...p,
              replies: [
                ...(p.replies || []),
                {
                  id: String(Date.now()),
                  author: user.username,
                  text,
                },
              ],
            }
          : p
      )
    );
    setReplyInputs((prev) => ({ ...prev, [projectId]: "" }));
  };

  const toggleTech = (techName) => {
    if (selectedStack.includes(techName)) {
      setSelectedStack(selectedStack.filter((t) => t !== techName));
    } else {
      setSelectedStack([...selectedStack, techName]);
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setBannerUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      router.push("/login");
      return;
    }
    const titleEmpty = !title.trim();
    const descEmpty = !desc.trim();

    if (titleEmpty || descEmpty) {
      setErrors({ title: titleEmpty, desc: descEmpty });
      setShakeTick((n) => n + 1);
      return;
    }

    if (editingId) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? {
                ...p,
                title: title.trim(),
                desc: desc.trim(),
                stack: selectedStack.length > 0 ? selectedStack : ["JavaScript"],
                bannerUrl,
                demoUrl: demoUrl.trim() || "https://api-community-web.vercel.app",
              }
            : p
        )
      );
      setShowForm(false);
      resetFormState();
      return;
    }

    const newProject = {
      id: String(Date.now()),
      title: title.trim(),
      author: user.username,
      desc: desc.trim(),
      stack: selectedStack.length > 0 ? selectedStack : ["JavaScript"],
      bannerUrl,
      demoUrl: demoUrl.trim() || "https://api-community-web.vercel.app",
      applause: 1,
      replies: [],
      isNew: true,
    };

    setShowForm(false);
    resetFormState();
    setProjects((prev) => [newProject, ...prev]);
  };

  const filteredTech = TECH_CATALOG.filter((t) =>
    t.name.toLowerCase().includes(techSearch.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: SMOOTH_EASE }}
      className="min-vh-100 d-flex flex-column handcrafted-canvas pb-5"
    >
      <Navbar />

      <main className="container py-4 flex-grow-1 mb-4" style={{ maxWidth: "740px" }}>
        <div className="d-flex align-items-center justify-content-between gap-2 mb-3">
          <div>
            <h1
              className="h4 mb-0"
              style={{
                fontFamily: "var(--font-coolvetica), sans-serif",
                color: "#f2ece1",
              }}
            >
              Etalase Karya Member
            </h1>
            <p className="mb-0" style={{ fontSize: "0.82rem", color: "#9a8f80" }}>
              Pamerkan web app, bot, CLI, atau eksperimen buatanmu sendiri.
            </p>
          </div>
          <motion.button
            type="button"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleToggleCreateForm}
            title={user ? "Rilis Karya" : "Masuk untuk merilis karya"}
            className="btn btn-sm btn-sogan rounded-pill d-inline-flex align-items-center justify-content-center flex-shrink-0"
            style={{ width: "38px", height: "38px", padding: 0 }}
          >
            <motion.span
              animate={{ rotate: showForm ? 45 : 0 }}
              transition={{ duration: 0.28, ease: SMOOTH_EASE }}
              className="d-inline-flex align-items-center justify-content-center"
            >
              <PlusSvg size={21} />
            </motion.span>
          </motion.button>
        </div>

        {/* Form Rilis / Edit Karya (Hanya untuk user yang sudah login) */}
        <AnimatePresence initial={false}>
          {user && showForm && (
            <motion.div
              key="showcase-form-wrapper"
              initial={{ opacity: 0, height: 0, y: -8 }}
              animate={{
                opacity: 1,
                height: "auto",
                y: 0,
                transitionEnd: { overflow: "visible" },
              }}
              exit={{
                opacity: 0,
                height: 0,
                y: -8,
                overflow: "hidden",
              }}
              transition={{ duration: 0.34, ease: SMOOTH_EASE }}
              style={{ overflow: "hidden" }}
            >
              <form
                noValidate
                onSubmit={handleSubmit}
                className="smoked-glass p-3.5 mb-3 d-flex flex-column gap-2.5"
              >
                {editingId && (
                  <div
                    className="d-flex align-items-center justify-content-between px-2.5 py-1 rounded-2"
                    style={{
                      backgroundColor: "rgba(197, 160, 89, 0.12)",
                      border: "1px solid rgba(197, 160, 89, 0.28)",
                      fontSize: "0.74rem",
                      color: "#e6cfa3",
                    }}
                  >
                    <span>Mode Edit Karya</span>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        resetFormState();
                      }}
                      className="btn btn-sm p-0 border-0 text-warning"
                      style={{ fontSize: "0.72rem" }}
                    >
                      Batal Edit
                    </button>
                  </div>
                )}

                <motion.div
                  key={`proj-title-${shakeTick}`}
                  animate={
                    errors.title
                      ? { x: [0, -7, 7, -5, 5, -2, 2, 0] }
                      : { x: 0 }
                  }
                  transition={{ duration: 0.38 }}
                >
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (errors.title) setErrors({ ...errors, title: false });
                    }}
                    placeholder="Nama proyek..."
                    className="form-control form-control-sm"
                    style={{
                      background: errors.title
                        ? "rgba(185, 56, 56, 0.16)"
                        : "rgba(14,12,10,0.7)",
                      borderColor: errors.title
                        ? "#d9534f"
                        : "rgba(197,160,89,0.22)",
                      color: "#f2ece1",
                      transition: "border-color 0.2s ease, background-color 0.2s ease",
                    }}
                  />
                </motion.div>

                <motion.div
                  key={`proj-desc-${shakeTick}`}
                  animate={
                    errors.desc
                      ? { x: [0, -7, 7, -5, 5, -2, 2, 0] }
                      : { x: 0 }
                  }
                  transition={{ duration: 0.38 }}
                >
                  <textarea
                    rows={2}
                    value={desc}
                    onChange={(e) => {
                      setDesc(e.target.value);
                      if (errors.desc) setErrors({ ...errors, desc: false });
                    }}
                    placeholder="Deskripsi singkat fungsi aplikasi..."
                    className="form-control form-control-sm"
                    style={{
                      background: errors.desc
                        ? "rgba(185, 56, 56, 0.16)"
                        : "rgba(14,12,10,0.7)",
                      borderColor: errors.desc
                        ? "#d9534f"
                        : "rgba(197,160,89,0.22)",
                      color: "#f2ece1",
                      transition: "border-color 0.2s ease, background-color 0.2s ease",
                    }}
                  />
                </motion.div>

                {/* Pemilih Tech Stack Lengkap */}
                <div className="position-relative">
                  <button
                    type="button"
                    onClick={() => setTechOpen(!techOpen)}
                    className="form-control form-control-sm d-flex align-items-center justify-content-between text-start"
                    style={{
                      background: "rgba(14,12,10,0.7)",
                      borderColor: techOpen ? "#c5a059" : "rgba(197,160,89,0.22)",
                      color: selectedStack.length > 0 ? "#f2ece1" : "#8f8578",
                      minHeight: "34px",
                    }}
                  >
                    <div className="d-flex flex-wrap align-items-center gap-1">
                      {selectedStack.length === 0 ? (
                        <span>Pilih Tech Stack (Python, Next.js, Node.js, dll)...</span>
                      ) : (
                        selectedStack.map((techName) => (
                          <span
                            key={techName}
                            className="px-2 py-0.5 rounded-pill d-inline-flex align-items-center gap-1"
                            style={{
                              fontSize: "0.7rem",
                              background: "rgba(118, 168, 130, 0.16)",
                              border: "1px solid rgba(118, 168, 130, 0.3)",
                              color: "#9fd0aa",
                            }}
                          >
                            <img
                              src={getTechLogo(techName)}
                              alt=""
                              width={12}
                              height={12}
                              className="object-fit-contain flex-shrink-0"
                            />
                            <span>{techName}</span>
                          </span>
                        ))
                      )}
                    </div>
                    <CaretDown
                      size={14}
                      className="flex-shrink-0 ms-1"
                      style={{
                        color: "#c5a059",
                        transform: techOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                      }}
                    />
                  </button>

                  <AnimatePresence>
                    {techOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: SMOOTH_EASE }}
                        className="position-absolute start-0 w-100 mt-1 p-2 rounded-3"
                        style={{
                          backgroundColor: "#161310",
                          border: "1px solid rgba(197, 160, 89, 0.32)",
                          boxShadow: "0 16px 32px rgba(0, 0, 0, 0.85)",
                          zIndex: 35,
                        }}
                      >
                        <div className="input-group input-group-sm mb-2">
                          <span
                            className="input-group-text border-end-0"
                            style={{
                              background: "rgba(10, 9, 8, 0.85)",
                              borderColor: "rgba(197, 160, 89, 0.2)",
                              color: "#9a8f80",
                            }}
                          >
                            <SearchSvg size={14} />
                          </span>
                          <input
                            type="text"
                            value={techSearch}
                            onChange={(e) => setTechSearch(e.target.value)}
                            placeholder="Cari bahasa, framework, database, atau tools..."
                            className="form-control border-start-0 shadow-none"
                            style={{
                              background: "rgba(10, 9, 8, 0.85)",
                              borderColor: "rgba(197, 160, 89, 0.2)",
                              color: "#f2ece1",
                              fontSize: "0.76rem",
                            }}
                          />
                        </div>

                        <div
                          className="d-flex flex-wrap gap-1.5 overflow-auto pe-1"
                          style={{ maxHeight: "190px" }}
                        >
                          {filteredTech.map((tech) => {
                            const active = selectedStack.includes(tech.name);
                            return (
                              <button
                                key={tech.name}
                                type="button"
                                onClick={() => toggleTech(tech.name)}
                                className="btn btn-sm px-2.5 py-1 rounded-pill d-inline-flex align-items-center gap-1.5"
                                style={{
                                  fontSize: "0.72rem",
                                  backgroundColor: active
                                    ? "rgba(197, 160, 89, 0.2)"
                                    : "rgba(255, 255, 255, 0.04)",
                                  border: active
                                    ? "1px solid #c5a059"
                                    : "1px solid rgba(255, 255, 255, 0.08)",
                                  color: active ? "#f2ece1" : "#b8ad9e",
                                }}
                              >
                                <img
                                  src={tech.logo}
                                  alt=""
                                  width={14}
                                  height={14}
                                  className="object-fit-contain flex-shrink-0"
                                />
                                <span>{tech.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <input
                  type="url"
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  placeholder="Link Karya..."
                  className="form-control form-control-sm"
                  style={{
                    background: "rgba(14,12,10,0.7)",
                    borderColor: "rgba(197,160,89,0.22)",
                    color: "#f2ece1",
                  }}
                />

                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleBannerChange}
                    className="d-none"
                  />
                  {!bannerUrl ? (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-100 btn btn-sm btn-glass-subtle py-2 d-flex align-items-center justify-content-center gap-1.5"
                      style={{
                        fontSize: "0.76rem",
                        borderStyle: "dashed",
                        borderColor: "rgba(197, 160, 89, 0.28)",
                        color: "#b8ad9e",
                      }}
                    >
                      <ImageSquare size={16} style={{ color: "#c5a059" }} />
                      <span>Unggah Gambar / Banner Karya (Opsional)</span>
                    </button>
                  ) : (
                    <div className="position-relative rounded-3 overflow-hidden border border-secondary-subtle">
                      <img
                        src={bannerUrl}
                        alt="Pratinjau Banner Karya"
                        className="w-100 object-fit-cover"
                        style={{ height: "130px" }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setBannerUrl("");
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                        className="btn btn-sm position-absolute top-0 end-0 m-2 rounded-circle p-1 d-flex align-items-center justify-content-center"
                        style={{
                          backgroundColor: "rgba(12, 10, 9, 0.82)",
                          color: "#f2ece1",
                          border: "1px solid rgba(197, 160, 89, 0.35)",
                        }}
                        title="Hapus banner"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="d-flex justify-content-end gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      resetFormState();
                    }}
                    className="btn btn-sm btn-glass-subtle px-3"
                  >
                    Batal
                  </button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-sm btn-sogan px-3"
                  >
                    {editingId ? "Simpan Perubahan" : "Publish"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Daftar Kartu Karya dengan Animasi Scroll & Interaksi Halus */}
        <div className="d-flex flex-column gap-3 mb-4">
          {projects.map((p) => {
            const liked = Boolean(user && likedProjectIds.includes(p.id));
            const isEditingThis = editingId === p.id && showForm;
            const isReplyOpen = openReplyId === p.id;
            const replies = p.replies || [];
            const isOwner =
              user &&
              (p.author || "").toLowerCase() === user.username.toLowerCase();

            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.12 }}
                transition={{ duration: 0.38, ease: SMOOTH_EASE }}
                className="smoked-glass smoked-glass-interactive overflow-hidden"
              >
                {/* Bagian Atas Banner: Nama Pembuat & Tombol Kunjungi */}
                <div className="px-3.5 pt-3 pb-2.5 d-flex align-items-center justify-content-between gap-2">
                  <span
                    style={{
                      fontFamily: "var(--font-caviar), sans-serif",
                      fontSize: "0.8rem",
                      color: "#c5a059",
                      fontWeight: 600,
                    }}
                  >
                    Karya @{p.author}
                  </span>
                  <a
                    href={p.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-sogan px-2.5 py-1 d-inline-flex align-items-center gap-1"
                    style={{
                      fontFamily: "var(--font-tommy-medium), sans-serif",
                      fontSize: "0.75rem",
                    }}
                  >
                    <span>Kunjungi</span>
                    <VisitArrowSvg size={15} />
                  </a>
                </div>

                {/* Banner Full-bleed + Tombol Edit (Khusus pemilik karya yang sudah login) */}
                <div
                  className="position-relative w-100 overflow-hidden"
                  style={{
                    height: "196px",
                    backgroundColor: "#15120f",
                  }}
                >
                  {isOwner && (
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.88 }}
                      onClick={() => handleStartEdit(p)}
                      title="Edit Karya"
                      className="btn btn-sm position-absolute top-0 end-0 m-2.5 rounded-circle p-1.5 d-flex align-items-center justify-content-center"
                      style={{
                        backgroundColor: isEditingThis
                          ? "#c5a059"
                          : "rgba(16, 13, 11, 0.78)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        border: "1px solid rgba(197, 160, 89, 0.35)",
                        color: isEditingThis ? "#120f0c" : "#f2ece1",
                        zIndex: 4,
                      }}
                    >
                      <EditSvg size={16} active={isEditingThis} />
                    </motion.button>
                  )}

                  {p.bannerUrl ? (
                    <img
                      src={p.bannerUrl}
                      alt={p.title}
                      className="w-100 h-100 object-fit-cover"
                    />
                  ) : (
                    <div
                      className="w-100 h-100 d-flex align-items-center justify-content-center px-3 text-center"
                      style={{
                        background:
                          "radial-gradient(circle at 25% 25%, rgba(197, 160, 89, 0.18), transparent 60%), linear-gradient(135deg, #1b1713 0%, #0e0c0a 100%)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-tommy-extra), sans-serif",
                          fontSize: "1.1rem",
                          color: "rgba(242, 236, 225, 0.22)",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {p.title}
                      </span>
                    </div>
                  )}

                  <div
                    className="position-absolute bottom-0 start-0 w-100"
                    style={{
                      height: "76px",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      maskImage:
                        "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.75) 38%, rgba(0,0,0,0) 100%)",
                      WebkitMaskImage:
                        "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.75) 38%, rgba(0,0,0,0) 100%)",
                      pointerEvents: "none",
                    }}
                  />

                  <div
                    className="position-absolute bottom-0 start-0 w-100"
                    style={{
                      height: "84px",
                      background:
                        "linear-gradient(to top, #15120f 0%, rgba(21, 18, 15, 0.82) 28%, rgba(21, 18, 15, 0.35) 62%, rgba(21, 18, 15, 0) 100%)",
                      pointerEvents: "none",
                    }}
                  />
                </div>

                {/* Bagian Bawah Banner */}
                <div className="px-3.5 pb-3.5 pt-2 position-relative" style={{ zIndex: 2 }}>
                  <h2
                    className="h5 mb-1.5 text-break"
                    style={{
                      fontFamily: "var(--font-tommy-extra), sans-serif",
                      color: "#f2ece1",
                      lineHeight: 1.38,
                      paddingTop: "2px",
                      paddingBottom: "2px",
                    }}
                  >
                    {p.title}
                  </h2>

                  <p
                    className="mb-2.5"
                    style={{
                      fontFamily: "var(--font-tommy-regular), sans-serif",
                      fontSize: "0.85rem",
                      color: "#b8ad9e",
                    }}
                  >
                    {p.desc}
                  </p>

                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                    <div className="d-flex flex-wrap gap-1.5">
                      {p.stack.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-pill d-inline-flex align-items-center gap-1.5"
                          style={{
                            fontSize: "0.7rem",
                            background: "rgba(118, 168, 130, 0.12)",
                            border: "1px solid rgba(118, 168, 130, 0.25)",
                            color: "#9fd0aa",
                          }}
                        >
                          <img
                            src={getTechLogo(tag)}
                            alt=""
                            width={13}
                            height={13}
                            className="object-fit-contain flex-shrink-0"
                          />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>

                    <div className="d-inline-flex align-items-center gap-1.5">
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.85 }}
                        onClick={() => handleApplauseClick(p.id)}
                        title={user ? "Beri Apresiasi" : "Masuk untuk memberi apresiasi"}
                        className="btn btn-sm btn-glass-subtle px-2.5 py-1 d-inline-flex align-items-center gap-1.5"
                        style={{
                          fontSize: "0.76rem",
                          color: liked ? "#c5a059" : "#b8ad9e",
                          borderColor: liked
                            ? "rgba(197, 160, 89, 0.45)"
                            : undefined,
                        }}
                      >
                        <motion.span
                          animate={liked ? { scale: [1, 1.3, 1], rotate: [0, -10, 0] } : { scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className="d-inline-flex align-items-center"
                        >
                          <ApplauseSvg size={17} active={liked} />
                        </motion.span>
                        <span>{p.applause} Apresiasi</span>
                      </motion.button>

                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.88 }}
                        onClick={() => handleToggleReplyPanel(p.id)}
                        title={user ? "Lihat & tulis balasan" : "Masuk untuk membalas"}
                        className="btn btn-sm btn-glass-subtle px-2.5 py-1 d-inline-flex align-items-center gap-1.5"
                        style={{
                          fontSize: "0.76rem",
                          color: isReplyOpen ? "#c5a059" : "#b8ad9e",
                          borderColor: isReplyOpen
                            ? "rgba(197, 160, 89, 0.45)"
                            : undefined,
                        }}
                      >
                        <ReplySvg size={16} active={isReplyOpen} />
                        <span>{replies.length} Balasan</span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Panel Balasan Karya dengan Animasi Smooth */}
                  <AnimatePresence>
                    {user && isReplyOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: SMOOTH_EASE }}
                        className="overflow-hidden"
                      >
                        <div
                          className="mt-3 pt-2.5 border-top d-flex flex-column gap-2"
                          style={{ borderColor: "rgba(197, 160, 89, 0.14)" }}
                        >
                          {replies.length === 0 ? (
                            <span
                              style={{ fontSize: "0.75rem", color: "#8f8578" }}
                            >
                              Belum ada balasan. Beri masukan untuk karya ini!
                            </span>
                          ) : (
                            <AnimatePresence initial={false}>
                              {replies.map((rep) => (
                                <motion.div
                                  key={rep.id}
                                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  transition={{ duration: 0.25, ease: SMOOTH_EASE }}
                                  className="px-2.5 py-1.5 rounded-3"
                                  style={{
                                    backgroundColor: "rgba(12, 10, 9, 0.55)",
                                    border: "1px solid rgba(197, 160, 89, 0.1)",
                                  }}
                                >
                                  <span
                                    className="d-block"
                                    style={{
                                      fontFamily: "var(--font-caviar), sans-serif",
                                      fontSize: "0.72rem",
                                      color: "#c5a059",
                                      fontWeight: 600,
                                    }}
                                  >
                                    @{rep.author}
                                  </span>
                                  <p
                                    className="mb-0"
                                    style={{
                                      fontSize: "0.78rem",
                                      color: "#d8cfc2",
                                    }}
                                  >
                                    {rep.text}
                                  </p>
                                </motion.div>
                              ))}
                            </AnimatePresence>
                          )}

                          <form
                            onSubmit={(e) => handleAddReply(e, p.id)}
                            className="d-flex gap-1.5 mt-1"
                          >
                            <input
                              type="text"
                              value={replyInputs[p.id] || ""}
                              onChange={(e) =>
                                setReplyInputs((prev) => ({
                                  ...prev,
                                  [p.id]: e.target.value,
                                }))
                              }
                              placeholder="Tulis balasan atau masukan..."
                              className="form-control form-control-sm"
                              style={{
                                backgroundColor: "rgba(14, 12, 10, 0.72)",
                                borderColor: "rgba(197, 160, 89, 0.22)",
                                color: "#f2ece1",
                                fontSize: "0.76rem",
                              }}
                            />
                            <motion.button
                              type="submit"
                              whileTap={{ scale: 0.88, rotate: -10 }}
                              className="btn btn-sm btn-sogan px-2.5 d-inline-flex align-items-center justify-content-center"
                              title="Kirim balasan"
                            >
                              <SendSvg size={14} />
                            </motion.button>
                          </form>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.article>
            );
          })}
        </div>
      </main>
    </motion.div>
  );
}
