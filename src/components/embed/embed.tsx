export default function Embed() {
    return (
      <a className="relative hover:cursor-pointer p-[2px] rounded-full before:absolute before:inset-0 before:rounded-full before:border-2 before:border-[rgb(250,204,21)] before:animate-[pulse_2s_infinite_ease-in-out]">
        <div className="flex items-center gap-2 px-3 py-1 bg-white border border-[rgb(250,204,21)] rounded-full shadow-md relative">
          <span className="text-[rgb(250,204,21)] font-semibold text-sm">Buy me a chai</span>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
            <path fillRule="evenodd" clipRule="evenodd" d="M10.53 1.47c.29.29.29.76 0 1.06-.26.26-.26.69 0 .95.85.85.85 2.22 0 3.07a.75.75 0 01-1.06-1.06c.26-.26.26-.69 0-.95-.85-.85-.85-2.22 0-3.07a.75.75 0 011.06 0zM6.03 2.97c.29.29.29.76 0 1.06l-.12.12a.75.75 0 00.12 1.07c.65.87.56 2.09-.21 2.86a.75.75 0 01-1.06-1.06c.24-.24.27-.63.06-.9-.65-.87-.56-2.09.21-2.86a.75.75 0 011.06 0zM15.53 2.97a.75.75 0 010 1.06l-.12.12a.75.75 0 00.12 1.07c.65.87.56 2.09-.21 2.86a.75.75 0 01-1.06-1.06c.24-.24.27-.63.06-.9-.65-.87-.56-2.09.21-2.86a.75.75 0 011.06 0zM4.65 9.25h10.64c.36 0 .64 0 .88.05.66.12 1.23.45 1.63.95h1.13c2.07 0 3.75 1.68 3.75 3.75s-1.68 3.75-3.75 3.75h-1.35c-.44 1.13-1.2 2.12-2.2 2.83-1.06.76-2.33 1.17-3.64 1.17H8.19c-1.31 0-2.59-.41-3.64-1.17-1.44-1.03-2.38-2.61-2.58-4.37l-.4-3.43c-.03-.27-.06-.54-.04-.78.07-1.27 1-2.29 2.26-2.49.24-.04.52-.05.88-.05z" fill="#FACC15"></path>
          </svg>
        </div>
      </a>
    );
  }
  