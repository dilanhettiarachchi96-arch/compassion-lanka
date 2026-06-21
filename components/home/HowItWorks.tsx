"use client";
import { Gift, Heart, Truck } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const steps = [
  {
    step: 1,
    icon: Heart,
    title: 'Choose a Cause',
    description:
      'Browse active campaigns and pick the cause that speaks to you — from warm clothes to school books.',
  },
  {
    step: 2,
    icon: Gift,
    title: 'Donate or Send Goods',
    description:
      'Contribute securely online or ship physical goods from anywhere in the world to our Colombo hub.',
  },
  {
    step: 3,
    icon: Truck,
    title: 'We Distribute',
    description:
      'Our team delivers your support directly to partner children\'s homes across every province in Sri Lanka.',
  },
] as const;

export function HowItWorks() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section ref={containerRef} className="bg-[var(--color-bg)] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="font-[family-name:var(--font-dm-serif)] text-3xl text-primary md:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Three simple steps to change a child&apos;s life today.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map(({ step, icon: Icon, title, description }) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: step * 0.1 }}
            >
              <Card key={step} className="relative border-none shadow-md">
                <CardHeader className="items-center text-center">
                  <span className="font-[family-name:var(--font-dm-serif)] text-5xl text-primary/20">
                    {step}
                  </span>
                  <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="size-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base leading-relaxed">
                    {description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
