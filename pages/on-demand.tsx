import {
  Button,
  Heading,
  Link,
  Table,
  TableContainer,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { CopyBlock, nord } from "react-code-blocks";

import Layout from "~/components/Layout";

interface Data {
  id: number;
  content: string;
  created_at: string;
}

export async function getStaticProps() {
  const { data } = await fetch(
    "https://supabase-cloudflare-worker.zakiego.workers.dev/",
  ).then((resp) => resp.json());

  return { props: { data } };
}

export default function OnDemandISR({ data }: { data: Data[] }) {
  const router = useRouter();

  const title = "On-demand ISR Page 🥳";
  const code =
    "// api/revalidate.ts\nconst path = '/on-demand';\nawait res.unstable_revalidate(path);\nreturn res.json({ revalidated: true, path });";

  return (
    <Layout title={title}>
      <Heading>{title}</Heading>

      <Text textAlign="center" pt="3">
        You can update this page by re-validating
      </Text>

      <VStack pt="4">
        <CopyBlock
          text={code}
          language="typescript"
          showLineNumbers={false}
          theme={nord}
          highlight="3"
          codeBlock
        />
      </VStack>

      <NextLink href="/api/revalidate" passHref>
        <Link isExternal>
          <Button mt="8" colorScheme="teal">
            Click here to re-validate 🔄
          </Button>
        </Link>
      </NextLink>

      <VStack>
        <Button
          colorScheme="teal"
          size="sm"
          variant="outline"
          mt="3"
          onClick={() => router.reload()}
        >
          Reload this page
        </Button>
      </VStack>

      <TableContainer pt="10">
        <Table>
          <Thead>
            <Tr>
              <Th>id</Th>
              <Th>Text</Th>
              <Th>created at</Th>
            </Tr>

            {data.map((item) => {
              return (
                <Tr key={item.id}>
                  <Td>{item.id}</Td>
                  <Td>{item.content}</Td>
                  <Td>{new Date(item.created_at).toLocaleString()}</Td>
                </Tr>
              );
            })}
          </Thead>
        </Table>
      </TableContainer>

      <VStack>
        <NextLink href="/" passHref>
          <Link>
            <Button mt="8" colorScheme="teal" variant="outline">
              Back
            </Button>
          </Link>
        </NextLink>
      </VStack>
    </Layout>
  );
}
