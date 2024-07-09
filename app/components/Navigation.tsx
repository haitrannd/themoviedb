"use client";

import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import useTmdbContext from "@/app/hooks/useTmdbContext";
import React, { MouseEvent } from "react";
import { destroySession } from "../lib/services";

export default function Navigation() {
  const { loginStatus, isLoading, dispatch } = useTmdbContext();

  const logout = async (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    await destroySession();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
  };

  return (
    <>
      <Navbar className="w-full fixed top-0" fluid>
        <NavbarBrand as={Link} href="/">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            theMovieDB.
          </span>
        </NavbarBrand>
        <NavbarToggle />

        {!isLoading && (
          <NavbarCollapse>
            {!loginStatus ? (
              <>
                <NavbarLink as={Link} href="/user/login">
                  Login
                </NavbarLink>
              </>
            ) : (
              <>
                <NavbarLink as={Link} href="/user/login">
                  Profile
                </NavbarLink>
                <NavbarLink as={Link} href="#" onClick={logout}>
                  Logout
                </NavbarLink>
              </>
            )}
          </NavbarCollapse>
        )}
      </Navbar>
    </>
  );
}
