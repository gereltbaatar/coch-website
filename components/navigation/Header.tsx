import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  const navItems = [
    { label: "About me", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blogs" },
    { label: "Free", href: "/free" },
  ];

  return (
    <div className="w-full bg-main fixed top-0 left-0 right-0 z-50">
      <div className="max-w-[1536px] w-full mx-auto px-5 py-3 flex items-center justify-between">
        <nav className="flex items-center gap-2 sm:gap-4">
          <Link href="/" className="cursor-pointer mr-0 sm:mr-10">
            <Image src="/logo.png" alt="logo" width={50} height={50} />
          </Link>

          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white font-semibold text-sm uppercase px-4 py-2 cursor-pointer"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 border border-secondary rounded-full px-4 py-2">
          <Link
            href="/contact"
            className="text-white font-semibold text-sm uppercase cursor-pointer"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
};
