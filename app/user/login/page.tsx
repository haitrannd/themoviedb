"use client";

import useTmdbContext from "@/app/hooks/useTmdbContext";
import { Button, Card, Label, TextInput } from "flowbite-react";
import React, { FormEvent } from "react";
import { setSession } from "@/app/lib/services";
import { message } from "antd";
import { getSessionId } from "@/app/lib/auth";

export default function UserLogin() {
  const { dispatch } = useTmdbContext();
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")?.toString();
    const pass = formData.get("password")?.toString();
    if (email && pass) {
      // dispatch({
      //   type: "LOGIN",
      //   payload: null
      // });
      // await setSession('1');

      const sessionData = await getSessionId(email, pass);
      if (!sessionData.isError) {
        message.success(sessionData.message, 3);
        dispatch({
          type: "LOGIN",
          payload: null,
        });
        await setSession(sessionData.data.session_id);
      } else {
        message.error(sessionData.data.status_message, 5);
      }
    }
  }

  return (
    <>
      <Card className="max-w-sm m-auto">
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="User" />
            </div>
            <TextInput
              id="email"
              name="email"
              type="email"
              defaultValue={`hai.tran@ffw.com`}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password" />
            </div>
            <TextInput
              id="password"
              name="password"
              type="password"
              defaultValue={`Ui$TB$yn@9Cem2W`}
              required
            />
          </div>
          <Button type="submit">Login</Button>
        </form>
      </Card>
    </>
  );
}
