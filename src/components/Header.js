import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className="h-24 flex justify-between items-center px-12">
      <div className="flex items-center gap-8">
        <Image
          className="pr-5"
          src="/logo.png"
          width={80}
          height={80}
          alt="logo"
        />
        <div className="flex items-center p-2.5 px-3.5 rounded font-medium transition duration-300 hover:bg-slate-800">
          <Link href="/swap">Swap</Link>
        </div>
        <div className="flex items-center p-2.5 px-3.5 rounded font-medium transition duration-300 hover:bg-slate-800">
          <Link href="/tokens">Tokens</Link>
        </div>
      </div>
      <div class="flex items-center justify-end gap-10">
        <div class="flex items-center p-2.5 px-3 rounded font-medium transition duration-300 hover:bg-slate-800">
          <Image
            className="pr-2.5"
            src="/eth.svg"
            alt=""
            width={30}
            height={30}
          />
          <div>Ethereum</div>
        </div>
        <div class="bg-[#243056] font-bold transition duration-300 text-[#5981F3] p-2.5 px-5 rounded-full hover:text-[#3b4874]">
          Connect
        </div>
      </div>
    </header>
  );
}

export default Header;
