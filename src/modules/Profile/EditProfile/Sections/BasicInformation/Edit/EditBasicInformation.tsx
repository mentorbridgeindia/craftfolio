"use client";

import { FormInput } from "@atoms/FormInput";
import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Textarea } from "@components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { basicInfoSchema } from "../basicInfoSchema";
import { EditBasicInformationProps } from "./EditBasicInformation.types";

export function EditBasicInformation({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
}: Readonly<EditBasicInformationProps>) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const form = useForm<z.infer<typeof basicInfoSchema>>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues,
  });

  const handleSubmit = (data: z.infer<typeof basicInfoSchema>) => {
    onSubmit(data);
    onClose();
  };

  const Content = () => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <FormInput placeholder="Enter first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <FormInput placeholder="Enter last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="profilePicture"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel>Profile Picture</FormLabel>
              <FormControl>
                <FormInput
                  type="file"
                  value={value?.name}
                  onChange={onChange}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="shortBio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tagline</FormLabel>
              <FormControl>
                <FormInput
                  maxLength={100}
                  placeholder="Enter a brief bio (max 100 characters)"
                  endIcon={
                    <span className="text-xs text-muted-foreground">
                      {field.value?.length ?? 0}/100
                    </span>
                  }
                  {...field}
                  isError={!!form.formState.errors.shortBio}
                  helperText="Ex: Open Source Contributor, etc."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="detailedBio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detailed Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your detailed bio (max 5000 characters)"
                  className="min-h-[250px] max-h-[250px]"
                  {...field}
                  maxLength={5000}
                  endIcon={
                    <span className="text-xs text-muted-foreground">
                      {field.value?.length ?? 0}/5000
                    </span>
                  }
                  isError={!!form.formState.errors.detailedBio}
                  helperText="A Detailed Bio is a longer bio that is used to describe your professional background, skills, and experiences."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  );

  if (isDesktop) {
    return (
      <Drawer open={isOpen} onOpenChange={onClose} direction="right">
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="flex items-center justify-between">
              Edit Basic Information
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X size={16} />
              </Button>
            </DrawerTitle>
            <DrawerDescription>
              Edit your basic information to help us get to know you better.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-6">
            <Content />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Basic Information</DialogTitle>
        </DialogHeader>
        <Content />
      </DialogContent>
    </Dialog>
  );
}
