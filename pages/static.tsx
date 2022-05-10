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

export default function StaticPage({ data }: { data: Data[] }) {
  const title = "Get Static Props Page 😐";
  return (
    <Layout title={title}>
      <Heading>{title}</Heading>

      <Text textAlign="center" pt="3">
        The data on this page is only fetched once during the build process
      </Text>

      <TableContainer pt="12">
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
            <Button mt="8" colorScheme="teal">
              Back
            </Button>
          </Link>
        </NextLink>
      </VStack>
    </Layout>
  );
}
