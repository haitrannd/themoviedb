"use client";

import Link from "next/link";
import {
  Avatar,
  Dropdown,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import React, { MouseEvent, useRef } from "react";
import { destroySession } from "../lib/services";
import { useAppSelector, useAppStore } from "../lib/hooks";
import { update } from "../lib/features/user/userSlice";

export default function Navigation() {
  const { loginStatus, isLoading } = useAppSelector((state) => state.user);
  const store = useAppStore();
  const initialized = useRef(false);

  const logout = async (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    await destroySession();
    if (!initialized.current) {
      store.dispatch(update(false));
      initialized.current = true;
    }
  };

  if (!loginStatus) {
    return (
      <>
        <Navbar
          className="w-full fixed top-0 px-10 sm:px-24 bg-cyan-700 z-10"
          fluid
        >
          <NavbarBrand as={Link} href="/">
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              TheMovieDB.
            </span>
          </NavbarBrand>

          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline
              label={<Avatar alt="User settings" img="/no-user.png" rounded />}
            >
              <>
                <Dropdown.Item>
                  <NavbarLink as={Link} href="/user/login">
                    Login
                  </NavbarLink>
                </Dropdown.Item>
              </>
            </Dropdown>
            <Navbar.Toggle />
          </div>

          <NavbarCollapse>
            <NavbarLink
              as={Link}
              href="/"
              className="text-white hover:text-amber-400 md:hover:text-amber-400 transition-all"
            >
              About us
            </NavbarLink>
            <NavbarLink
              as={Link}
              href="/"
              className="text-white hover:text-amber-400 md:hover:text-amber-400 transition-all"
            >
              FAQ
            </NavbarLink>
          </NavbarCollapse>
        </Navbar>
      </>
    );
  }

  return (
    <>
      <Navbar
        className="w-full fixed top-0 px-5 sm:px-24 bg-cyan-700 z-10"
        fluid
      >
        <NavbarBrand as={Link} href="/">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            TheMovieDB.
          </span>
        </NavbarBrand>

        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="User settings" img="/no-user.png" rounded />}
          >
            <>
              <Dropdown.Item>
                <NavbarLink as={Link} href="/user/login">
                  Profile
                </NavbarLink>
              </Dropdown.Item>
              <Dropdown.Item>
                <NavbarLink as={Link} href="#" onClick={logout}>
                  Logout
                </NavbarLink>
              </Dropdown.Item>
            </>
          </Dropdown>
          <Navbar.Toggle className="ml-4 text-white" />
        </div>

        <NavbarCollapse>
          <NavbarLink
            as={Link}
            href="/movies/popular"
            className="text-white hover:text-amber-400 md:hover:text-amber-400 transition-all"
          >
            Popular movies
          </NavbarLink>
          <NavbarLink
            as={Link}
            href="/user/submit-movie"
            className="text-white hover:text-amber-400 md:hover:text-amber-400 transition-all"
          >
            Submit movie
          </NavbarLink>
          <NavbarLink
            as={Link}
            href="/about-us"
            className="text-white hover:text-amber-400 md:hover:text-amber-400 transition-all"
          >
            About us
          </NavbarLink>
          <NavbarLink
            as={Link}
            href="/faq"
            className="text-white hover:text-amber-400 md:hover:text-amber-400 transition-all"
          >
            FAQ
          </NavbarLink>
        </NavbarCollapse>
      </Navbar>
    </>
  );
}
