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
      </Head>
      <Flex bg="gray.800" textColor="white" h="100vh">
        <Container maxW={{ base: "md", md: "lg" }}>
          <VStack mt="10">{children}</VStack>
        </Container>
      </Flex>
    </>
  );
}
