import { getSession } from "./lib/services";

export default async function Home() {
  const session = await getSession();
  console.log(session.sessionId);

  return <></>;
}
