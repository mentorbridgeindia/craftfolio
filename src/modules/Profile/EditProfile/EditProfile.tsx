"use client";

import { FormInput } from "@atoms/FormInput";
import { Slider } from "@atoms/Slider";
import { Button } from "@components/ui/button";
import { useSliderWithInput } from "@hooks/useSliderWithInput";
import { AutoComplete } from "@molecules/AutoComplete";
import { MultipleSelector } from "@molecules/MultipleSelector";
import {
  Archive,
  AtSign,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";
import { FloatingActionButtons } from "../../../ui/molecules/FloatingActionButtons/FloatingActionButtons";
import { EditBasicInformation } from "./Sections/BasicInformation/Edit/EditBasicInformation";

export default function EditProfile() {
  const { sliderValue, handleSliderChange } = useSliderWithInput({
    minValue: 0,
    maxValue: 50,
    initialValue: [10],
  });
  const inputOptions = [
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
  ];
  return (
    <div className="flex flex-col gap-6 mt-10 mx-auto max-w-2xl">
      <FormInput label="Email" isDisplayLabel isRequired />
      <Button>
        <Archive
          className="-ms-1 me-2 opacity-60"
          size={16}
          strokeWidth={2}
          aria-hidden="true"
        />
        Button
      </Button>
      <div className="flex items-center justify-center">
        <FloatingActionButtons
          iconSize={16}
          icons={[
            { Icon: Github, href: "https://www.google.com" },
            { Icon: Linkedin, href: "https://www.google.com" },
            { Icon: Twitter, href: "https://www.google.com" },
            { Icon: Instagram, href: "https://www.google.com" },
          ]}
        />
      </div>
      <FormInput label="Email" isDisplayLabel isRequired type="file" />
      <AutoComplete
        options={inputOptions}
        value=""
        onChange={() => {}}
        placeholder="Select an option"
        label="Framework"
        isDisplayLabel
        isRequired
        hintText="ex: JavaScript"
        helperText="ex: JavaScript"
      />
      <MultipleSelector
        options={inputOptions}
        placeholder="Select framework"
        commandProps={{
          label: "Select framework",
        }}
        label="Framework"
        isDisplayLabel
        isRequired
        hintText="ex: JavaScript"
        creatable
        hideClearAllButton
        hidePlaceholderWhenSelected
        helperText="ex: JavaScript"
        emptyIndicator={
          <p className="text-center text-sm">No results found!</p>
        }
      />
      <FormInput label="Email" isDisplayLabel isRequired type="file" disabled />
      <FormInput
        label="Email"
        isDisplayLabel
        isRequired
        hintText="Optional"
        readOnly
      />
      <FormInput
        label="Email"
        isDisplayLabel
        isRequired
        type="url"
        endIcon={<span className="text-xs text-muted-foreground">0/50</span>}
        isError
        errorMessage="Invalid URL"
      />
      <Slider
        className="grow"
        value={sliderValue}
        onValueChange={handleSliderChange}
        min={0}
        max={50}
        aria-label="Slider with input"
        isDisplayLabel
        label="Slider"
        isRequired
        tooltipContent={(value) => <span>Value: {value}</span>}
        showTooltip
        hintText={sliderValue[0].toString()}
      />
      <FormInput
        label="Email"
        isDisplayLabel
        isRequired
        helperText="We won&lsquo;t share your email with anyone"
      />
      <FormInput
        label="Email"
        isDisplayLabel
        isRequired
        startIcon={<AtSign size={16} strokeWidth={2} aria-hidden="true" />}
        endIcon={<Mail size={16} strokeWidth={2} aria-hidden="true" />}
      />
      <EditBasicInformation
        isOpen={true}
        onClose={() => {}}
        onSubmit={() => {}}
        defaultValues={{}}
      />
    </div>
  );
}
