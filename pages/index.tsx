import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";

import Layout from "~/components/Layout";

export default function Index() {
  const [input, setInput] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [openSuccesDialog, setOpenSuccesDialog] = useState(false);

  async function submit() {
    setIsloading(true);
    const { success } = await fetch(
      "https://supabase-cloudflare-worker.zakiego.workers.dev/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: input }),
      },
    ).then((resp) => resp.json());

    setInput("");
    setIsloading(false);
    setOpenSuccesDialog(true);

    setTimeout(function () {
      setOpenSuccesDialog(false);
    }, 4000);
  }

  return (
    <Layout title="Learn On-demand Incremental Static Regeneration">
      <Heading mb="4">Say Something First 😉</Heading>

      <Textarea
        onChange={(e) => {
          setInput(e.target.value);
        }}
        value={input}
        id="text"
        mt="7"
        placeholder="Ueeeeeewooooooooo"
        colorScheme="teal"
      />
      <Alert
        status="success"
        variant="solid"
        rounded="md"
        colorScheme="teal"
        hidden={!openSuccesDialog}
        justifyContent="center"
      >
        <AlertIcon />
        Successfully launched into space!
      </Alert>
      <Stack>
        <Button
          onClick={() => submit()}
          isLoading={isLoading}
          isDisabled={input.length == 0}
          colorScheme="teal"
          mt="1"
          size="sm"
        >
          Submit 🚀
        </Button>
      </Stack>
      <VStack pt="9" spacing="3">
        <Heading size="xl"> What should I do?</Heading>
        <Text>1. Write something in the form</Text>
        <NextLink href="/static" passHref>
          <Flex align="center">
            <Link isExternal>2. Check Get Static Props page 😐</Link>
            <ExternalLinkIcon ml="5px" />
          </Flex>
        </NextLink>
        <NextLink href="/on-demand" passHref>
          <Flex align="center">
            <Link>3. Check On-demand ISR page and refresh 🥳</Link>
            <ExternalLinkIcon ml="5px" />
          </Flex>
        </NextLink>
        <VStack pt="8">
          <Heading size="md">Reference</Heading>

          <NextLink
            href="https://medium.com/@mzakiyuddin/tutorial-menggunakan-fitur-on-demand-incremental-static-regeneration-di-next-js-78f33cb857a5"
            passHref
          >
            <Link isExternal>
              <Flex align="center">
                mzakiyuddin.medium.com [id]
                <ExternalLinkIcon ml="5px" />
              </Flex>
            </Link>
          </NextLink>

          <NextLink
            href="https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration"
            passHref
          >
            <Link isExternal>
              <Flex align="center">
                nextjs.org [en]
                <ExternalLinkIcon ml="5px" />
              </Flex>
            </Link>
          </NextLink>
        </VStack>
      </VStack>
    </Layout>
  );
}
