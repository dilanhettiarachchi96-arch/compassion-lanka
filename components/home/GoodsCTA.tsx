import Link from 'next/link';
import { Check, MapPin, Phone, Mail, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GOODS_ADDRESS } from '@/lib/mock-data';

const acceptedItems = [
  'Clothes',
  'Shoes',
  'Blankets',
  'Books',
  'Stationery',
  'Packaged Food',
  'OTC Medicine',
] as const;

const notAcceptedItems = [
  'Electronics',
  'Perishables',
  'Used Undergarments',
] as const;

export function GoodsCTA() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="font-[family-name:var(--font-dm-serif)] text-3xl text-primary md:text-4xl">
            Send Goods from Anywhere
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Ship clothes, books, food, and medicine from Australia, the UK, the
            US, or anywhere in the world. We receive, sort, and distribute
            every package to the children who need it most.
          </p>

          <Card className="mt-8 border-primary/20 bg-primary/5 shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="size-5 text-primary" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm leading-relaxed">
              <p className="font-semibold text-foreground">{GOODS_ADDRESS.name}</p>
              <p>{GOODS_ADDRESS.line1}</p>
              <p>{GOODS_ADDRESS.line2}</p>
              <p className="flex items-center gap-2 pt-2">
                <Phone className="size-4 text-primary" />
                Tel: {GOODS_ADDRESS.phone}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="size-4 text-primary" />
                Email: {GOODS_ADDRESS.email}
              </p>
            </CardContent>
          </Card>

          <Button
            className="mt-6"
            nativeButton={false}
            render={<Link href="/send-goods" />}
          >
            Register a Shipment
          </Button>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-primary">
              Accepted Items
            </h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {acceptedItems.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-900"
                >
                  <Check className="size-4 shrink-0 text-green-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-primary">
              Not Accepted
            </h3>
            <ul className="space-y-3">
              {notAcceptedItems.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-900"
                >
                  <X className="size-4 shrink-0 text-red-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
