import { ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <div className="mb-3 flex justify-center items-center">
      <p className="flex items-center gap-1">
        Made with Chai by{" "}
        <a className="text-[rgb(250,204,21)] hover:underline flex items-center gap-1" href="https://owais.onrender.com">
          Owais <ExternalLink size={16} className="text-[rgb(250,204,21)]" />
        </a>
      </p>
    </div>
  );
}
