"use server";

import { SessionData, defaultSession, sessionOptions } from "@/app/lib/type";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  // If user visits for the first time session returns an empty object.
  // Let's add the isLoggedIn property to this object and its value will be the default value which is false
  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return session;
}

export async function setSession(sessionId: string) {
  const session = await getSession();
  session.isLoggedIn = true;
  session.sessionId = sessionId;
  await session.save();
  redirect("/");
}

export async function destroySession() {
  const session = await getSession();
  session.destroy();
  redirect("/");
}
