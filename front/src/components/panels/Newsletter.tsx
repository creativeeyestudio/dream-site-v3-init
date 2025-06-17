import Form from "next/form";
import React from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Button } from "../ui/button";

const Newsletter: React.FC = () => {
  return (
    <Form action="">
      <Label htmlFor="news_field">S&apos;inscrire à la Newsletter</Label>
      <Input id="news_field" type="email" placeholder="Votre Adresse E-Mail" />
      <Button type="submit">S&apos;inscrire</Button>
      <div className="flex items-center gap-3">
        <Checkbox id="news_rgpd" />
        <Label htmlFor="news_rgpd">RGPD Label</Label>
      </div>
    </Form>
  );
};

export default Newsletter;
