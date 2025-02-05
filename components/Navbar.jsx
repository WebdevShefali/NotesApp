"use client";

import Link from "next/link";
import Image from "next/image"; 
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const fetchProviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };
    fetchProviders();
  }, []);

  return (
    <nav className="flex flex-between w-full mb-16 pt-8">
      <Link href="/" className="flex gap-2 flex-center">
        <p className="max-sm:hidden font-satoshi text-xl font-bold text-gray-200 tracking-wide">
          Notes App
        </p>
      </Link>
      <div className="flex items-center ml-auto">
        {/* Desktop Navigation */}
        <div className="sm:flex hidden">
          {session?.user ? (
            <div className="flex gap-3 sm:gap-5">
              <Link
                href="/create-note"
                className="rounded-full border border-gray-700 bg-transparent py-2 px-5 text-white transition-all  text-center text-sm font-inter flex items-center justify-center"
              >
                Create Note
              </Link>
              <button
                type="button"
                className="rounded-full border border-gray-700 bg-transparent py-2 px-5 text-white transition-all  text-center text-sm font-inter flex items-center justify-center"
                onClick={signOut}
              >
                Sign Out
              </button>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                alt="Profile"
                className="rounded-full"
              />
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="rounded-full border border-gray-700 bg-transparent py-2 px-5 text-white transition-all  text-center text-sm font-inter flex items-center justify-center"
                  >
                    Sign In
                  </button>
                ))}
            </>
          )}
        </div>
        {/* Mobile Navigation */}
        <div className="sm:hidden flex relative">
          {session?.user ? (
            <div>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                alt="Profile"
                className="rounded-full"
                onClick={() => setToggleDropdown((prev) => !prev)}
              />
              {toggleDropdown && (
                <div className="absolute right-0 top-full mt-3 w-full p-5 rounded-lg bg-white min-w-[210px] flex flex-col gap-2 justify-end items-end">
                  <Link
                    href="/profile"
                    className="text-sm font-inter text-gray-700 hover:text-gray-500 font-medium"
                    onClick={() => setToggleDropdown(false)}
                  >
                    My profile
                  </Link>
                  <Link
                    href="/create-note"
                    className="text-sm font-inter text-gray-700 hover:text-gray-500 font-medium"
                    onClick={() => setToggleDropdown(false)}
                  >
                    Create Note
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setToggleDropdown(false);
                      signOut();
                    }}
                    className="mt-5 w-full rounded-full border border-black bg-black py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="rounded-full border border-black bg-black py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center"
                  >
                    Sign In
                  </button>
                ))}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
