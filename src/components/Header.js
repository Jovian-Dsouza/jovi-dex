import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className="flex justify-between items-center mt-8 px-12">
      {/* logo and left buttons */}
      <div className="flex items-center space-x-4">
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

      {/* Right buttons */}
      <div class="flex items-center justify-end space-x-5">
        {/* Crypto currency button */}
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
        {/* Connect button */}
        <div class="p-2.5 px-5 rounded-full bg-[#243056] text-[#5981F3] font-bold transition duration-300 hover:text-[#3b4874]">
          Connect
        </div>
      </div>
    </header>
  );
}

export default Header;
