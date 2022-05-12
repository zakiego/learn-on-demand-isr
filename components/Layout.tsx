import { Container, Flex, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  title: string;
}

export default function Layout({ children, title }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Learn On-demand Incremental Static Regeneration (ISR)"
        />
        <meta
          name="twitter:description"
          content="It's a fun feature. Wanna try?"
        />

        <meta
          name="twitter:image"
          content="https://learn-on-demand-isr.vercel.app/static/images/card.png"
        />
        <meta name="twitter:creator" content="@zakiego" />
        <meta
          property="og:title"
          content="Learn On-demand Incremental Static Regeneration (ISR)"
        />
        <meta name="og:description" content="It's a fun feature. Wanna try?" />

        <meta
          content="https://learn-on-demand-isr.vercel.app/static/images/card.png"
          property="og:image"
        />
      </Head>

      <Flex bg="gray.800" textColor="white" minHeight="100vh">
        <Container maxW={{ base: "md", md: "lg" }}>
          <VStack my="10">{children}</VStack>
        </Container>
      </Flex>
    </>
  );
}
