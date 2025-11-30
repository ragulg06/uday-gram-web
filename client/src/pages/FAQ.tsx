import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search, HelpCircle } from "lucide-react";
import { useState } from "react";
import { faqItems } from "@/lib/mockData";

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaqs = faqItems.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="p-4 lg:p-6 space-y-4">
        <Card>
          <CardHeader className="bg-primary py-3">
            <CardTitle className="text-lg text-primary-foreground text-center">
              Frequently Asked Questions (FAQ)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-6">
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search FAQs..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  data-testid="input-search-faq"
                />
              </div>
            </div>

            <div className="max-w-3xl mx-auto">
              {filteredFaqs.length === 0 ? (
                <div className="text-center py-12">
                  <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="mt-4 text-muted-foreground">No FAQs found matching your search</p>
                </div>
              ) : (
                <Accordion type="single" collapsible className="space-y-2">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border rounded-lg px-4"
                      data-testid={`faq-item-${index}`}
                    >
                      <AccordionTrigger className="text-left py-4 hover:no-underline">
                        <div className="flex items-start gap-3">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium shrink-0">
                            {index + 1}
                          </span>
                          <span className="font-medium">{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pl-9 pb-4 text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </div>

            <div className="mt-8 p-4 bg-primary/5 rounded-lg max-w-3xl mx-auto">
              <h3 className="font-semibold text-sm mb-2">Still have questions?</h3>
              <p className="text-sm text-muted-foreground">
                If you couldn't find the answer to your question, please contact the technical support team at{" "}
                <span className="font-medium text-primary">support[dot]pmagy-msje[at]gov[dot]in</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
