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
  const title = "On-demand ISR Page 🥳";

  return (
    <Layout title={title}>
      <Heading>{title}</Heading>

      <Text pt="3">You can update this page by re-validating</Text>
      <NextLink href="/api/revalidate" passHref>
        <Link>
          <Button mt="2" colorScheme="teal">
            Click here to re-validate 🔄
          </Button>
        </Link>
      </NextLink>
      <TableContainer pt="10">
        <Table>
          <Thead>
            <Tr>
              <Th>id</Th>
              <Th>Text</Th>
              <Th>created at</Th>
            </Tr>

            {data.reverse().map((item) => {
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
